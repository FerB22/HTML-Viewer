package com.example.htmlreader

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

// ─── Modelo de items del RecyclerView ────────────────────────────────────────

sealed class LibraryItem {
    /** Carrusel horizontal de archivos recientes */
    data class RecentCarousel(val items: List<FileItem>) : LibraryItem()

    /** Encabezado de un grupo/carpeta */
    data class GroupHeader(
        val groupId: String,
        val name: String,
        val isExpanded: Boolean,
        val fileCount: Int
    ) : LibraryItem()

    /** Título de sección divisoria (ej: "Archivos sueltos") */
    data class SectionTitle(val title: String) : LibraryItem()

    /** Fila de un archivo */
    data class FileEntry(
        val file: FileItem,
        val isInsideGroup: Boolean = true
    ) : LibraryItem()
}

// ─── Adapter Principal ────────────────────────────────────────────────────────

class LibraryAdapter(
    private val onFileClick: (FileItem) -> Unit,
    private val onFileMenuClick: (FileItem, View) -> Unit,
    private val onGroupMenuClick: (String, String, View) -> Unit   // groupId, name, anchor
) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    companion object {
        private const val TYPE_RECENT_CAROUSEL = 0
        private const val TYPE_GROUP_HEADER    = 1
        private const val TYPE_SECTION_TITLE   = 2
        private const val TYPE_FILE            = 3
    }

    // Grupos expandidos por defecto
    private val expandedGroupIds = mutableSetOf<String>()

    private var displayList: List<LibraryItem> = emptyList()

    private var cachedRecents: List<FileItem>  = emptyList()
    private var cachedGroups: List<Group>      = emptyList()
    private var cachedAllFiles: List<FileItem> = emptyList()

    fun submitData(
        recents: List<FileItem>,
        groups: List<Group>,
        allFiles: List<FileItem>
    ) {
        cachedRecents  = recents
        cachedGroups   = groups
        cachedAllFiles = allFiles

        // Expandir todos los grupos por defecto la primera vez que se cargan
        if (expandedGroupIds.isEmpty() && groups.isNotEmpty()) {
            expandedGroupIds.addAll(groups.map { it.id })
        }

        rebuildList()
    }

    private fun rebuildList() {
        val items = mutableListOf<LibraryItem>()

        // 1. Carrusel de Recientes (si hay archivos abiertos recientemente)
        if (cachedRecents.isNotEmpty()) {
            items.add(LibraryItem.RecentCarousel(cachedRecents))
        }

        // 2. Carpetas / Grupos
        cachedGroups.forEach { group ->
            val groupFiles = cachedAllFiles
                .filter { it.groupId == group.id }
                .sortedBy { it.name.lowercase() }
            val isExpanded = group.id in expandedGroupIds

            items.add(
                LibraryItem.GroupHeader(
                    groupId = group.id,
                    name = group.name,
                    isExpanded = isExpanded,
                    fileCount = groupFiles.size
                )
            )
            if (isExpanded) {
                groupFiles.forEach { items.add(LibraryItem.FileEntry(it, isInsideGroup = true)) }
            }
        }

        // 3. Archivos sueltos (Sin grupo) al final de la lista
        val ungrouped = cachedAllFiles.filter { it.groupId == null }.sortedBy { it.name.lowercase() }
        if (ungrouped.isNotEmpty()) {
            if (cachedGroups.isNotEmpty()) {
                items.add(LibraryItem.SectionTitle("Archivos sueltos"))
            }
            ungrouped.forEach { items.add(LibraryItem.FileEntry(it, isInsideGroup = false)) }
        }

        displayList = items
        notifyDataSetChanged()
    }

    fun toggleGroup(groupId: String) {
        if (groupId in expandedGroupIds) expandedGroupIds.remove(groupId) else expandedGroupIds.add(groupId)
        rebuildList()
    }

    override fun getItemViewType(position: Int): Int = when (displayList[position]) {
        is LibraryItem.RecentCarousel -> TYPE_RECENT_CAROUSEL
        is LibraryItem.GroupHeader    -> TYPE_GROUP_HEADER
        is LibraryItem.SectionTitle   -> TYPE_SECTION_TITLE
        is LibraryItem.FileEntry      -> TYPE_FILE
    }

    override fun getItemCount(): Int = displayList.size

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return when (viewType) {
            TYPE_RECENT_CAROUSEL -> RecentCarouselVH(
                inflater.inflate(R.layout.item_recent_carousel, parent, false)
            )
            TYPE_GROUP_HEADER -> GroupHeaderVH(
                inflater.inflate(R.layout.item_group_header, parent, false)
            )
            TYPE_SECTION_TITLE -> SectionTitleVH(
                inflater.inflate(R.layout.item_section_title, parent, false)
            )
            else -> FileVH(
                inflater.inflate(R.layout.item_file, parent, false)
            )
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (val item = displayList[position]) {
            is LibraryItem.RecentCarousel -> (holder as RecentCarouselVH).bind(item.items)
            is LibraryItem.GroupHeader    -> (holder as GroupHeaderVH).bind(item)
            is LibraryItem.SectionTitle   -> (holder as SectionTitleVH).bind(item.title)
            is LibraryItem.FileEntry      -> (holder as FileVH).bind(item.file, item.isInsideGroup)
        }
    }

    // ─── ViewHolders ──────────────────────────────────────────────────────────

    inner class RecentCarouselVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val rvCarousel: RecyclerView = itemView.findViewById(R.id.rv_recent_carousel)

        fun bind(items: List<FileItem>) {
            rvCarousel.layoutManager = LinearLayoutManager(itemView.context, LinearLayoutManager.HORIZONTAL, false)
            rvCarousel.adapter = RecentCardsAdapter(items, onFileClick)
        }
    }

    inner class GroupHeaderVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvName: TextView   = itemView.findViewById(R.id.tv_group_name)
        private val tvCount: TextView  = itemView.findViewById(R.id.tv_group_count)
        private val ivMenu: ImageView  = itemView.findViewById(R.id.iv_group_menu)

        fun bind(item: LibraryItem.GroupHeader) {
            tvName.text = item.name
            tvCount.text = when (item.fileCount) {
                1 -> "1 archivo"
                else -> "${item.fileCount} archivos"
            }

            itemView.setOnClickListener { toggleGroup(item.groupId) }

            ivMenu.setOnClickListener { v ->
                onGroupMenuClick(item.groupId, item.name, v)
            }
        }
    }

    inner class SectionTitleVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvTitle: TextView = itemView.findViewById(R.id.tv_section_title)
        fun bind(title: String) {
            tvTitle.text = title
        }
    }

    inner class FileVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvName: TextView     = itemView.findViewById(R.id.tv_file_name)
        private val tvSubtitle: TextView = itemView.findViewById(R.id.tv_file_subtitle)
        private val ivMenu: ImageView    = itemView.findViewById(R.id.iv_file_menu)
        private val vTreeLine: View?     = itemView.findViewById(R.id.v_tree_line)

        fun bind(file: FileItem, isInsideGroup: Boolean) {
            // Nombre limpio sin extensión
            tvName.text = file.name
                .replace(".html", "", ignoreCase = true)
                .replace(".htm", "", ignoreCase = true)

            // Subtítulo con metadatos relativos
            tvSubtitle.text = formatFileSubtitle(file)

            vTreeLine?.visibility = if (isInsideGroup) View.VISIBLE else View.GONE

            // Ajustar padding si está suelto o dentro de grupo
            val density = itemView.context.resources.displayMetrics.density
            val startPadding = if (isInsideGroup) (40 * density).toInt() else (16 * density).toInt()
            itemView.setPadding(startPadding, itemView.paddingTop, itemView.paddingRight, itemView.paddingBottom)

            itemView.setOnClickListener { onFileClick(file) }
            ivMenu.setOnClickListener { v -> onFileMenuClick(file, v) }
        }
    }

    // ─── Adapter de Tarjetas Horizontales de Recientes ─────────────────────────

    inner class RecentCardsAdapter(
        private val recentItems: List<FileItem>,
        private val onItemClick: (FileItem) -> Unit
    ) : RecyclerView.Adapter<RecentCardsAdapter.RecentCardVH>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecentCardVH {
            val view = LayoutInflater.from(parent.context).inflate(R.layout.item_recent_card, parent, false)
            return RecentCardVH(view)
        }

        override fun onBindViewHolder(holder: RecentCardVH, position: Int) {
            holder.bind(recentItems[position])
        }

        override fun getItemCount(): Int = recentItems.size

        inner class RecentCardVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
            private val tvName: TextView = itemView.findViewById(R.id.tv_recent_name)
            private val tvTime: TextView = itemView.findViewById(R.id.tv_recent_time)

            fun bind(file: FileItem) {
                tvName.text = file.name
                    .replace(".html", "", ignoreCase = true)
                    .replace(".htm", "", ignoreCase = true)

                tvTime.text = formatRelativeTime(file.lastOpened)
                itemView.setOnClickListener { onItemClick(file) }
            }
        }
    }

    private fun formatFileSubtitle(file: FileItem): String {
        return if (file.lastOpened > 0) {
            "Abierto " + formatRelativeTime(file.lastOpened).lowercase()
        } else {
            "Añadido " + formatRelativeTime(file.addedAt).lowercase()
        }
    }

    private fun formatRelativeTime(timestamp: Long): String {
        if (timestamp <= 0) return "recientemente"
        val diff = System.currentTimeMillis() - timestamp
        val minutes = diff / (1000 * 60)
        val hours   = diff / (1000 * 60 * 60)
        val days    = diff / (1000 * 60 * 60 * 24)

        return when {
            minutes < 2  -> "hace un momento"
            minutes < 60 -> "hace $minutes min"
            hours < 24   -> "hace $hours h"
            days == 1L   -> "ayer"
            days < 7     -> "hace $days días"
            else -> {
                val sdf = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
                sdf.format(Date(timestamp))
            }
        }
    }
}
