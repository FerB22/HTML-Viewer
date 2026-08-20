package com.example.htmlreader

data class FileItem(
    val id: String,
    val uri: String,
    val name: String,
    val groupId: String? = null,       // null = sin grupo
    val lastOpened: Long = 0L,         // timestamp; 0 = nunca abierto
    val addedAt: Long = System.currentTimeMillis()
)
