package com.example.htmlreader

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

// ─── Modelo de items del RecyclerView ────────────────────────────────────────

sealed class LibraryItem {
    /** Encabezado de la sección "Recientes" */
    object RecentHeader : LibraryItem()

    /** Encabezado de un grupo (o de la sección "Sin grupo" cuando groupId == null) */
    data class GroupHeader(
        val groupId: String?,   // null = "Sin grupo"
        val name: String,
        val isExpanded: Boolean,
        val fileCount: Int
    ) : LibraryItem()

    /** Fila de un archivo */
    data class FileEntry(
        val file: FileItem,
        val isInRecentSection: Boolean = false
    ) : LibraryItem()
}

// ─── Adapter ──────────────────────────────────────────────────────────────────

class LibraryAdapter(
    private val onFileClick: (FileItem) -> Unit,
    private val onFileMenuClick: (FileItem, View) -> Unit,
    private val onGroupMenuClick: (String, String, View) -> Unit,   // groupId, name, anchor
    private val onGroupClick: (String, String) -> Unit              // groupId, name (al hacer clic en el grupo)
) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    companion object {
        private const val TYPE_RECENT_HEADER = 0
        private const val TYPE_GROUP_HEADER  = 1
        private const val TYPE_FILE          = 2

        // Claves especiales para controlar expansión
        private const val KEY_RECENT    = "__recent__"
        private const val KEY_UNGROUPED = "__ungrouped__"
    }

    // Secciones expandidas por defecto: recientes y "Sin grupo"
    private val expandedKeys = mutableSetOf(KEY_RECENT, KEY_UNGROUPED)

    private var displayList: List<LibraryItem> = emptyList()

    // ─── Datos en memoria para reconstruir la lista ───────────────────────────
    private var cachedRecents: List<FileItem> = emptyList()
    private var cachedGroups: List<Group>     = emptyList()
    private var cachedAllFiles: List<FileItem> = emptyList()

    /** Actualiza todos los datos y reconstruye la lista visible. */
    fun submitData(
        recents: List<FileItem>,
        groups: List<Group>,
        allFiles: List<FileItem>
    ) {
        cachedRecents  = recents
        cachedGroups   = groups
        cachedAllFiles = allFiles
        rebuildList()
    }

    private fun rebuildList() {
        val items = mutableListOf<LibraryItem>()

        // 1. Sección Recientes
        if (cachedRecents.isNotEmpty()) {
            items.add(LibraryItem.RecentHeader)
            if (KEY_RECENT in expandedKeys) {
                cachedRecents.forEach { items.add(LibraryItem.FileEntry(it, isInRecentSection = true)) }
            }
        }

        // 2. Sección "Sin grupo"
        val ungrouped = cachedAllFiles.filter { it.groupId == null }.sortedBy { it.name.lowercase() }
        items.add(
            LibraryItem.GroupHeader(
                groupId = null,
                name = "Sin grupo",
                isExpanded = KEY_UNGROUPED in expandedKeys,
                fileCount = ungrouped.size
            )
        )
        if (KEY_UNGROUPED in expandedKeys) {
            ungrouped.forEach { items.add(LibraryItem.FileEntry(it)) }
        }

        // 3. Grupos nombrados
        cachedGroups.forEach { group ->
            val groupFiles = cachedAllFiles
                .filter { it.groupId == group.id }
                .sortedBy { it.name.lowercase() }
            val isExpanded = group.id in expandedKeys
            items.add(
                LibraryItem.GroupHeader(
                    groupId = group.id,
                    name = group.name,
                    isExpanded = isExpanded,
                    fileCount = groupFiles.size
                )
            )
            if (isExpanded) {
                groupFiles.forEach { items.add(LibraryItem.FileEntry(it)) }
            }
        }

        displayList = items
        notifyDataSetChanged()
    }

    /** Alterna la expansión de una sección. */
    fun toggleSection(key: String) {
        if (key in expandedKeys) expandedKeys.remove(key) else expandedKeys.add(key)
        rebuildList()
    }

    // ─── RecyclerView ─────────────────────────────────────────────────────────

    override fun getItemViewType(position: Int): Int = when (displayList[position]) {
        is LibraryItem.RecentHeader -> TYPE_RECENT_HEADER
        is LibraryItem.GroupHeader  -> TYPE_GROUP_HEADER
        is LibraryItem.FileEntry    -> TYPE_FILE
    }

    override fun getItemCount(): Int = displayList.size

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return when (viewType) {
            TYPE_RECENT_HEADER -> RecentHeaderVH(
                inflater.inflate(R.layout.item_section_header, parent, false)
            )
            TYPE_GROUP_HEADER  -> GroupHeaderVH(
                inflater.inflate(R.layout.item_group_header, parent, false)
            )
            else               -> FileVH(
                inflater.inflate(R.layout.item_file, parent, false)
            )
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (val item = displayList[position]) {
            is LibraryItem.RecentHeader -> {
                (holder as RecentHeaderVH).bind(KEY_RECENT in expandedKeys) { toggleSection(KEY_RECENT) }
            }
            is LibraryItem.GroupHeader -> {
                val key = item.groupId ?: KEY_UNGROUPED
                (holder as GroupHeaderVH).bind(item) {
                    toggleSection(key)
                }
            }
            is LibraryItem.FileEntry -> {
                (holder as FileVH).bind(
                    file          = item.file,
                    onFileClick   = { onFileClick(item.file) },
                    onMenuClick   = { v -> onFileMenuClick(item.file, v) }
                )
            }
        }
    }

    // ─── ViewHolders ──────────────────────────────────────────────────────────

    inner class RecentHeaderVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val ivArrow: ImageView = itemView.findViewById(R.id.iv_arrow)

        fun bind(isExpanded: Boolean, onToggle: () -> Unit) {
            ivArrow.setImageResource(if (isExpanded) R.drawable.ic_chevron_down else R.drawable.ic_chevron_right)
            itemView.setOnClickListener { onToggle() }
        }
    }

    inner class GroupHeaderVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvName:  TextView  = itemView.findViewById(R.id.tv_group_name)
        private val tvCount: TextView  = itemView.findViewById(R.id.tv_group_count)
        private val ivArrow: ImageView = itemView.findViewById(R.id.iv_arrow)
        private val ivMenu:  ImageView = itemView.findViewById(R.id.iv_group_menu)

        fun bind(item: LibraryItem.GroupHeader, onToggle: () -> Unit) {
            tvName.text  = item.name
            tvCount.text = "(${item.fileCount})"
            ivArrow.setImageResource(if (item.isExpanded) R.drawable.ic_chevron_down else R.drawable.ic_chevron_right)

            // Flecha: altera el estado expandido/colapsado
            ivArrow.setOnClickListener { onToggle() }

            if (item.groupId == null) {
                ivMenu.visibility = View.INVISIBLE
                itemView.setOnClickListener { onToggle() }
            } else {
                ivMenu.visibility = View.VISIBLE
                ivMenu.setOnClickListener { v ->
                    onGroupMenuClick(item.groupId, item.name, v)
                }
                // Al presionar sobre el grupo, abre el diálogo para editar nombre
                itemView.setOnClickListener {
                    onGroupClick(item.groupId, item.name)
                }
            }
        }
    }

    inner class FileVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvName: TextView  = itemView.findViewById(R.id.tv_file_name)
        private val ivMenu: ImageView = itemView.findViewById(R.id.iv_file_menu)

        fun bind(file: FileItem, onFileClick: () -> Unit, onMenuClick: (View) -> Unit) {
            tvName.text = file.name
            itemView.setOnClickListener { onFileClick() }
            ivMenu.setOnClickListener { v -> onMenuClick(v) }
        }
    }
}
