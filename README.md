# 📱 HTML Viewer

<p align="center">
  <img src="app/src/main/res/drawable/ic_app_logo.png" width="110" alt="HTML Viewer Logo" style="border-radius: 22px;"/>
</p>

<p align="center">
  <strong>Lector y visor interactivo de archivos HTML para Android con persistencia fuera de Internet, renderizado completo de CSS/JS y accesos directos temáticos en la pantalla de inicio.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Android-green.svg" alt="Platform Android"/>
  <img src="https://img.shields.io/badge/Language-Kotlin-purple.svg" alt="Kotlin"/>
  <img src="https://img.shields.io/badge/UI-Material%203-black.svg" alt="Material 3"/>
  <img src="https://img.shields.io/badge/Engine-Chromium%20WebView-blue.svg" alt="WebView"/>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen.svg" alt="Status"/>
</p>

---

## 🌟 Descripción General

**HTML Viewer** es una aplicación nativa de Android optimizada para visualizar, organizar y ejecutar páginas web interactivas, cuestionarios de estudio y documentos HTML complejos en modo **100 % sin conexión**. 

A diferencia de los visores de texto convencionales, **HTML Viewer** incorpora un motor Chromium acelerado por hardware con soporte completo para:
- 🎨 Hojas de estilo externas (`styles.css`).
- ⚡ Lógica interactiva en JavaScript (`app.js`, `data.js`).
- 💾 Persistencia de respuestas, notas y estados con `localStorage`.
- 📐 Fórmulas matemáticas de alta precisión renderizadas con **KaTeX**.
- 📴 Funcionamiento autónomo sin necesidad de conexión a Internet.

---

## ✨ Características Principales

### 1. 🎨 Diseño Monocromático Minimalista
* Interfaz pura en **blanco y negro** (`#0B0C10` / `#FFFFFF`) sin emojis en el sistema.
* Íconos vectoriales limpios y modernos diseñados para máxima claridad visual.
* Soporte nativo para barras de navegación gestual y barra de estado (*Edge-to-Edge WindowInsets*).

### 2. 📂 Organización Inteligente de Carpetas y Materias
* **Autoescaneo de Assets (`assets/html_study/`)**: Al iniciar, la app detecta automáticamente las carpetas de estudio y las clasifica como grupos de materias con sus respectivos archivos HTML.
* Filas descongestionadas de 2 líneas con nombre a ancho completo y contador de archivos sutil (*"X archivos"*).
* Expansión/colapso con un solo toque en toda la fila de la carpeta.
* Archivos sueltos listados de forma limpia al final de la biblioteca.

### 3. 🔄 Carrusel Horizontal de Archivos Recientes
* Tarjetas compactas en la parte superior estilo *carrusel* para acceder rápidamente a los últimos cuestionarios abiertos.
* Indicador de tiempo relativo (*"Abierto hace 2 h"*, *"Añadido ayer"*).

### 4. ⚡ Acciones de Creación con Speed Dial FAB
* Botón flotante `+` con microinteracción de rotación suave a `×` y capa de desenfoque.
* Opciones rápidas para:
  * 📁 **Nueva carpeta / grupo**
  * 📄 **Importar archivos HTML** desde el almacenamiento del dispositivo.

### 5. 📲 Accesos Directos Temáticos en Pantalla de Inicio (*Homescreen Shortcuts*)
* Permite anclar cualquier cuestionario o página web directamente al escritorio del celular con un toque.
* **Iconos temáticos vectoriales en alta resolución (192x192)** para launchers que ocultan el texto de las aplicaciones:
  * 📊 **Estadística Descriptiva** *(Histograma y curvas)*
  * 🎓 **Cuestionario General / Estudio** *(Birrete académico)*
  * 💻 **Código / Java / Móviles / POO** *(Símbolos `< / >`)*
  * 🗄️ **Base de Datos / SQL** *(Cilindros de BD)*
  * 🐍 **Python & Pandas** *(Logotipo oficial)*
* Pop-up personalizado con tema oscuro para elegir o confirmar el icono temático antes de crearlo.

---

## 🛠️ Tecnologías y Arquitectura

