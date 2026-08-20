package com.example.htmlreader

import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.google.android.material.floatingactionbutton.FloatingActionButton

/**
 * Abre y renderiza un archivo HTML a pantalla completa.
 * Recibe el URI y el nombre del archivo a través del Intent.
 */
class ViewerActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_FILE_URI  = "file_uri"
        const val EXTRA_FILE_NAME = "file_name"
        const val EXTRA_FILE_ID   = "file_id"
    }

    private lateinit var webView: WebView
    private lateinit var fabBack: FloatingActionButton
    private lateinit var repo: LibraryRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_viewer)

        repo = LibraryRepository(this)

        webView = findViewById(R.id.webView)
        fabBack = findViewById(R.id.fab_back)

        setupWindowInsets()
        setupWebView()

        fabBack.setOnClickListener { finish() }

        val uriString = intent.getStringExtra(EXTRA_FILE_URI)
        val fileName  = intent.getStringExtra(EXTRA_FILE_NAME) ?: "HTML Reader"
        val fileId    = intent.getStringExtra(EXTRA_FILE_ID)

        title = fileName

        if (!uriString.isNullOrBlank()) {
            if (!fileId.isNullOrBlank()) {
                repo.recordOpened(fileId)
            }
            loadHtmlFromUri(Uri.parse(uriString))
        } else {
            Toast.makeText(this, "URI de archivo no válida", Toast.LENGTH_SHORT).show()
            finish()
        }
    }

    private fun setupWindowInsets() {
        val root = findViewById<View>(R.id.root_container)
        ViewCompat.setOnApplyWindowInsetsListener(root) { _, insets ->
            val navBarBottom = insets.getInsets(WindowInsetsCompat.Type.navigationBars()).bottom
            val params = fabBack.layoutParams as? ViewGroup.MarginLayoutParams
            if (params != null) {
                val baseMargin = (36 * resources.displayMetrics.density).toInt()
                params.bottomMargin = baseMargin + navBarBottom
                fabBack.layoutParams = params
            }
            insets
        }
    }

    // ─── Configuración del WebView ───────────────────────────────────────────

    private fun setupWebView() {
        webView.settings.apply {
            javaScriptEnabled       = true
            allowFileAccess         = true
            allowContentAccess      = true
            domStorageEnabled       = true
            databaseEnabled         = true
            useWideViewPort         = true
            loadWithOverviewMode    = true
            builtInZoomControls     = true
            displayZoomControls     = false
            defaultTextEncodingName = "UTF-8"

            @Suppress("DEPRECATION")
            allowFileAccessFromFileURLs = true
            @Suppress("DEPRECATION")
            allowUniversalAccessFromFileURLs = true

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
            }
        }

        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        webView.webChromeClient = android.webkit.WebChromeClient()

        webView.webViewClient = object : WebViewClient() {
            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                    && request?.isForMainFrame == true) {
                    Toast.makeText(
                        this@ViewerActivity,
                        "Error al cargar: ${error?.description}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }

            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean = false
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true)
        }
    }

    // ─── Carga de HTML ───────────────────────────────────────────────────────

    private fun loadHtmlFromUri(uri: Uri) {
        val uriString = uri.toString()
        if (uriString.startsWith("file:///android_asset/")) {
            webView.loadUrl(uriString)
            return
        }

        try {
            val htmlContent = contentResolver.openInputStream(uri)?.use { stream ->
                stream.bufferedReader(Charsets.UTF_8).readText()
            }

            if (htmlContent.isNullOrBlank()) {
                Toast.makeText(this, "El archivo está vacío o no se pudo leer", Toast.LENGTH_SHORT).show()
                finish()
                return
            }

            webView.loadDataWithBaseURL(
                uri.toString(),
                htmlContent,
                "text/html",
                "UTF-8",
                null
            )

        } catch (e: Exception) {
            Toast.makeText(this, "Error: ${e.localizedMessage}", Toast.LENGTH_LONG).show()
            finish()
        }
    }

    // ─── Navegación del historial del WebView ────────────────────────────────

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            @Suppress("DEPRECATION")
            super.onBackPressed()
        }
    }
}
