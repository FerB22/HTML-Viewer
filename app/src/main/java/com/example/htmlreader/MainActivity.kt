package com.example.htmlreader

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.OpenableColumns
import android.view.Menu
import android.view.MenuItem
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
    private lateinit var fabImport: FloatingActionButton
    private lateinit var toolbar: MaterialToolbar

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
        setupFab()
    }

    private fun setupWindowInsets() {
        val root = findViewById<View>(R.id.root_container)
        val appbar = findViewById<View>(R.id.appbar)

        @Suppress("DEPRECATION")
        window.statusBarColor = ContextCompat.getColor(this, R.color.bg_toolbar)
        @Suppress("DEPRECATION")
        window.navigationBarColor = ContextCompat.getColor(this, R.color.bg_primary)

        ViewCompat.setOnApplyWindowInsetsListener(root) { _, insets ->
            val statusBarTop = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top
            val navBarBottom = insets.getInsets(WindowInsetsCompat.Type.navigationBars()).bottom

            appbar.setPadding(0, statusBarTop, 0, 0)

            val params = fabImport.layoutParams as? ViewGroup.MarginLayoutParams
            if (params != null) {
                val baseMargin = (36 * resources.displayMetrics.density).toInt()
                params.bottomMargin = baseMargin + navBarBottom
                fabImport.layoutParams = params
            }

            insets
        }
    }

    override fun onResume() {
        super.onResume()
        loadLibraryData()
    }

    private fun bindViews() {
        toolbar      = findViewById(R.id.toolbar)
        recyclerView = findViewById(R.id.recycler_view)
        emptyState   = findViewById(R.id.empty_state)
        fabImport    = findViewById(R.id.fab_import)
    }

    private fun setupToolbar() {
        setSupportActionBar(toolbar)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu_library, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.action_new_group -> {
                showCreateGroupDialog()
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }

    private fun setupRecyclerView() {
        adapter = LibraryAdapter(
            onFileClick = { file -> openFileViewer(file) },
            onFileMenuClick = { file, view -> showFilePopupMenu(file, view) },
            onGroupMenuClick = { groupId, groupName, view -> showGroupPopupMenu(groupId, groupName, view) },
            onGroupClick = { groupId, groupName -> showRenameGroupDialog(groupId, groupName) }
        )
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = adapter
    }

    private fun setupFab() {
        fabImport.setOnClickListener {
            checkPermissionAndImportFiles()
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
            type = "text/html"
            putExtra(Intent.EXTRA_MIME_TYPES, arrayOf("text/html", "text/htm", "application/xhtml+xml", "application/octet-stream"))
            putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION)
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
        popup.menu.add("Mover a grupo")
        popup.menu.add("Eliminar")

        popup.setOnMenuItemClickListener { item ->
            when (item.title) {
                "Ver" -> openFileViewer(file)
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

    // ─── Diálogos ────────────────────────────────────────────────────────────

    private fun showCreateGroupDialog() {
        val container = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            val density = resources.displayMetrics.density
            val pad = (20 * density).toInt()
            setPadding(pad, (10 * density).toInt(), pad, (5 * density).toInt())
        }
        val input = EditText(this).apply {
            hint = "Nombre del grupo"
            isSingleLine = true
        }
        container.addView(input)

        AlertDialog.Builder(this)
            .setTitle("Nuevo grupo")
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
        val container = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            val density = resources.displayMetrics.density
            val pad = (20 * density).toInt()
            setPadding(pad, (10 * density).toInt(), pad, (5 * density).toInt())
        }
        val input = EditText(this).apply {
            setText(currentName)
            setSelection(currentName.length)
            isSingleLine = true
        }
        container.addView(input)

        AlertDialog.Builder(this)
            .setTitle("Renombrar grupo")
            .setView(container)
            .setPositiveButton("Guardar") { _, _ ->
                val newName = input.text.toString().trim()
                if (newName.isNotEmpty()) {
                    repo.renameGroup(groupId, newName)
                    loadLibraryData()
                }
            }
            .setNegativeButton("Cancelar", null)
            .show()
    }

    private fun showMoveToGroupDialog(file: FileItem) {
        val groups = repo.getGroups()
        val options = mutableListOf("Sin grupo")
        options.addAll(groups.map { it.name })

        AlertDialog.Builder(this)
            .setTitle("Mover \"${file.name}\" a...")
            .setItems(options.toTypedArray()) { _, which ->
                val targetGroupId = if (which == 0) null else groups[which - 1].id
                repo.moveFileToGroup(file.id, targetGroupId)
                loadLibraryData()
            }
            .show()
    }
}