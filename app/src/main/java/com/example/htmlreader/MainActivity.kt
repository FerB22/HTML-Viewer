package com.example.htmlreader

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.OpenableColumns
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.PopupMenu
import androidx.core.content.ContextCompat
import androidx.core.content.pm.ShortcutInfoCompat
import androidx.core.content.pm.ShortcutManagerCompat
import androidx.core.graphics.drawable.IconCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.appbar.MaterialToolbar
import com.google.android.material.floatingactionbutton.FloatingActionButton
import java.util.UUID

class MainActivity : AppCompatActivity() {

    private lateinit var repo: LibraryRepository
    private lateinit var adapter: LibraryAdapter

    private lateinit var recyclerView: RecyclerView
    private lateinit var emptyState: LinearLayout
    private lateinit var toolbar: MaterialToolbar

    // Speed Dial views
    private lateinit var viewDimOverlay: View
    private lateinit var layoutSpeedDial: LinearLayout
    private lateinit var optionNewGroup: LinearLayout
    private lateinit var optionImportFile: LinearLayout
    private lateinit var fabMain: FloatingActionButton
    private var isSpeedDialOpen = false

    // ─── Launcher de importación múltiple de archivos ────────────────────────
    private val openMultipleFilesLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == RESULT_OK) {
                result.data?.let { intent ->
                    val newFiles = mutableListOf<FileItem>()

                    // Opción A: Selección múltiple
                    if (intent.clipData != null) {
                        val count = intent.clipData!!.itemCount
                        for (i in 0 until count) {
                            val uri = intent.clipData!!.getItemAt(i).uri
                            persistUriPermission(uri)
                            val fileName = getFileName(uri) ?: "Archivo_${System.currentTimeMillis()}"
                            newFiles.add(FileItem(id = UUID.randomUUID().toString(), uri = uri.toString(), name = fileName))
                        }
                    }
                    // Opción B: Selección única
                    else if (intent.data != null) {
                        val uri = intent.data!!
                        persistUriPermission(uri)
                        val fileName = getFileName(uri) ?: "Archivo_${System.currentTimeMillis()}"
                        newFiles.add(FileItem(id = UUID.randomUUID().toString(), uri = uri.toString(), name = fileName))
                    }

                    if (newFiles.isNotEmpty()) {
                        repo.addFiles(newFiles)
                        loadLibraryData()
                        Toast.makeText(this, "Se importaron ${newFiles.size} archivo(s)", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }

    // ─── Permiso de almacenamiento (API ≤ 32) ──────────────────────────────
    private val requestPermissionLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
            if (granted) {
                launchMultipleFilesPicker()
            } else {
                Toast.makeText(this, "Se necesita permiso para acceder a archivos", Toast.LENGTH_LONG).show()
                launchMultipleFilesPicker()
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        repo = LibraryRepository(this)

        bindViews()
        setupWindowInsets()
        setupToolbar()
        setupRecyclerView()
        setupSpeedDial()
    }

    private fun setupWindowInsets() {
        val root = findViewById<View>(R.id.root_coordinator)
        val appbar = findViewById<View>(R.id.app_bar_layout)

        @Suppress("DEPRECATION")
        window.statusBarColor = ContextCompat.getColor(this, R.color.bg_toolbar)
        @Suppress("DEPRECATION")
        window.navigationBarColor = ContextCompat.getColor(this, R.color.bg_primary)

        ViewCompat.setOnApplyWindowInsetsListener(root) { _, insets ->
            val statusBarTop = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top
            val navBarBottom = insets.getInsets(WindowInsetsCompat.Type.navigationBars()).bottom

            appbar.setPadding(0, statusBarTop, 0, 0)

            val params = layoutSpeedDial.layoutParams as? ViewGroup.MarginLayoutParams
            if (params != null) {
                val baseMargin = (36 * resources.displayMetrics.density).toInt()
                params.bottomMargin = baseMargin + navBarBottom
                layoutSpeedDial.layoutParams = params
            }

            insets
        }
    }

    override fun onResume() {
        super.onResume()
        loadLibraryData()
    }

    private fun bindViews() {
        toolbar          = findViewById(R.id.toolbar)
        recyclerView     = findViewById(R.id.recycler_view)
        emptyState       = findViewById(R.id.layout_empty_state)
        viewDimOverlay   = findViewById(R.id.view_dim_overlay)
        layoutSpeedDial  = findViewById(R.id.layout_speed_dial)
        optionNewGroup   = findViewById(R.id.option_new_group)
        optionImportFile = findViewById(R.id.option_import_file)
        fabMain          = findViewById(R.id.fab_main)
    }

    private fun setupToolbar() {
        setSupportActionBar(toolbar)
    }

    private fun setupRecyclerView() {
        adapter = LibraryAdapter(
            onFileClick = { file -> openFileViewer(file) },
            onFileMenuClick = { file, view -> showFilePopupMenu(file, view) },
            onGroupMenuClick = { groupId, groupName, view -> showGroupPopupMenu(groupId, groupName, view) }
        )
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = adapter
    }

    private fun setupSpeedDial() {
        fabMain.setOnClickListener {
            toggleSpeedDial()
        }

        viewDimOverlay.setOnClickListener {
            closeSpeedDial()
        }

        optionNewGroup.setOnClickListener {
            closeSpeedDial()
            showCreateGroupDialog()
        }

        optionImportFile.setOnClickListener {
            closeSpeedDial()
            checkPermissionAndImportFiles()
        }
    }

    private fun toggleSpeedDial() {
        if (isSpeedDialOpen) closeSpeedDial() else openSpeedDial()
    }

    private fun openSpeedDial() {
        isSpeedDialOpen = true
        viewDimOverlay.visibility = View.VISIBLE
        viewDimOverlay.alpha = 0f
        viewDimOverlay.animate().alpha(1f).setDuration(200).start()

        fabMain.animate().rotation(45f).setDuration(200).start()

        optionNewGroup.visibility = View.VISIBLE
        optionNewGroup.alpha = 0f
        optionNewGroup.translationY = 40f
        optionNewGroup.animate().alpha(1f).translationY(0f).setDuration(200).setStartDelay(50).start()

        optionImportFile.visibility = View.VISIBLE
        optionImportFile.alpha = 0f
        optionImportFile.translationY = 40f
        optionImportFile.animate().alpha(1f).translationY(0f).setDuration(200).setStartDelay(0).start()
    }

    private fun closeSpeedDial() {
        if (!isSpeedDialOpen) return
        isSpeedDialOpen = false

        viewDimOverlay.animate().alpha(0f).setDuration(200).withEndAction {
            viewDimOverlay.visibility = View.GONE
        }.start()

        fabMain.animate().rotation(0f).setDuration(200).start()

        optionNewGroup.animate().alpha(0f).translationY(30f).setDuration(150).withEndAction {
            optionNewGroup.visibility = View.GONE
        }.start()

        optionImportFile.animate().alpha(0f).translationY(30f).setDuration(150).withEndAction {
            optionImportFile.visibility = View.GONE
        }.start()
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (isSpeedDialOpen) {
            closeSpeedDial()
        } else {
            @Suppress("DEPRECATION")
            super.onBackPressed()
        }
    }

    private fun loadLibraryData() {
        repo.syncAssets(this)

        val recents  = repo.getRecents()
        val groups   = repo.getGroups()
        val allFiles = repo.getFiles()

        if (allFiles.isEmpty()) {
            emptyState.visibility = View.VISIBLE
            recyclerView.visibility = View.GONE
        } else {
            emptyState.visibility = View.GONE
            recyclerView.visibility = View.VISIBLE
            adapter.submitData(recents, groups, allFiles)
        }
    }

    // ─── Importación de Archivos ─────────────────────────────────────────────

    private fun checkPermissionAndImportFiles() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            launchMultipleFilesPicker()
        } else {
            val permission = Manifest.permission.READ_EXTERNAL_STORAGE
            if (ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED) {
                launchMultipleFilesPicker()
            } else {
                requestPermissionLauncher.launch(permission)
            }
        }
    }

    private fun launchMultipleFilesPicker() {
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "*/*"
            putExtra(Intent.EXTRA_MIME_TYPES, arrayOf("text/html", "text/plain", "application/xhtml+xml"))
            putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
            addFlags(Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION or Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        openMultipleFilesLauncher.launch(intent)
    }

    private fun persistUriPermission(uri: Uri) {
        try {
            contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)
        } catch (e: SecurityException) {
            // Algunos proveedores de contenido no admiten persistencia
        }
    }

    private fun getFileName(uri: Uri): String? {
        return when (uri.scheme) {
            "content" -> {
                contentResolver.query(uri, null, null, null, null)?.use { cursor ->
                    val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                    cursor.moveToFirst()
                    if (nameIndex >= 0) cursor.getString(nameIndex) else null
                }
            }
            else -> uri.lastPathSegment
        }
    }

    // ─── Visor y Menús ───────────────────────────────────────────────────────

    private fun openFileViewer(file: FileItem) {
        val intent = Intent(this, ViewerActivity::class.java).apply {
            putExtra(ViewerActivity.EXTRA_FILE_URI, file.uri)
            putExtra(ViewerActivity.EXTRA_FILE_NAME, file.name)
            putExtra(ViewerActivity.EXTRA_FILE_ID, file.id)
        }
        startActivity(intent)
    }

    private fun showFilePopupMenu(file: FileItem, anchor: View) {
        val popup = PopupMenu(this, anchor)
        popup.menu.add("Ver")
        popup.menu.add("Crear acceso directo")
        popup.menu.add("Mover a grupo")
        popup.menu.add("Eliminar")

        popup.setOnMenuItemClickListener { item ->
            when (item.title) {
                "Ver" -> openFileViewer(file)
                "Crear acceso directo" -> showCreateShortcutDialog(file)
                "Mover a grupo" -> showMoveToGroupDialog(file)
                "Eliminar" -> {
                    repo.removeFile(file.id)
                    loadLibraryData()
                    Toast.makeText(this, "Archivo eliminado", Toast.LENGTH_SHORT).show()
                }
            }
            true
        }
        popup.show()
    }

    private fun showCreateShortcutDialog(file: FileItem) {
        val group = file.groupId?.let { gid -> repo.getGroups().find { it.id == gid } }
        val themes = ShortcutIconHelper.getAvailableThemes()
        val defaultIndex = ShortcutIconHelper.detectBestThemeIndex(file.name, group?.name)

        var selectedIndex = defaultIndex

        val cleanName = file.name
            .replace(".html", "", ignoreCase = true)
            .replace(".htm", "", ignoreCase = true)

        val dialogView = layoutInflater.inflate(R.layout.dialog_shortcut_picker, null)
        val tvFileName: android.widget.TextView = dialogView.findViewById(R.id.tv_shortcut_file_name)
        val optionsContainer: LinearLayout = dialogView.findViewById(R.id.layout_shortcut_options)
        val btnCancel: android.widget.Button = dialogView.findViewById(R.id.btn_shortcut_cancel)
        val btnConfirm: android.widget.Button = dialogView.findViewById(R.id.btn_shortcut_confirm)

        tvFileName.text = cleanName

        val radioButtons = mutableListOf<android.widget.RadioButton>()

        themes.forEachIndexed { index, theme ->
            val row = layoutInflater.inflate(R.layout.item_shortcut_dialog_row, optionsContainer, false)
            val ivIcon: android.widget.ImageView = row.findViewById(R.id.iv_option_icon)
            val tvTitle: android.widget.TextView = row.findViewById(R.id.tv_option_title)
            val rbCheck: android.widget.RadioButton = row.findViewById(R.id.rb_option_check)

            ivIcon.setImageResource(theme.iconResId)
            tvTitle.text = theme.title
            rbCheck.isChecked = (index == defaultIndex)

            radioButtons.add(rbCheck)

            row.setOnClickListener {
                selectedIndex = index
                radioButtons.forEachIndexed { i, rb ->
                    rb.isChecked = (i == index)
                }
            }

            optionsContainer.addView(row)
        }

        val dialog = AlertDialog.Builder(this)
            .setView(dialogView)
            .create()

        dialog.window?.setBackgroundDrawableResource(android.R.color.transparent)

        btnCancel.setOnClickListener {
            dialog.dismiss()
        }

        btnConfirm.setOnClickListener {
            val chosen = themes[selectedIndex]
            createHomeScreenShortcut(file, chosen.iconResId, chosen.bgColor)
            dialog.dismiss()
        }

        dialog.show()
    }

    private fun createHomeScreenShortcut(file: FileItem, iconResId: Int, bgColor: Int) {
        if (ShortcutManagerCompat.isRequestPinShortcutSupported(this)) {
            val cleanName = file.name
                .replace(".html", "", ignoreCase = true)
                .replace(".htm", "", ignoreCase = true)

            val shortcutIntent = Intent(this, ViewerActivity::class.java).apply {
                action = Intent.ACTION_VIEW
                putExtra(ViewerActivity.EXTRA_FILE_URI, file.uri)
                putExtra(ViewerActivity.EXTRA_FILE_NAME, cleanName)
                putExtra(ViewerActivity.EXTRA_FILE_ID, file.id)
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }

            val iconCompat = ShortcutIconHelper.createShortcutIcon(this, iconResId, bgColor)

            val pinShortcutInfo = ShortcutInfoCompat.Builder(this, "shortcut_${file.id}")
                .setShortLabel(cleanName)
                .setLongLabel(cleanName)
                .setIcon(iconCompat)
                .setIntent(shortcutIntent)
                .build()

            val success = ShortcutManagerCompat.requestPinShortcut(this, pinShortcutInfo, null)
            if (success) {
                Toast.makeText(this, "Acceso directo creado para \"$cleanName\"", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "No se pudo crear el acceso directo", Toast.LENGTH_SHORT).show()
            }
        } else {
            Toast.makeText(this, "Tu pantalla de inicio no admite accesos directos", Toast.LENGTH_SHORT).show()
        }
    }

    private fun showGroupPopupMenu(groupId: String, groupName: String, anchor: View) {
        val popup = PopupMenu(this, anchor)
        popup.menu.add("Renombrar")
        popup.menu.add("Eliminar grupo")

        popup.setOnMenuItemClickListener { item ->
            when (item.title) {
                "Renombrar" -> showRenameGroupDialog(groupId, groupName)
                "Eliminar grupo" -> {
                    repo.removeGroup(groupId)
                    loadLibraryData()
                    Toast.makeText(this, "Grupo eliminado", Toast.LENGTH_SHORT).show()
                }
            }
            true
        }
        popup.show()
    }

    // ─── Diálogos ─────────────────────────────────────────────────────────────

    private fun showCreateGroupDialog() {
        val input = EditText(this).apply {
            hint = "Nombre de la carpeta"
            setSingleLine(true)
            setTextColor(ContextCompat.getColor(context, R.color.text_primary))
            setHintTextColor(ContextCompat.getColor(context, R.color.text_dim))
        }

        val container = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            val pad = (20 * resources.displayMetrics.density).toInt()
            setPadding(pad, pad / 2, pad, pad / 2)
            addView(input)
        }

        AlertDialog.Builder(this)
            .setTitle("Nueva carpeta")
            .setView(container)
            .setPositiveButton("Crear") { _, _ ->
                val name = input.text.toString().trim()
                if (name.isNotEmpty()) {
                    repo.addGroup(Group(id = UUID.randomUUID().toString(), name = name))
                    loadLibraryData()
                }
            }
            .setNegativeButton("Cancelar", null)
            .show()
    }

    private fun showRenameGroupDialog(groupId: String, currentName: String) {
        val input = EditText(this).apply {
            setText(currentName)
            setSingleLine(true)
            selectAll()
            setTextColor(ContextCompat.getColor(context, R.color.text_primary))
            setHintTextColor(ContextCompat.getColor(context, R.color.text_dim))
        }

        val container = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            val pad = (20 * resources.displayMetrics.density).toInt()
            setPadding(pad, pad / 2, pad, pad / 2)
            addView(input)
        }

        AlertDialog.Builder(this)
            .setTitle("Renombrar carpeta")
            .setView(container)
            .setPositiveButton("Guardar") { _, _ ->
                val newName = input.text.toString().trim()
                if (newName.isNotEmpty() && newName != currentName) {
                    repo.renameGroup(groupId, newName)
                    loadLibraryData()
                }
            }
            .setNegativeButton("Cancelar", null)
            .show()
    }

    private fun showMoveToGroupDialog(file: FileItem) {
        val groups = repo.getGroups()
        val options = mutableListOf<String>("Sin grupo")
        options.addAll(groups.map { it.name })

        val currentSelection = if (file.groupId == null) 0
        else groups.indexOfFirst { it.id == file.groupId } + 1

        AlertDialog.Builder(this)
            .setTitle("Mover \"${file.name}\" a:")
            .setSingleChoiceItems(options.toTypedArray(), currentSelection) { dialog, which ->
                val targetGroupId = if (which == 0) null else groups[which - 1].id
                repo.moveFileToGroup(file.id, targetGroupId)
                loadLibraryData()
                dialog.dismiss()
            }
            .setNegativeButton("Cancelar", null)
            .show()
    }
}