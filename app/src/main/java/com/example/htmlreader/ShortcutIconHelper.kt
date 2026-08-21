package com.example.htmlreader

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF
import androidx.core.content.ContextCompat
import androidx.core.graphics.drawable.IconCompat

object ShortcutIconHelper {

    data class ThematicTheme(
        val title: String,
        val iconResId: Int,
        val bgColor: Int
    )

    fun getAvailableThemes(): List<ThematicTheme> = listOf(
        ThematicTheme("Estadística Descriptiva", R.drawable.ic_shortcut_stats, Color.parseColor("#131A2A")),
        ThematicTheme("Cuestionario General", R.drawable.ic_shortcut_general, Color.parseColor("#131A2A")),
        ThematicTheme("Código / Móviles / Java", R.drawable.ic_shortcut_code, Color.parseColor("#131A2A")),
        ThematicTheme("Base de Datos / SQL", R.drawable.ic_shortcut_database, Color.parseColor("#131A2A")),
        ThematicTheme("Python & Pandas", R.drawable.ic_shortcut_python, Color.parseColor("#131A2A"))
    )

    fun detectBestThemeIndex(fileName: String, groupName: String?): Int {
        val combined = "$fileName ${groupName ?: ""}".lowercase()
        return when {
            combined.contains("estadist") || combined.contains("descriptiv") || combined.contains("frecuenc") -> 0
            combined.contains("general") || combined.contains("semestre") || combined.contains("estudio") -> 1
            combined.contains("java") || combined.contains("poo") || combined.contains("movil") || combined.contains("móvil") || combined.contains("fullstack") -> 2
            combined.contains("base") || combined.contains("bd") || combined.contains("sql") || combined.contains("taller") -> 3
            combined.contains("python") || combined.contains("pandas") -> 4
            else -> 1
        }
    }

    /**
     * Genera un icono Bitmap en alta resolución (192x192)
     * con fondo oscuro minimalista y el símbolo temático centrado.
     */
    fun createShortcutIcon(context: Context, iconResId: Int, bgColor: Int = Color.parseColor("#131A2A")): IconCompat {
        val size = 192
        val bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)

        // 1. Fondo redondeado minimalista
        val bgPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = bgColor
            style = Paint.Style.FILL
        }
        val borderPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.parseColor("#2A344E")
            style = Paint.Style.STROKE
            strokeWidth = 4f
        }

        val rect = RectF(6f, 6f, (size - 6).toFloat(), (size - 6).toFloat())
        val cornerRadius = 40f
        canvas.drawRoundRect(rect, cornerRadius, cornerRadius, bgPaint)
        canvas.drawRoundRect(rect, cornerRadius, cornerRadius, borderPaint)

        // 2. Dibujar vector temático centrado
        val drawable = ContextCompat.getDrawable(context, iconResId)
        if (drawable != null) {
            val padding = 42
            drawable.setBounds(padding, padding, size - padding, size - padding)
            drawable.setTint(Color.WHITE)
            drawable.draw(canvas)
        }

        return IconCompat.createWithBitmap(bitmap)
    }
}