* **Lenguaje:** [Kotlin](https://kotlinlang.org/)
* **UI Toolkit:** [Google Material Components (Material 3)](https://m3.material.io/)
* **Motor Web:** Android `WebView` con `WebChromeClient`, aceleración por hardware (`LAYER_TYPE_HARDWARE`) y `DOM Storage` habilitado.
* **Almacenamiento y Persistencia:**
  * Almacenamiento de la biblioteca y grupos: `Android SharedPreferences` con codificación JSON.
  * Almacenamiento del progreso del cuestionario: `HTML5 localStorage` en sandbox de aplicación.
* **Accesos directos:** `ShortcutManagerCompat` + `IconCompat` con generación dinámica de Bitmaps vectoriales.

---

## 📁 Estructura del Proyecto

```
HTML-Viewer/
├── apk/
│   └── HTML_Viewer.apk                     # Instalador ejecutable listo para Android
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── assets/
│   │   │   │   └── html_study/             # Carpeta de estudio preinstalada
│   │   │   │       ├── Cuestionario_General_Semestre_4/
│   │   │   │       │   ├── Cuestionario_General_Semestre_4.html
│   │   │   │       │   ├── styles.css
│   │   │   │       │   ├── data.js
│   │   │   │       │   └── app.js
│   │   │   │       └── Estadistica_Descriptiva_Exp1/
│   │   │   │           └── Cuestionario_Estadistica_Exp1.html
│   │   │   ├── java/com/example/htmlreader/
│   │   │   │   ├── MainActivity.kt         # Biblioteca principal, Speed Dial y atajos
│   │   │   │   ├── ViewerActivity.kt       # Motor de renderizado WebView a pantalla completa
│   │   │   │   ├── LibraryAdapter.kt       # Adapter para carrusel, carpetas y archivos
│   │   │   │   ├── LibraryRepository.kt    # Gestor de persistencia y auto-sync de assets
│   │   │   │   ├── ShortcutIconHelper.kt   # Generador dinámico de iconos temáticos en alta resolución
│   │   │   │   ├── FileItem.kt             # Modelo de datos de archivos
│   │   │   │   └── Group.kt                # Modelo de datos de grupos/carpetas
│   │   │   └── res/
│   │   │       ├── drawable/               # Íconos vectoriales monocromáticos
│   │   │       └── layout/                 # Layouts XML de biblioteca, visor y diálogos
├── build.gradle.kts
└── settings.gradle.kts
```

---

## 🚀 Instalación y Uso

### Opción 1: Descargar el instalador APK
1. Descarga el archivo [`HTML_Viewer.apk`](https://github.com/FerB22/HTML-Viewer/blob/main/apk/HTML_Viewer.apk) o desde la sección de [Releases](https://github.com/FerB22/HTML-Viewer/releases).
2. Transfiérelo a tu teléfono Android o ábrelo directamente desde la descarga.
3. Permite la instalación de aplicaciones desconocidas e instala la app.

### Opción 2: Compilar desde el código fuente
1. Clona el repositorio:
   ```bash
   git clone https://github.com/FerB22/HTML-Viewer.git
   ```
2. Abre la carpeta del proyecto en **Android Studio**.
3. Conecta tu teléfono por USB con la depuración USB habilitada (o inicia un emulador).
4. Presiona **Run (▶)** (`Shift + F10`) o compila mediante la terminal:
   ```bash
   ./gradlew assembleDebug
   ```

---

## 📚 Cómo agregar más material de estudio

Para incluir nuevas asignaturas o cuestionarios permanentes en la aplicación:
1. Crea una carpeta dentro de `app/src/main/assets/html_study/` con el nombre de la materia (ejemplo: `Programacion_Java`).
2. Coloca tus archivos `.html`, `.css`, `.js` o imágenes dentro de esa carpeta.
3. Ejecuta la aplicación; **HTML Viewer** detectará la nueva materia, creará el grupo y registrará todos los archivos automáticamente.

---

## 👤 Autor

* **Fernando Barra** - [@FerB22](https://github.com/FerB22)

---

<p align="center">Desarrollado con ❤️ para optimizar el estudio interactivo y autónomo en Android.</p>
