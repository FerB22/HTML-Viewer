package com.example.htmlreader

import android.content.Context
import android.content.SharedPreferences
import org.json.JSONArray
import org.json.JSONObject

/**
 * Repositorio de la biblioteca de archivos HTML.
 * Persiste datos usando SharedPreferences con serialización JSON.
 * Usa org.json (incluido en Android) sin dependencias externas.
 */
class LibraryRepository(context: Context) {

    private val prefs: SharedPreferences =
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    companion object {
        private const val PREFS_NAME  = "html_reader_library"
        private const val KEY_FILES   = "files"
        private const val KEY_GROUPS  = "groups"
    }

    // ─── Archivos ─────────────────────────────────────────────────────────────

    fun getFiles(): List<FileItem> {
        val json = prefs.getString(KEY_FILES, "[]") ?: "[]"
        return try {
            val array = JSONArray(json)
            (0 until array.length()).map { i ->
                val obj = array.getJSONObject(i)
                FileItem(
                    id         = obj.getString("id"),
                    uri        = obj.getString("uri"),
                    name       = obj.getString("name"),
                    groupId    = if (obj.isNull("groupId")) null else obj.getString("groupId"),
                    lastOpened = obj.optLong("lastOpened", 0L),
                    addedAt    = obj.optLong("addedAt", 0L)
                )
            }
        } catch (e: Exception) {
            emptyList()
        }
    }

    private fun saveFiles(files: List<FileItem>) {
        val array = JSONArray()
        files.forEach { f ->
            val obj = JSONObject()
            obj.put("id",         f.id)
            obj.put("uri",        f.uri)
            obj.put("name",       f.name)
            obj.put("groupId",    f.groupId ?: JSONObject.NULL)
            obj.put("lastOpened", f.lastOpened)
            obj.put("addedAt",    f.addedAt)
            array.put(obj)
        }
        prefs.edit().putString(KEY_FILES, array.toString()).apply()
    }

    /** Agrega múltiples archivos ignorando duplicados por URI. */
    fun addFiles(newFiles: List<FileItem>) {
        val existing = getFiles().toMutableList()
        val existingUris = existing.map { it.uri }.toSet()
        newFiles
            .filter { it.uri !in existingUris }
            .forEach { existing.add(it) }
        saveFiles(existing)
    }

    fun removeFile(fileId: String) {
        saveFiles(getFiles().filter { it.id != fileId })
    }

    /** Registra la apertura de un archivo actualizando su timestamp. */
    fun recordOpened(fileId: String) {
        val updated = getFiles().map { f ->
            if (f.id == fileId) f.copy(lastOpened = System.currentTimeMillis()) else f
        }
        saveFiles(updated)
    }

    /** Mueve un archivo a un grupo (null = quitar de todos los grupos). */
    fun moveFileToGroup(fileId: String, groupId: String?) {
        val updated = getFiles().map { f ->
            if (f.id == fileId) f.copy(groupId = groupId) else f
        }
        saveFiles(updated)
    }

    /** Devuelve los N archivos abiertos más recientemente. */
    fun getRecents(limit: Int = 8): List<FileItem> =
        getFiles()
            .filter { it.lastOpened > 0 }
            .sortedByDescending { it.lastOpened }
            .take(limit)

    // ─── Grupos ───────────────────────────────────────────────────────────────

    fun getGroups(): List<Group> {
        val json = prefs.getString(KEY_GROUPS, "[]") ?: "[]"
        return try {
            val array = JSONArray(json)
            (0 until array.length()).map { i ->
                val obj = array.getJSONObject(i)
                Group(id = obj.getString("id"), name = obj.getString("name"))
            }
        } catch (e: Exception) {
            emptyList()
        }
    }

    private fun saveGroups(groups: List<Group>) {
        val array = JSONArray()
        groups.forEach { g ->
            val obj = JSONObject()
            obj.put("id",   g.id)
            obj.put("name", g.name)
            array.put(obj)
        }
        prefs.edit().putString(KEY_GROUPS, array.toString()).apply()
    }

    fun addGroup(group: Group) {
        val groups = getGroups().toMutableList()
        groups.add(group)
        saveGroups(groups)
    }

    /** Elimina el grupo y mueve sus archivos a "Sin grupo". */
    fun removeGroup(groupId: String) {
        val updated = getFiles().map { f ->
            if (f.groupId == groupId) f.copy(groupId = null) else f
        }
        saveFiles(updated)
        saveGroups(getGroups().filter { it.id != groupId })
    }

    fun renameGroup(groupId: String, newName: String) {
        val updated = getGroups().map { g ->
            if (g.id == groupId) g.copy(name = newName) else g
        }
        saveGroups(updated)
    }

    // ─── Sincronización Automática de Assets ─────────────────────────────────

    /**
     * Escanea automáticamente la carpeta assets/html_study/
     * Cada subcarpeta se convierte en un Grupo (Asignatura)
     * y los archivos .html dentro se registran automáticamente en la app.
     */
    fun syncAssets(context: Context) {
        try {
            val assetManager = context.assets
            val studyFolders = assetManager.list("html_study") ?: return

            val existingFiles  = getFiles().toMutableList()
            val existingGroups = getGroups().toMutableList()

            val currentAssetItems = mutableListOf<FileItem>()

            for (folderName in studyFolders) {
                val path = "html_study/$folderName"
                val subFiles = assetManager.list(path) ?: continue

                val htmlFiles = subFiles.filter { it.endsWith(".html", ignoreCase = true) || it.endsWith(".htm", ignoreCase = true) }
                if (htmlFiles.isNotEmpty()) {
                    val formattedGroupName = folderName
                        .replace("_", " ")
                        .split(" ")
                        .filter { it.isNotBlank() }
                        .joinToString(" ") { word -> word.replaceFirstChar { it.uppercase() } }

                    var group = existingGroups.find { it.name.equals(formattedGroupName, ignoreCase = true) }
                    if (group == null) {
                        group = Group(id = "asset_group_$folderName", name = formattedGroupName)
                        existingGroups.add(group)
                    }

                    for (htmlFile in htmlFiles) {
                        val assetUri = "file:///android_asset/$path/$htmlFile"
                        val formattedFileName = htmlFile
                            .replace(".html", "", ignoreCase = true)
                            .replace(".htm", "", ignoreCase = true)
                            .replace("_", " ")
                            .replaceFirstChar { it.uppercase() }

                        val existing = existingFiles.find { it.uri == assetUri }
                        if (existing != null) {
                            currentAssetItems.add(existing)
                        } else {
                            currentAssetItems.add(
                                FileItem(
                                    id = "asset_file_${folderName}_$htmlFile",
                                    uri = assetUri,
                                    name = formattedFileName,
                                    groupId = group.id,
                                    addedAt = System.currentTimeMillis()
                                )
                            )
                        }
                    }
                }
            }

            // Conservar archivos importados manualmente + assets actuales válidos
            val nonAssetFiles = existingFiles.filter { !it.uri.startsWith("file:///android_asset/") }
            val mergedFiles = nonAssetFiles + currentAssetItems

            // Limpiar grupos de assets obsoletos que ya no tengan archivos
            val usedGroupIds = mergedFiles.mapNotNull { it.groupId }.toSet()
            val finalGroups = existingGroups.filter { group ->
                !group.id.startsWith("asset_group_") || group.id in usedGroupIds
            }

            saveGroups(finalGroups)
            saveFiles(mergedFiles)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
