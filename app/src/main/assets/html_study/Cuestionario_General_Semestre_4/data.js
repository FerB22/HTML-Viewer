// Base de Datos Centralizada de Cuestionarios y Teoría Semestre 4
const QUESTION_BANK = [
  {
    "id": "POB-01",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "poblacion",
    "categoryLabel": "👥 Población y Muestra",
    "difficulty": "Fácil",
    "context": "Una universidad realizó una encuesta a estudiantes de carreras de informática para conocer su comportamiento digital (edad, red social preferida, horas de uso diario y satisfacción con internet). Respondieron la encuesta 300 estudiantes.",
    "question": "¿Cuál es la **población** estadística de este estudio?",
    "code": null,
    "options": [
      "Los 300 estudiantes de informática que completaron la encuesta.",
      "Todos los estudiantes pertenecientes a las carreras de informática de esa universidad.",
      "Todos los estudiantes universitarios y escolares del país.",
      "El conjunto de computadores y redes de la universidad."
    ],
    "correctIndex": 1,
    "hint": "Recuerda que la población es el universo completo o conjunto total de interés sobre el cual se quieren obtener conclusiones.",
    "explanation": "La **población** está conformada por la totalidad de estudiantes que pertenecen a las carreras de informática de dicha universidad. Los 300 estudiantes que efectivamente respondieron conforman únicamente la **muestra** ($n = 300$)."
  },
  {
    "id": "POB-02",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "poblacion",
    "categoryLabel": "👥 Población y Muestra",
    "difficulty": "Fácil",
    "context": "Una empresa de telecomunicaciones analizó durante un semestre una base de datos con 250 problemas técnicos reportados por sus usuarios (tipo de problema, tiempo de resolución, región y gravedad).",
    "question": "En este caso, ¿cuál es la **muestra** del estudio?",
    "code": null,
    "options": [
      "Todos los clientes con contrato activo en la empresa de telecomunicaciones.",
      "La totalidad de fallas técnicas ocurridas en la historia de las telecomunicaciones.",
      "Los 250 problemas técnicos registrados y analizados durante el semestre.",
      "El tiempo total en horas que demoró en atenderse a los clientes."
    ],
    "correctIndex": 2,
    "hint": "La muestra es el subconjunto específico de registros o elementos que se extrajeron para realizar el análisis.",
    "explanation": "La **muestra** es el grupo de $n = 250$ problemas técnicos específicamente seleccionados y medidos en la base de datos."
  },
  {
    "id": "POB-03",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "poblacion",
    "categoryLabel": "👥 Población y Muestra",
    "difficulty": "Intermedio",
    "context": "Según el Monitor Global de Educación de Ipsos (2023), se aplicó una encuesta en línea a 23.248 personas adultas en 29 países para conocer su opinión sobre si los profesores deben capacitarse en Inteligencia Artificial.",
    "question": "¿Cuál es la **población** y cuál es la **muestra** de esta investigación?",
    "code": null,
    "options": [
      "Población: Los 23.248 encuestados. Muestra: Las personas de los 29 países.",
      "Población: La población adulta de los 29 países estudiados. Muestra: Las 23.248 personas que respondieron la encuesta.",
      "Población: Todos los profesores del mundo. Muestra: Los estudiantes de colegios.",
      "Población: La Inteligencia Artificial. Muestra: El 65% que votó a favor."
    ],
    "correctIndex": 1,
    "hint": "Distingue entre el universo de personas al que representan los resultados y el número exacto de individuos que respondieron.",
    "explanation": "La población corresponde al conjunto global de personas adultas de los 29 países seleccionados, mientras que la muestra $n$ está compuesta exactamente por las 23.248 personas que participaron efectivamente contestando la encuesta."
  },
  {
    "id": "POB-04",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "poblacion",
    "categoryLabel": "👥 Población y Muestra",
    "difficulty": "Intermedio",
    "context": "Un estudio de Statista sobre el mercado global de audiolibros analizó los hábitos de lectura en personas de 18 a 64 años de varios países y reportó el porcentaje de encuestados que consumieron audiolibros en los últimos 12 meses.",
    "question": "¿Cuál es la **unidad de análisis** (o elemento individual) de este estudio?",
    "code": null,
    "options": [
      "Cada país que aparece en el gráfico comparativo.",
      "Cada persona encuestada individualmente.",
      "El valor en dólares del mercado de audiolibros.",
      "El porcentaje promedio obtenido por China."
    ],
    "correctIndex": 1,
    "hint": "La unidad de análisis es el objeto, persona o registro individual sobre el cual se mide la variable de interés.",
    "explanation": "La unidad de análisis o elemento es **cada persona encuestada**, ya que sobre cada individuo se evalúa si consumió o no audiolibros durante los últimos 12 meses."
  },
  {
    "id": "POB-05",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "poblacion",
    "categoryLabel": "👥 Población y Muestra",
    "difficulty": "Fácil",
    "context": "Un analista de Netflix examina una base de datos con 8.807 títulos (películas y series) disponibles en la plataforma para clasificar la distribución de categorías y países de origen.",
    "question": "Si el objetivo del estudio es caracterizar el catálogo completo de Netflix a la fecha, ¿qué representan los 8.807 títulos?",
    "code": null,
    "options": [
      "Una muestra pequeña no representativa.",
      "La población total del catálogo registrado en esa fecha.",
      "Una variable cualitativa discreta.",
      "La frecuencia relativa acumulada."
    ],
    "correctIndex": 1,
    "hint": "Si el dataset contiene la totalidad de los elementos existentes objeto de estudio, estamos ante la población total.",
    "explanation": "Dado que la base de datos contiene la totalidad de los títulos disponibles en el catálogo analizado en ese período, el conjunto de 8.807 registros constituye la **población** del catálogo."
  },
  {
    "id": "POB-06",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "poblacion",
    "categoryLabel": "👥 Población y Muestra",
    "difficulty": "Intermedio",
    "context": "En un Instituto Profesional se recolectaron los datos de 1.200 estudiantes de jornada diurna y vespertina para evaluar el número de asignaturas reprobadas y decidir cursos de nivelación.",
    "question": "¿Qué afirmación describe correctamente la relación entre población y muestra en este caso?",
    "code": null,
    "options": [
      "La muestra siempre es de mayor tamaño que la población.",
      "Los 1.200 estudiantes analizados son una muestra si el instituto tiene una matrícula total mayor (ej. 15.000 alumnos).",
      "La población son las asignaturas reprobadas y la muestra son las aprobadas.",
      "No es posible definir una muestra cuando existen dos jornadas de estudio."
    ],
    "correctIndex": 1,
    "hint": "Si se analizan 1.200 alumnos de una institución que alberga muchos más estudiantes, esos 1.200 forman una muestra.",
    "explanation": "Si la institución cuenta con una matrícula total superior, los 1.200 alumnos registrados representan una muestra representativa del total de estudiantes del instituto."
  },
  {
    "id": "POB-07",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "poblacion",
    "categoryLabel": "👥 Población y Muestra",
    "difficulty": "Fácil",
    "context": "El gobierno de San Francisco publicó los sueldos base de funcionarios públicos entre 2011 y 2014. Un analista extrae 5.000 registros para calcular la desviación estándar del sueldo.",
    "question": "Los 5.000 registros extraídos corresponden a:",
    "code": null,
    "options": [
      "La población de todos los funcionarios.",
      "Una muestra de los funcionarios públicos.",
      "Un parámetro poblacional fijo.",
      "La moda salarial del año 2011."
    ],
    "correctIndex": 1,
    "hint": "Un subconjunto extraído de la base total para fines de cálculo es una muestra.",
    "explanation": "Al extraer un subgrupo de 5.000 observaciones del total de funcionarios de la ciudad, se está trabajando con una **muestra** ($n = 5.000$)."
  },
  {
    "id": "POB-08",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "poblacion",
    "categoryLabel": "👥 Población y Muestra",
    "difficulty": "Avanzado",
    "context": "Una consultora vocacional analiza una base de datos con información de todas las carreras técnicas y profesionales de Chile durante los años 2024 y 2025 para asesorar a estudiantes.",
    "question": "¿Por qué es crucial definir correctamente la población antes de calcular medidas de resumen (como la media de ingresos)?",
    "code": null,
    "options": [
      "Porque si la población no está bien delimitada, las conclusiones e inferencias no serán válidas para el grupo de interés.",
      "Porque Pandas solo puede ejecutar el comando `.describe()` si la población es finita.",
      "Porque la desviación estándar es igual a cero en cualquier muestra.",
      "Porque evita tener que clasificar las variables en cualitativas o cuantitativas."
    ],
    "correctIndex": 0,
    "hint": "El alcance y validez de cualquier conclusión depende de a qué grupo específico representan los datos.",
    "explanation": "Definir con precisión el marco poblacional asegura que las decisiones, generalizaciones y proyecciones tengan validez estadística y no se extrapolen erróneamente a grupos no representados."
  },
  {
    "id": "VAR-01",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "variables",
    "categoryLabel": "🏷️ Tipos de Variables",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿Cómo se clasifica la variable **'Nivel de satisfacción con la conexión a internet'**, medida en las categorías: *Muy insatisfecho, Insatisfecho, Neutral, Satisfecho, Muy satisfecho*?",
    "code": null,
    "options": [
      "Cualitativa Nominal",
      "Cualitativa Ordinal",
      "Cuantitativa Discreta",
      "Cuantitativa Continua"
    ],
    "correctIndex": 1,
    "hint": "Observa que las respuestas son palabras o estados (cualidad) pero tienen un ordenamiento o escala clara de menor a mayor.",
    "explanation": "Es **Cualitativa Ordinal** porque describe una cualidad no numérica pero posee un orden o jerarquía intrínseca evidente entre sus categorías."
  },
  {
    "id": "VAR-02",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "variables",
    "categoryLabel": "🏷️ Tipos de Variables",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿Cómo se clasifica la variable **'Tiempo de resolución de una falla técnica'** medida en minutos (ej. $17.5$ min, $39.2$ min)?",
    "code": null,
    "options": [
      "Cualitativa Nominal",
      "Cualitativa Ordinal",
      "Cuantitativa Discreta",
      "Cuantitativa Continua"
    ],
    "correctIndex": 3,
    "hint": "El tiempo se mide en una escala continua y admite infinitos valores decimales e intermedios.",
    "explanation": "Es **Cuantitativa Continua** porque es una magnitud numérica resultante de una medición temporal que admite números decimales o fraccionarios."
  },
  {
    "id": "VAR-03",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "variables",
    "categoryLabel": "🏷️ Tipos de Variables",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿Cómo se clasifica la variable **'Número de asignaturas reprobadas por un estudiante'** ($0, 1, 2, 3, \\dots$)?",
    "code": null,
    "options": [
      "Cualitativa Ordinal",
      "Cuantitativa Discreta",
      "Cuantitativa Continua",
      "Cualitativa Nominal"
    ],
    "correctIndex": 1,
    "hint": "Es una variable numérica que surge de un conteo exacto por unidades enteras (no puedes reprobar 1.73 asignaturas).",
    "explanation": "Es **Cuantitativa Discreta** ya que toma valores numéricos enteros no negativos producto de un conteo."
  },
  {
    "id": "VAR-04",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "variables",
    "categoryLabel": "🏷️ Tipos de Variables",
    "difficulty": "Intermedio",
    "context": null,
    "question": "Si codificamos la variable **'Región de Chile'** asignando números (ej. $1$: Tarapacá, $2$: Antofagasta, $13$: Metropolitana), ¿qué tipo de variable es y qué operación está **prohibida** estadísticamente?",
    "code": null,
    "options": [
      "Pasa a ser Cuantitativa Continua y podemos calcular su mediana.",
      "Pasa a ser Cuantitativa Discreta y podemos sumarlas.",
      "Sigue siendo Cualitativa Nominal; calcular su promedio aritmético es un error grave sin sentido conceptual.",
      "Es Cualitativa Ordinal porque el número 13 es mayor que el número 1."
    ],
    "correctIndex": 2,
    "hint": "Asignar una etiqueta numérica a un nombre de lugar no cambia su naturaleza categórica.",
    "explanation": "Asignar un código numérico a una categoría es solo una convención de identificación. La variable sigue siendo **Cualitativa Nominal** y calcular el promedio de los números de región carece totalmente de sentido lógico y estadístico."
  },
  {
    "id": "VAR-05",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "variables",
    "categoryLabel": "🏷️ Tipos de Variables",
    "difficulty": "Intermedio",
    "context": null,
    "question": "¿Cómo se clasifica la variable **'Red social preferida'** (Instagram, TikTok, X, LinkedIn, Facebook)?",
    "code": null,
    "options": [
      "Cualitativa Nominal",
      "Cualitativa Ordinal",
      "Cuantitativa Discreta",
      "Cuantitativa Continua"
    ],
    "correctIndex": 0,
    "hint": "¿Existe un orden matemático obligatorio entre Instagram y TikTok?",
    "explanation": "Es **Cualitativa Nominal** porque agrupa respuestas en categorías o nombres sin una jerarquía u orden numérico intrínseco."
  },
  {
    "id": "VAR-06",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "variables",
    "categoryLabel": "🏷️ Tipos de Variables",
    "difficulty": "Avanzado",
    "context": null,
    "question": "En una encuesta sobre salud pública, la suma de los porcentajes de las opciones de respuesta da un total de **145%**. ¿A qué se debe esto estadísticamente?",
    "code": null,
    "options": [
      "A que hubo un error de redondeo en el software de cálculo.",
      "A que la pregunta fue de alternativa múltiple (cada encuestado podía marcar más de una opción simultáneamente).",
      "A que la muestra utilizada era demasiado pequeña.",
      "A que la variable era cuantitativa continua."
    ],
    "correctIndex": 1,
    "hint": "Cuando un encuestado puede seleccionar 2 o más opciones a la vez, las frecuencias relativas se calculan sobre el total de personas y la suma superará el 100%.",
    "explanation": "En preguntas con **selección múltiple**, una misma persona aporta a varias categorías a la vez, por lo que la suma de las frecuencias relativas porcentuales excede el 100%."
  },
  {
    "id": "PY-01",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "python",
    "categoryLabel": "🐍 Python & Pandas",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿Qué atributo o método de un DataFrame de Pandas (`df`) entrega en una sola línea la cantidad total de **filas y columnas** en formato de tupla `(filas, columnas)`?",
    "code": null,
    "options": [
      "`df.info()`",
      "`df.shape`",
      "`len(df)`",
      "`df.describe()`"
    ],
    "correctIndex": 1,
    "hint": "Es un atributo (sin paréntesis) que describe las dimensiones del arreglo o tabla.",
    "explanation": "`df.shape` retorna una tupla con la estructura exacta `(n_filas, n_columnas)` de forma limpia e inmediata."
  },
  {
    "id": "PY-02",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "python",
    "categoryLabel": "🐍 Python & Pandas",
    "difficulty": "Intermedio",
    "context": null,
    "question": "Para calcular rápidamente la frecuencia absoluta de cada categoría única de la columna `'Carrera'` en un DataFrame `df`, ¿qué función de Pandas es la indicada?",
    "code": null,
    "options": [
      "`df['Carrera'].count()`",
      "`df['Carrera'].value_counts()`",
      "`df['Carrera'].sum()`",
      "`df['Carrera'].unique()`"
    ],
    "correctIndex": 1,
    "hint": "Esta función cuenta cuántas veces aparece cada valor único y los ordena de mayor a menor frecuencia.",
    "explanation": "`df['Carrera'].value_counts()` genera una Serie con el conteo de repeticiones ($f_i$) de cada categoría presente en la columna."
  },
  {
    "id": "PY-03",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "python",
    "categoryLabel": "🐍 Python & Pandas",
    "difficulty": "Intermedio",
    "context": null,
    "question": "Si la columna `'Cargos_mensuales'` contiene valores monetarios con decimales como `29.85` y `56.90`, ¿por qué **NO** se debe convertir a tipo de dato `int` con `.astype(int)`?",
    "code": null,
    "options": [
      "Porque los DataFrames de Pandas no soportan números enteros.",
      "Porque truncaría los decimales perdiendo precisión monetaria y sesgando los promedios futuros.",
      "Porque convertir a `int` transforma los números en cadenas de texto (`object`).",
      "Porque generaría un error de sintaxis al tener el símbolo `$`."
    ],
    "correctIndex": 1,
    "hint": "Al convertir de float a int, Python elimina toda la parte decimal (ej. 29.85 se convierte en 29).",
    "explanation": "La conversión a `int` trunca la fracción decimal, eliminando información financiera relevante y provocando sesgos acumulativos en sumatorias y promedios."
  },
  {
    "id": "PY-04",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "python",
    "categoryLabel": "🐍 Python & Pandas",
    "difficulty": "Intermedio",
    "context": null,
    "question": "¿Qué línea de código en Pandas crea correctamente una columna calculada `'Ingreso_total'` multiplicando `'Sueldo_mensual'` por `'Meses_antigüedad'`?",
    "code": null,
    "options": [
      "`df['Ingreso_total'] = df['Sueldo_mensual'] * df['Meses_antigüedad']`",
      "`df.add_column('Ingreso_total') = df['Sueldo_mensual'] * df['Meses_antigüedad']`",
      "`df['Ingreso_total'] = sum(df['Sueldo_mensual'], df['Meses_antigüedad'])`",
      "`df.create('Ingreso_total')`"
    ],
    "correctIndex": 0,
    "hint": "Pandas utiliza operaciones vectorizadas directamente asignando a la nueva clave del DataFrame `df['Nueva_Columna'] = ...`.",
    "explanation": "En Pandas, las operaciones elemento a elemento entre columnas son vectorizadas y se asignan directamente con la sintaxis `df['Nueva_Columna'] = df['ColA'] * df['ColB']`."
  },
  {
    "id": "PY-05",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "python",
    "categoryLabel": "🐍 Python & Pandas",
    "difficulty": "Avanzado",
    "context": null,
    "question": "¿Qué método de Pandas permite filtrar un DataFrame para conservar únicamente las filas cuyo cargo coincida con alguno de los elementos de una lista `cargos_interes`?",
    "code": null,
    "options": [
      "`df[df['Cargo'].isin(cargos_interes)]`",
      "`df[df['Cargo'] == cargos_interes]`",
      "`df.filter_by(cargos_interes)`",
      "`df.groupby('Cargo').match(cargos_interes)`"
    ],
    "correctIndex": 0,
    "hint": "Se utiliza una función booleana de serie cuyo nombre en inglés significa 'está en'.",
    "explanation": "`.isin(lista)` evalúa si cada valor de la columna pertenece a la lista entregada y genera la máscara booleana para filtrar el DataFrame."
  },
  {
    "id": "PY-06",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "python",
    "categoryLabel": "🐍 Python & Pandas",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿Qué función de Pandas entrega un resumen estadístico automático con conteo, media, desviación estándar, valor mínimo, percentiles 25, 50, 75 y valor máximo?",
    "code": null,
    "options": [
      "`df.info()`",
      "`df.describe()`",
      "`df.summary()`",
      "`df.head()`"
    ],
    "correctIndex": 1,
    "hint": "Es el comando estándar de análisis exploratorio para obtener las métricas de resumen.",
    "explanation": "`df.describe()` genera el resumen completo de medidas de tendencia central, posición y dispersión para las variables numéricas."
  },
  {
    "id": "FREC-01",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "frecuencias",
    "categoryLabel": "📊 Tablas de Frecuencia",
    "difficulty": "Fácil",
    "context": null,
    "question": "En una tabla de frecuencias de asignaturas reprobadas por estudiantes, ¿qué símbolo representa la **frecuencia relativa acumulada** de quienes reprobaron **como máximo** 2 asignaturas?",
    "code": null,
    "options": [
      "$f_2$",
      "$F_2$",
      "$h_2$",
      "$H_2$"
    ],
    "correctIndex": 3,
    "hint": "Las letras mayúsculas ($F, H$) indican acumuladas. La $H$ representa la relativa (proporción o porcentaje).",
    "explanation": "$H_2$ denota la frecuencia relativa acumulada hasta la categoría 2, representando la proporción o porcentaje acumulado de individuos con 2 o menos asignaturas reprobadas."
  },
  {
    "id": "FREC-02",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "frecuencias",
    "categoryLabel": "📊 Tablas de Frecuencia",
    "difficulty": "Intermedio",
    "context": null,
    "question": "En un estudio con $n = 250$ llamadas telefónicas, se tiene que la frecuencia absoluta del intervalo de llamadas largas es $f_6 = 40$. ¿Cuál es el valor de la frecuencia relativa $h_6$ expresado en porcentaje?",
    "code": null,
    "options": [
      "$16.0\\%$",
      "$40.0\\%$",
      "$6.25\\%$",
      "$25.0\\%$"
    ],
    "correctIndex": 0,
    "hint": "Calcula $h_6 = \\frac{f_6}{n} \\times 100\\% = \\frac{40}{250} \\times 100\\%$.",
    "explanation": "$h_6 = \\frac{40}{250} = 0.16$, lo que equivale al $16.0\\%$ del total de llamadas analizadas."
  },
  {
    "id": "FREC-03",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "frecuencias",
    "categoryLabel": "📊 Tablas de Frecuencia",
    "difficulty": "Intermedio",
    "context": null,
    "question": "Dadas las frecuencias absolutas $f_0 = 120$, $f_1 = 50$, $f_2 = 30$, $f_3 = 15$. ¿Cuál es la interpretación rigurosa y correcta del valor acumulado $F_2 = 200$?",
    "code": null,
    "options": [
      "Exactamente 200 estudiantes reprobaron 2 asignaturas.",
      "Un total de 200 estudiantes reprobaron 2 o más asignaturas.",
      "Un total de 200 estudiantes reprobaron como máximo (a lo sumo) 2 asignaturas.",
      "El 200% de los estudiantes aprobó el curso."
    ],
    "correctIndex": 2,
    "hint": "$F_2 = f_0 + f_1 + f_2 = 120 + 50 + 30 = 200$. Acumula desde el menor valor hasta el 2 inclusive.",
    "explanation": "Al ser una frecuencia absoluta acumulada ($F_2 = 200$), indica que 200 personas en la muestra presentan entre 0 y 2 asignaturas reprobadas (es decir, **a lo sumo / como máximo 2**)."
  },
  {
    "id": "FREC-04",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "frecuencias",
    "categoryLabel": "📊 Tablas de Frecuencia",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿Por qué **NO** es estadísticamente válido calcular ni interpretar frecuencias acumuladas ($F_i$ o $H_i$) para una variable cualitativa nominal como el *'Tipo de contenido'* (Película vs. Serie)?",
    "code": null,
    "options": [
      "Porque las variables nominales no admiten cálculos matemáticos en la computadora.",
      "Porque al no existir un orden jerárquico natural entre las categorías, acumularlas es arbitrario y carece de sentido lógico.",
      "Porque la suma de frecuencias relativas siempre daría mayor a 1.",
      "Porque solo se pueden acumular variables que tengan más de 100 categorías."
    ],
    "correctIndex": 1,
    "hint": "Para decir 'menor o igual a una categoría' se requiere obligatoriamente que exista un orden jerárquico.",
    "explanation": "La acumulación ($F_i, H_i$) exige una noción de orden (de menor a mayor). Al carecer de orden las variables nominales, decir que se 'acumula hasta película' no tiene ningún significado estadístico."
  },
  {
    "id": "FREC-05",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "frecuencias",
    "categoryLabel": "📊 Tablas de Frecuencia",
    "difficulty": "Intermedio",
    "context": null,
    "question": "En el Informe Mundial de la Felicidad de la ONU, ¿por qué se utiliza el **Logaritmo del PIB per cápita** en lugar del PIB per cápita bruto?",
    "code": null,
    "options": [
      "Para convertir una variable cuantitativa en cualitativa nominal.",
      "Para reducir la severa asimetría positiva de los datos económicos y facilitar comparaciones lineales entre países con enormes brechas de riqueza.",
      "Para eliminar los países con PIB negativo del estudio.",
      "Porque el logaritmo transforma todas las frecuencias relativas en 100%."
    ],
    "correctIndex": 1,
    "hint": "La distribución de riqueza tiene una cola muy larga a la derecha (asimetría). El logaritmo comprime las escalas grandes.",
    "explanation": "Las variables financieras y de riqueza suelen ser sumamente asimétricas con sesgo a la derecha. La transformación logarítmica suaviza las diferencias extremas (outliers) y hace la distribución más simétrica y comparable."
  },
  {
    "id": "FREC-06",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "frecuencias",
    "categoryLabel": "📊 Tablas de Frecuencia",
    "difficulty": "Avanzado",
    "context": null,
    "question": "En una tabla de frecuencias agrupadas con intervalos $(L_{inf}, L_{sup}]$, si un intervalo de puntaje SIMCE es $(250, 275]$, ¿qué ocurre con un estudiante que obtuvo exactamente $250$ puntos?",
    "code": null,
    "options": [
      "Queda incluido en este intervalo porque el 250 está a la izquierda.",
      "Queda incluido en el intervalo inmediatamente anterior porque el paréntesis redondo $($ indica que el 250 es un límite abierto (no incluido).",
      "Se descarta de la muestra por ser un valor de borde.",
      "Se suma en ambos intervalos para mantener la continuidad."
    ],
    "correctIndex": 1,
    "hint": "La notación $(a, b]$ indica intervalo abierto por la izquierda (no incluye $a$) y cerrado por la derecha (incluye $b$).",
    "explanation": "En la notación estándar $(L_{inf}, L_{sup}]$, el extremo izquierdo es abierto $($ y por lo tanto el valor exacto 250 perteneció al intervalo anterior."
  },
  {
    "id": "FREC-07",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "frecuencias",
    "categoryLabel": "📊 Tablas de Frecuencia",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿Cuál es la propiedad fundamental que debe cumplir la suma de todas las frecuencias relativas $h_i$ de una distribución?",
    "code": null,
    "options": [
      "Debe ser igual al tamaño de la muestra $n$.",
      "Debe ser exactamente igual a $1.0$ (o $100\\%$ al expresarse en porcentaje).",
      "Debe ser igual a la media de la muestra.",
      "Debe ser siempre mayor que la suma de $f_i$."
    ],
    "correctIndex": 1,
    "hint": "La suma de todas las proporciones de un todo siempre equivale a la unidad.",
    "explanation": "Por definición de probabilidad y proporciones estadísticas, la sumatoria $\\sum_{i=1}^k h_i = 1.0$, lo que corresponde al $100\\%$ del total de observaciones."
  },
  {
    "id": "GRAF-01",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "graficos",
    "categoryLabel": "📈 Gráficos Estadísticos",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿Qué tipo de gráfico es el único estadísticamente adecuado para representar la distribución de una variable **cuantitativa continua** como la *Edad* o el *Sueldo base* agrupada en 10 intervalos de clase?",
    "code": null,
    "options": [
      "Gráfico Circular (Torta)",
      "Gráfico de Barras separadas",
      "Histograma",
      "Diagrama de Venn"
    ],
    "correctIndex": 2,
    "hint": "Es el gráfico donde las barras van completamente unidas (sin separación) para reflejar la continuidad numérica.",
    "explanation": "El **Histograma** es la representación por excelencia para variables cuantitativas continuas agrupadas en intervalos continuos."
  },
  {
    "id": "GRAF-02",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "graficos",
    "categoryLabel": "📈 Gráficos Estadísticos",
    "difficulty": "Intermedio",
    "context": null,
    "question": "¿Cuál es la razón técnica fundamental por la cual las barras de un **Histograma** se construyen adosadas (juntas, sin espacio entre sí), a diferencia de un gráfico de barras tradicional?",
    "code": null,
    "options": [
      "Para que el informe ocupe menos espacio visual.",
      "Porque el eje horizontal representa una escala numérica continua donde el límite superior de un intervalo es inmediatamente el límite inferior del siguiente.",
      "Porque solo se utiliza cuando la muestra tiene más de 1.000 observaciones.",
      "Porque indica que no hubo errores en la recolección de datos."
    ],
    "correctIndex": 1,
    "hint": "La ausencia de espacio físico entre barras simboliza que no existen interrupciones en la escala numérica continua.",
    "explanation": "La contigüidad de las barras en el histograma representa la continuidad física del recorrido de la variable cuantitativa continua, a diferencia de las categorías cualitativas que son discretas e independientes."
  },
  {
    "id": "GRAF-03",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "graficos",
    "categoryLabel": "📈 Gráficos Estadísticos",
    "difficulty": "Intermedio",
    "context": null,
    "question": "Al construir el histograma de edad para 100.000 profesionales TI, la barra más alta se ubica entre 24 y 28 años, y las barras van decreciendo progresivamente hasta los 60 años formando una cola larga hacia la derecha. ¿Qué forma tiene esta distribución?",
    "code": null,
    "options": [
      "Distribución simétrica perfecta.",
      "Distribución con asimetría positiva (sesgada a la derecha).",
      "Distribución uniforme sin clase modal.",
      "Distribución con asimetría negativa (sesgada a la izquierda)."
    ],
    "correctIndex": 1,
    "hint": "Cuando la mayor concentración está en los valores bajos y la cola larga se extiende hacia la derecha (valores altos), la asimetría es positiva.",
    "explanation": "Una distribución con acumulación en los valores iniciales/jóvenes y una cola que se extiende hacia los valores mayores a la derecha presenta **asimetría positiva** o sesgo a la derecha."
  },
  {
    "id": "GRAF-04",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "graficos",
    "categoryLabel": "📈 Gráficos Estadísticos",
    "difficulty": "Fácil",
    "context": null,
    "question": "Si deseas graficar la variable *'Lenguaje de programación más utilizado'* entre 8 opciones distintas en una empresa de tecnología, ¿qué gráfico se recomienda?",
    "code": null,
    "options": [
      "Histograma continuo",
      "Gráfico de Barras (horizontal o vertical)",
      "Polígono de frecuencias acumuladas",
      "Gráfico de dispersión 3D"
    ],
    "correctIndex": 1,
    "hint": "Es una variable cualitativa nominal con más de 5 categorías.",
    "explanation": "Para una variable cualitativa nominal con varias categorías ($>5$), el **gráfico de barras** (especialmente horizontal para facilitar la lectura de nombres) es el más limpio y adecuado."
  },
  {
    "id": "GRAF-05",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "graficos",
    "categoryLabel": "📈 Gráficos Estadísticos",
    "difficulty": "Intermedio",
    "context": null,
    "question": "¿Por qué el **gráfico circular (de torta)** se desaconseja totalmente cuando una variable cualitativa posee más de 6 o 7 categorías distintas?",
    "code": null,
    "options": [
      "Porque los ángulos dejan de sumar 360 grados.",
      "Porque los sectores se vuelven muy angostos y se dificulta enormemente la comparación visual y lectura de porcentajes.",
      "Porque el gráfico circular solo funciona para variables continuas.",
      "Porque la librería Matplotlib no permite más de 4 sectores."
    ],
    "correctIndex": 1,
    "hint": "El ojo humano tiene dificultades para comparar áreas y ángulos de muchos sectores pequeños.",
    "explanation": "Con muchas categorías, los sectores circulares se fragmentan en porciones muy pequeñas e ilegibles, perdiendo efectividad visual. En esos casos es preferible un gráfico de barras."
  },
  {
    "id": "TC-01",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "tendencia",
    "categoryLabel": "⚖️ Tendencia Central & Percentiles",
    "difficulty": "Intermedio",
    "context": null,
    "question": "Al analizar los sueldos al 4° año de egresados de un área universitaria, se obtiene que la media es \\$1.950.000 y la mediana es \\$1.200.000 ($\\bar{x} > Me$). ¿Qué explica esta diferencia y qué medida describe mejor al egresado típico?",
    "code": null,
    "options": [
      "Los datos son simétricos; la media es la medida más representativa.",
      "Existe asimetría positiva provocada por un grupo minoritario de egresados con sueldos extremadamente altos; la mediana es más representativa.",
      "Existe asimetría negativa por sueldos muy bajos; la moda es la mejor medida.",
      "Hubo un error de cálculo en Python."
    ],
    "correctIndex": 1,
    "hint": "La media aritmética se deja arrastrar fácilmente por valores extremadamente altos (outliers), mientras que la mediana no.",
    "explanation": "Cuando $\\bar{x} > Me$, la distribución presenta **asimetría positiva** debido a unos pocos sueldos muy altos que inflan el promedio. La **mediana** es robusta y describe con mayor fidelidad la realidad del 50% central de los profesionales."
  },
  {
    "id": "TC-02",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "tendencia",
    "categoryLabel": "⚖️ Tendencia Central & Percentiles",
    "difficulty": "Intermedio",
    "context": null,
    "question": "Una facultad decide enviar a clases de reforzamiento al **25% de los estudiantes con las notas más bajas** en Álgebra. Tras calcular las medidas, se obtiene que $P_{25} = 3.4$. ¿Cuál es la interpretación correcta?",
    "code": null,
    "options": [
      "Todos los alumnos de reforzamiento obtuvieron exactamente 3.4.",
      "El 25% de los alumnos obtuvo una nota de 3.4 o inferior, siendo 3.4 la nota máxima dentro del grupo enviado a reforzamiento.",
      "La nota promedio del curso completo fue de 3.4.",
      "3.4 alumnos reprobaron la asignatura."
    ],
    "correctIndex": 1,
    "hint": "El percentil 25 ($P_{25} = Q_1$) acumula el 25% inferior de las observaciones.",
    "explanation": "$P_{25} = 3.4$ indica que el 25% de los estudiantes con peor rendimiento obtuvo calificaciones $\\le 3.4$. Por lo tanto, 3.4 es la nota límite superior para ingresar al reforzamiento."
  },
  {
    "id": "TC-03",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "tendencia",
    "categoryLabel": "⚖️ Tendencia Central & Percentiles",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿Cuál es la **ÚNICA** medida de tendencia central aplicable a variables cualitativas nominales (como 'Comuna de residencia' o 'Carrera')?",
    "code": null,
    "options": [
      "La Media Aritmética",
      "La Mediana",
      "La Moda",
      "El Percentil 50"
    ],
    "correctIndex": 2,
    "hint": "Solo podemos identificar cuál es la categoría que más se repite (mayor frecuencia absoluta).",
    "explanation": "Para variables nominales no se pueden realizar sumas ni ordenamientos jerárquicos. La **Moda** (la categoría con mayor frecuencia absoluta) es la única medida de tendencia central válida."
  },
  {
    "id": "TC-04",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "tendencia",
    "categoryLabel": "⚖️ Tendencia Central & Percentiles",
    "difficulty": "Intermedio",
    "context": null,
    "question": "Se tienen los años de antigüedad de 6 trabajadores: $2, 3, 4, 5, 8, 10$ (muestra de tamaño par, $n=6$). ¿Cuál es el valor exacto de la **Mediana**?",
    "code": null,
    "options": [
      "$4.0$ años",
      "$4.5$ años",
      "$5.0$ años",
      "$5.33$ años"
    ],
    "correctIndex": 1,
    "hint": "Cuando $n$ es par, la mediana es el promedio aritmético de las dos observaciones centrales (posiciones $n/2$ y $n/2 + 1$).",
    "explanation": "Las posiciones centrales 3 y 4 corresponden a los valores 4 y 5. La mediana es $Me = \\frac{4 + 5}{2} = 4.5$ años."
  },
  {
    "id": "TC-05",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "tendencia",
    "categoryLabel": "⚖️ Tendencia Central & Percentiles",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿Cuál es la relación de equivalencia exacta entre el **Segundo Cuartil ($Q_2$)**, los Percentiles y la Mediana?",
    "code": null,
    "options": [
      "$Q_2 = P_{25} = \\text{Media}$",
      "$Q_2 = P_{50} = \\text{Mediana}$",
      "$Q_2 = P_{75} = \\text{Moda}$",
      "$Q_2 = \\text{Desviación Estándar}$"
    ],
    "correctIndex": 1,
    "hint": "El segundo cuartil divide la distribución al 50%.",
    "explanation": "Por definición, el segundo cuartil ($Q_2$), el percentil 50 ($P_{50}$) y la mediana ($Me$) corresponden exactamente al mismo valor estadístico (el punto del 50%)."
  },
  {
    "id": "DISP-01",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "dispersion",
    "categoryLabel": "📉 Dispersión & Homogeneidad",
    "difficulty": "Fácil",
    "context": null,
    "question": "¿En qué unidad de medida se expresa el **Coeficiente de Variación ($CV$)**?",
    "code": null,
    "options": [
      "En las mismas unidades de la variable original (ej. pesos, dólares o años).",
      "En unidades elevadas al cuadrado.",
      "Es una medida adimensional expresada en porcentaje (%).",
      "En la misma unidad que la varianza."
    ],
    "correctIndex": 2,
    "hint": "$CV = \\left(\\frac{s}{\\bar{x}}\\right) \\times 100\\%$. Las unidades de $s$ y $\\bar{x}$ se cancelan.",
    "explanation": "Al dividir la desviación estándar entre la media, las unidades de medida se simplifican, resultando en un porcentaje adimensional que permite comparar la variabilidad relativa entre variables distintas."
  },
  {
    "id": "DISP-02",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "dispersion",
    "categoryLabel": "📉 Dispersión & Homogeneidad",
    "difficulty": "Intermedio",
    "context": null,
    "question": "Un analista desea comparar la variabilidad de sueldos entre 2011 ($\\bar{x} = 63.595$ USD, $s = 40.556$ USD) y 2014 ($\\bar{x} = 66.564$ USD, $s = 44.053$ USD). ¿Qué medida debe utilizar para determinar con precisión cuál año tuvo mayor **heterogeneidad relativa**?",
    "code": null,
    "options": [
      "El Rango",
      "La Desviación Estándar ($s$)",
      "El Coeficiente de Variación ($CV$)",
      "El Rango Intercuartílico"
    ],
    "correctIndex": 2,
    "hint": "Como los promedios de los dos años son distintos, la desviación estándar no es comparable directamente.",
    "explanation": "El **Coeficiente de Variación ($CV$)** estandariza la dispersión respecto a la magnitud de la media de cada año, permitiendo evaluar la verdadera heterogeneidad relativa sin distorsión por escala."
  },
  {
    "id": "DISP-03",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "dispersion",
    "categoryLabel": "📉 Dispersión & Homogeneidad",
    "difficulty": "Intermedio",
    "context": null,
    "question": "Al calcular el Coeficiente de Variación en sueldos de funcionarios, el cargo de *Enfermero/a* obtiene un $CV = 14.8\\%$, mientras que *Asesor Legal* obtiene un $CV = 46.2\\%$. Según el criterio estándar del $30\\%$, ¿qué se concluye?",
    "code": null,
    "options": [
      "Los sueldos de los asesores legales son más homogéneos.",
      "Los sueldos de los enfermeros son homogéneos ($CV \\le 30\\%$) y su promedio es altamente representativo; los de los asesores son heterogéneos.",
      "La desviación estándar de los enfermeros es mayor que la de los asesores.",
      "Todos los enfermeros ganan exactamente lo mismo."
    ],
    "correctIndex": 1,
    "hint": "Si $CV \\le 30\\%$, el grupo es homogéneo y la media describe muy bien al conjunto.",
    "explanation": "Un $CV = 14.8\\% \\le 30\\%$ clasifica al grupo como **homogéneo** (baja dispersión relativa), lo que garantiza que la media aritmética es un estadístico muy representativo de sus salarios."
  },
  {
    "id": "DISP-04",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "dispersion",
    "categoryLabel": "📉 Dispersión & Homogeneidad",
    "difficulty": "Fácil",
    "context": null,
    "question": "Si la Desviación Estándar de una muestra de notas es igual a cero ($s = 0$), ¿qué significa estadísticamente?",
    "code": null,
    "options": [
      "Que todos los estudiantes reprobaron la asignatura con nota 1.0.",
      "Que no existe variabilidad alguna y todos los estudiantes de la muestra obtuvieron exactamente la misma calificación individual.",
      "Que hubo un error en la fórmula de la varianza.",
      "Que el 50% de las notas es negativo."
    ],
    "correctIndex": 1,
    "hint": "Si la distancia entre cada dato y la media es cero, todas las observaciones son idénticas.",
    "explanation": "$s = 0$ ocurre única y exclusivamente cuando no hay ninguna dispersión y todas las observaciones del conjunto tienen exactamente el mismo valor."
  },
  {
    "id": "DISP-05",
    "subjectId": "estadistica",
    "subjectName": "Estadística Descriptiva",
    "subjectIcon": "📊",
    "category": "dispersion",
    "categoryLabel": "📉 Dispersión & Homogeneidad",
    "difficulty": "Avanzado",
    "context": null,
    "question": "¿Por qué el **Rango ($R = X_{max} - X_{min}$)** es considerado una medida de dispersión muy limitada para la toma de decisiones empresariales?",
    "code": null,
    "options": [
      "Porque solo utiliza los dos valores más extremos de la muestra, ignorando por completo cómo se distribuyen y concentran todos los datos intermedios.",
      "Porque el rango solo se puede calcular en variables cualitativas.",
      "Porque su valor siempre da un número negativo.",
      "Porque en Python no existe función para restar el mínimo del máximo."
    ],
    "correctIndex": 0,
    "hint": "Un solo valor atípico (outlier) gigantesco infla el rango por completo sin decir nada del resto del grupo.",
    "explanation": "El rango depende exclusivamente de los valores máximo y mínimo. Si existe un valor atípico o error de registro, el rango se distorsiona totalmente sin entregar información sobre la variabilidad del grueso de la población."
  },
  {
    "id": "FS-01",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.1.1 Explorando HTML",
    "categoryLabel": "🌐 1.1.1 Explorando HTML",
    "difficulty": "Fácil",
    "context": "En un sitio web moderno de comercio electrónico se necesita definir la estructura principal para que motores de búsqueda y lectores de pantalla interpreten correctamente la jerarquía.",
    "question": "¿Cuál es la función principal de las etiquetas semánticas en HTML5 como `<header>`, `<nav>`, `<main>`, `<article>` y `<footer>`?",
    "options": [
      "Aplicar estilos visuales y colores sin necesidad de usar CSS.",
      "Proporcionar significado estructural claro a navegadores, lectores de accesibilidad y motores de búsqueda (SEO).",
      "Reemplazar la ejecución de scripts en JavaScript.",
      "Comprimir las imágenes automáticamente en la página."
    ],
    "correctIndex": 1,
    "hint": "La semántica web aporta significado y jerarquía lógica a la estructura del documento.",
    "explanation": "Las etiquetas semánticas de HTML5 estructuran el contenido con significado explícito para SEO y herramientas de accesibilidad (a11y), superando el uso genérico de `<div>`."
  },
  {
    "id": "FS-02",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.1.2 Actividad Individual Explorando HTML",
    "categoryLabel": "🌐 1.1.2 Actividad HTML",
    "difficulty": "Fácil",
    "context": "Un desarrollador analiza el archivo base `ejercicio.html` que contiene las secciones `<head>` y `<body>`.",
    "question": "¿Qué diferencia técnica y funcional fundamental existe entre la sección `<head>` y la sección `<body>`?",
    "options": [
      "`<head>` contiene metadatos, codificación (charset), enlaces a fuentes/CSS y título de pestaña; `<body>` contiene todos los elementos visuales que el usuario ve e interactúa.",
      "`<head>` solo permite texto plano y `<body>` solo permite imágenes.",
      "`<head>` se renderiza en la parte inferior de la ventana del navegador.",
      "No existe ninguna diferencia, ambas secciones muestran contenido directamente en pantalla."
    ],
    "correctIndex": 0,
    "hint": "Piensa qué información se ve en la ventana del navegador y cuál configura la página.",
    "explanation": "El elemento `<head>` suministra metadatos de configuración técnica al navegador, mientras que `<body>` contiene el árbol visual del DOM desplegado para el usuario."
  },
  {
    "id": "FS-03",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.1.3 Actividad Grupal Explorando HTML",
    "categoryLabel": "🌐 1.1.3 Formularios HTML",
    "difficulty": "Intermedio",
    "context": "Se requiere crear un formulario de contacto accesible con campos para nombre, correo, mensaje y botón de envío.",
    "question": "¿Qué atributo del `<input>` vincula un campo de texto con su etiqueta `<label>` para garantizar accesibilidad en lectores de pantalla?",
    "options": [
      "El atributo `for` en el `<label>` asociado al `id` del `<input>`.",
      "El atributo `name` compartido en ambos elementos.",
      "El atributo `class` con el mismo nombre.",
      "El atributo `placeholder` del formulario."
    ],
    "correctIndex": 0,
    "hint": "El atributo `<label for=\"campo_id\">` apunta directamente al identificador único del control.",
    "explanation": "El atributo `for` de la etiqueta `<label>` debe coincidir con el `id` del `<input>`, permitiendo que al hacer clic en el texto se enfoque el campo y los lectores de pantalla anuncien la etiqueta."
  },
  {
    "id": "FS-04",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.2.1 Explorando CSS",
    "categoryLabel": "🎨 1.2.1 Box Model",
    "difficulty": "Fácil",
    "context": "Durante la maquetación de una tarjeta de producto, se configuran las dimensiones y espaciados de los contenedores.",
    "question": "¿Cuáles son las 4 capas que componen el Modelo de Caja (Box Model) en CSS desde el interior hacia el exterior?",
    "options": [
      "Contenido (Content), Relleno (Padding), Borde (Border) y Margen (Margin).",
      "Margen (Margin), Borde (Border), Relleno (Padding) y Contenido (Content).",
      "Contenido, Margen, Sombra y Opacidad.",
      "Ancho (Width), Alto (Height), Color y Posición."
    ],
    "correctIndex": 0,
    "hint": "Desde el elemento central hacia el espacio exterior que separa a los elementos adyacentes.",
    "explanation": "El Box Model está formado por: Contenido interior $\\rightarrow$ Padding (espaciado interno) $\\rightarrow$ Border (borde perimetral) $\\rightarrow$ Margin (espacio exterior entre cajas)."
  },
  {
    "id": "FS-05",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.2.2 Actividad El lado Oscuro del CSS",
    "categoryLabel": "🎨 1.2.2 Media Queries",
    "difficulty": "Intermedio",
    "context": "Se necesita definir un estilo que solo se aplique a pantallas de teléfonos móviles cuyo ancho máximo sea de 600px.",
    "question": "¿Cuál es la sintaxis correcta para declarar una regla de Media Query en CSS para pantallas de hasta 600px?",
    "options": [
      "`@media (max-width: 600px) { ... }`",
      "`@screen mobile <= 600px { ... }`",
      "`@viewport (width: 600px) { ... }`",
      "`@responsive (max: 600) { ... }`"
    ],
    "correctIndex": 0,
    "hint": "Las consultas de medios se declaran con @media y condiciones de viewport.",
    "explanation": "`@media (max-width: 600px)` aplica estilos condicionalmente a dispositivos cuyo ancho de ventana sea menor o igual a 600 píxeles."
  },
  {
    "id": "FS-06",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.2.3 Explorando CSS - Versión extendida",
    "categoryLabel": "🎨 1.2.3 Flexbox vs Grid",
    "difficulty": "Intermedio",
    "context": "El equipo de desarrollo debe maquetar una barra de navegación horizontal y una grilla de productos con filas y columnas.",
    "question": "¿Cuál es la diferencia técnica fundamental entre CSS Flexbox y CSS Grid?",
    "options": [
      "Flexbox es un modelo unidimensional (1D, maneja filas O columnas a la vez); CSS Grid es un modelo bidimensional (2D, maneja filas Y columnas simultáneamente).",
      "Flexbox solo sirve para móviles y Grid para computadores de escritorio.",
      "Flexbox no admite colores de fondo.",
      "CSS Grid requiere JavaScript para renderizarse."
    ],
    "correctIndex": 0,
    "hint": "Flexbox maneja un solo eje principal, mientras Grid estructura filas y columnas a la vez.",
    "explanation": "Flexbox está optimizado para layouts unidimensionales (1D), mientras que CSS Grid permite maquetaciones bidimensionales (2D) controlando filas y columnas de forma simultánea."
  },
  {
    "id": "FS-07",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.2.4 Buenas prácticas CSS",
    "categoryLabel": "🎨 1.2.4 Variables CSS",
    "difficulty": "Fácil",
    "context": "Se requiere centralizar la paleta de colores corporativa para reutilizarla en toda la hoja de estilos.",
    "question": "¿Cómo se define una Variable CSS global en la pseudo-clase `:root`?",
    "options": [
      "`:root { --color-primario: #4f46e5; }`",
      "`:root { $color-primario: #4f46e5; }`",
      "`:root { var color-primario = #4f46e5; }`",
      "`:root { @color-primario: #4f46e5; }`"
    ],
    "correctIndex": 0,
    "hint": "Las variables nativas de CSS (Custom Properties) se nombran con dos guiones '--'.",
    "explanation": "Las variables nativas de CSS se declaran con el prefijo `--nombre` y se consumen con la función `var(--nombre)`."
  },
  {
    "id": "FS-08",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.2.5 Estilos más Utilizados",
    "categoryLabel": "🎨 1.2.5 Box-Sizing",
    "difficulty": "Fácil",
    "context": "Se desea que los rellenos (`padding`) y los bordes no aumenten el tamaño exterior declarado de los elementos.",
    "question": "¿Qué valor de la propiedad `box-sizing` incluye el padding y border dentro del ancho y alto total?",
    "options": [
      "`box-sizing: border-box;`",
      "`box-sizing: content-box;`",
      "`box-sizing: inherit;`",
      "`box-sizing: auto;`"
    ],
    "correctIndex": 0,
    "hint": "border-box asegura que width: 100% contenga tanto el contenido como el borde y relleno.",
    "explanation": "`border-box` hace que el ancho y alto declarados incluyan el contenido, el padding y el border."
  },
  {
    "id": "FS-09",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.2.6 Diseño Adaptable",
    "categoryLabel": "📱 1.2.6 Meta Viewport",
    "difficulty": "Intermedio",
    "context": "Una página web se ve diminuta en teléfonos móviles si no se incluye la configuración de escala inicial.",
    "question": "¿Qué meta tag en el `<head>` es indispensable para que los navegadores móviles adapten la escala al ancho real de la pantalla?",
    "options": [
      "`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`",
      "`<meta name=\"mobile\" content=\"responsive\">`",
      "`<meta charset=\"UTF-8\">`",
      "`<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">`"
    ],
    "correctIndex": 0,
    "hint": "El tag viewport le indica al navegador móvil que use el ancho del dispositivo (device-width).",
    "explanation": "La etiqueta `viewport` con `width=device-width, initial-scale=1.0` garantiza que los estilos responsivos y media queries se apliquen a escala 1:1 en dispositivos móviles."
  },
  {
    "id": "FS-10",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.3.1 Explorando JavaScript",
    "categoryLabel": "⚡ 1.3.1 DOM & Eventos",
    "difficulty": "Fácil",
    "context": "Un script debe escuchar el clic en un botón para ejecutar una acción.",
    "question": "¿Qué método estándar de JavaScript se utiliza para registrar un escuchador de eventos en un elemento del DOM?",
    "options": [
      "`element.addEventListener('click', handler);`",
      "`element.listen('click', handler);`",
      "`element.attachEvent('click', handler);`",
      "`element.onClick(handler);`"
    ],
    "correctIndex": 0,
    "hint": "addEventListener es el método estándar del DOM.",
    "explanation": "`element.addEventListener('evento', callback)` es el método oficial del DOM para vincular eventos de forma no destructiva."
  },
  {
    "id": "FS-11",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.3.2 Actividad Individual JavaScript",
    "categoryLabel": "⚡ 1.3.2 Validación & Objetos",
    "difficulty": "Intermedio",
    "context": "En el cálculo de remuneraciones y asignaciones familiares se necesita validar que la edad ingresada no contenga letras.",
    "question": "¿Qué función nativa de JavaScript retorna `true` si un valor NO puede convertirse a un número válido?",
    "options": [
      "`isNaN(valor)`",
      "`isNotNumber(valor)`",
      "`checkNumber(valor)`",
      "`validateDigit(valor)`"
    ],
    "correctIndex": 0,
    "hint": "isNaN significa 'is Not a Number'.",
    "explanation": "`isNaN(valor)` evalúa si el argumento no es un número tras intentar convertirlo a tipo numérico."
  },
  {
    "id": "FS-12",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "1.3.3 Actividad Grupal JavaScript",
    "categoryLabel": "⚡ 1.3.3 event.preventDefault()",
    "difficulty": "Intermedio",
    "context": "Al procesar un formulario con JavaScript en el evento `submit`, se busca validar los campos antes de enviarlos sin recargar la página.",
    "question": "¿Para qué sirve ejecutar `event.preventDefault()` dentro del manejador del evento `submit`?",
    "options": [
      "Evita la acción por defecto del navegador de recargar la página y enviar sincrónicamente el formulario, permitiendo validarlo con JS.",
      "Borra todos los datos ingresados en los campos del formulario.",
      "Cierra la pestaña actual del navegador.",
      "Envía los datos automáticamente a dos servidores diferentes."
    ],
    "correctIndex": 0,
    "hint": "Cancela la acción nativa asociada al evento en el navegador.",
    "explanation": "`event.preventDefault()` cancela el comportamiento nativo del navegador (como la recarga de página al enviar un form), permitiendo control total con JS."
  },
  {
    "id": "FS-13",
    "subjectId": "fullstack",
    "subjectName": "Desarrollo Fullstack 2",
    "subjectIcon": "🌐",
    "category": "Cómo CREAR una PÁGINA WEB",
    "categoryLabel": "🌐 Estructura Web Completa",
    "difficulty": "Fácil",
    "context": "Se integran HTML para estructura, CSS para diseño y JS para interacción.",
    "question": "¿Cuál es el rol correspondiente de cada una de las 3 tecnologías fundamentales de la web?",
    "options": [
      "HTML define la estructura y contenido; CSS define el diseño visual y presentación; JavaScript implementa el comportamiento e interactividad.",
      "HTML procesa la base de datos; CSS crea el servidor; JavaScript maqueta las tablas.",
      "HTML genera estilos; CSS compila código binario; JavaScript almacena archivos.",
      "No existe diferenciación entre ellas."
    ],
    "correctIndex": 0,
    "hint": "Estructura (HTML) + Estilo (CSS) + Dinamismo (JS).",
    "explanation": "La arquitectura web estándar divide responsabilidades: HTML para la estructura semántica, CSS para la capa visual y JavaScript para la lógica interactiva."
  },
  {
    "id": "BD-01",
    "subjectId": "basedatos",
    "subjectName": "Taller de Base de Datos",
    "subjectIcon": "🗄️",
    "category": "1.1.1 RECORD en PLSQL",
    "categoryLabel": "🗄️ 1.1.1 RECORD en PL/SQL",
    "difficulty": "Fácil",
    "context": "En un bloque PL/SQL se necesita agrupar múltiples datos relacionados de un empleado (id, nombre, sueldo) en una sola estructura en memoria.",
    "question": "¿Qué es un `RECORD` en Oracle PL/SQL y cómo se define?",
    "options": [
      "Es una estructura de datos compuesta por campos de diferentes tipos de datos que se tratan como una unidad lógica.",
      "Es una tabla relacional física creada en el disco del servidor de base de datos.",
      "Es una función matemática que solo devuelve valores numéricos.",
      "Es un tipo de trigger que se dispara antes de insertar registros."
    ],
    "correctIndex": 0,
    "hint": "Un RECORD agrupa campos heterogéneos (distintos tipos) en una sola variable estructurada.",
    "explanation": "Un `RECORD` en PL/SQL es un tipo compuesto que almacena campos con diferentes tipos de datos, facilitando el manejo agrupado de datos relacionados."
  },
  {
    "id": "BD-02",
    "subjectId": "basedatos",
    "subjectName": "Taller de Base de Datos",
    "subjectIcon": "🗄️",
    "category": "1.1.2 Guía RECORD en PLSQL",
    "categoryLabel": "🗄️ 1.1.2 %ROWTYPE",
    "difficulty": "Intermedio",
    "context": "Se desea declarar una variable de registro que capture automáticamente todas las columnas y tipos de la tabla `CLIENTE`.",
    "question": "¿Qué instrucción PL/SQL declara un RECORD que coincide exactamente con la estructura de una fila de la tabla `CLIENTE`?",
    "options": [
      "`v_cliente CLIENTE%ROWTYPE;`",
      "`v_cliente CLIENTE%TYPE;`",
      "`v_cliente RECORD OF CLIENTE;`",
      "`v_cliente NEW ROW(CLIENTE);`"
    ],
    "correctIndex": 0,
    "hint": "%ROWTYPE copia toda la fila de una tabla o cursor, mientras %TYPE copia el tipo de una sola columna.",
    "explanation": "`%ROWTYPE` define un registro con la misma estructura y tipos que las columnas de una tabla o vista en la base de datos."
  },
  {
    "id": "BD-03",
    "subjectId": "basedatos",
    "subjectName": "Taller de Base de Datos",
    "subjectIcon": "🗄️",
    "category": "1.1.4 VARRAY en PLSQL",
    "categoryLabel": "🗄️ 1.1.4 Colección VARRAY",
    "difficulty": "Intermedio",
    "context": "Se requiere almacenar una lista en memoria con un límite máximo conocido de 12 cuotas mensuales en PL/SQL.",
    "question": "¿Cuál es la característica principal de una colección de tipo `VARRAY` (Variable-Size Array) en PL/SQL?",
    "options": [
      "Almacena un número fijo y predeterminado de elementos del mismo tipo de dato con un límite máximo declarado en su tipo.",
      "Es una tabla sin límite de filas que solo acepta tipos de texto.",
      "Permite índices negativos de búsqueda.",
      "Se almacena siempre en una tabla física de Oracle."
    ],
    "correctIndex": 0,
    "hint": "VARRAY define un arreglo unidimensional acotado por un número máximo de elementos.",
    "explanation": "Un `VARRAY` tiene un límite superior fijo definido en su declaración (`TYPE nombre IS VARRAY(limite) OF tipo;`) y almacena elementos homogéneos secuenciales."
  },
  {
    "id": "BD-04",
    "subjectId": "basedatos",
    "subjectName": "Taller de Base de Datos",
    "subjectIcon": "🗄️",
    "category": "1.2.1 Cursores Complejos",
    "categoryLabel": "🗄️ 1.2.1 Cursores Explícitos",
    "difficulty": "Intermedio",
    "context": "Se debe procesar fila por fila el listado de 500 contratos vencidos utilizando un cursor explícito.",
    "question": "¿Cuál es la secuencia correcta del ciclo de vida de un cursor explícito en PL/SQL?",
    "options": [
      "`DECLARE` $\\rightarrow$ `OPEN` $\\rightarrow$ `FETCH` $\\rightarrow$ `CLOSE`.",
      "`OPEN` $\\rightarrow$ `DECLARE` $\\rightarrow$ `CLOSE` $\\rightarrow$ `FETCH`.",
      "`CREATE` $\\rightarrow$ `SELECT` $\\rightarrow$ `DROP`.",
      "`EXECUTE` $\\rightarrow$ `FETCH` $\\rightarrow$ `COMMIT`."
    ],
    "correctIndex": 0,
    "hint": "Primero se declara la consulta, luego se abre, se recuperan filas en bucle y se cierra al terminar.",
    "explanation": "El ciclo canónico de un cursor explícito es: 1. `CURSOR c IS SELECT...` (DECLARE), 2. `OPEN c;`, 3. `FETCH c INTO vars;` y 4. `CLOSE c;` para liberar recursos de memoria en el servidor."
  },
  {
    "id": "BD-05",
    "subjectId": "basedatos",
    "subjectName": "Taller de Base de Datos",
    "subjectIcon": "🗄️",
    "category": "1.2.4 Ciclos Anidados",
    "categoryLabel": "🗄️ 1.2.4 Ciclo FOR y Cursores",
    "difficulty": "Fácil",
    "context": "Un desarrollador quiere iterar sobre un cursor sin tener que escribir manualmente las sentencias `OPEN`, `FETCH` y `CLOSE`.",
    "question": "¿Qué estructura de control en PL/SQL abre, recupera filas y cierra el cursor automáticamente?",
    "options": [
      "`FOR reg IN cur_datos LOOP ... END LOOP;` (Cursor FOR LOOP).",
      "`WHILE cur_datos%FOUND LOOP ... END LOOP;`",
      "`LOOP ... EXIT WHEN cur_datos%NOTFOUND; END LOOP;`",
      "`CASE WHEN cur_datos IS OPEN THEN ... END CASE;`"
    ],
    "correctIndex": 0,
    "hint": "El 'Cursor FOR LOOP' gestiona internamente la apertura, fetch y cierre automático del cursor.",
    "explanation": "El `Cursor FOR LOOP` simplifica el código declarando implícitamente el registro de iteración y ejecutando automáticamente `OPEN`, `FETCH` y `CLOSE`."
  },
  {
    "id": "BD-06",
    "subjectId": "basedatos",
    "subjectName": "Taller de Base de Datos",
    "subjectIcon": "🗄️",
    "category": "1.3.1 Excepciones Predefinidas",
    "categoryLabel": "🗄️ 1.3.1 NO_DATA_FOUND",
    "difficulty": "Intermedio",
    "context": "Una consulta `SELECT INTO` intenta obtener el teléfono de un cliente por su RUT, pero no existe ningún cliente registrado con ese RUT.",
    "question": "¿Qué excepción predefinida de Oracle se dispara automáticamente cuando un `SELECT INTO` no devuelve ninguna fila?",
    "options": [
      "`NO_DATA_FOUND` (ORA-01403)",
      "`TOO_MANY_ROWS` (ORA-01422)",
      "`ZERO_DIVIDE` (ORA-01476)",
      "`DUP_VAL_ON_INDEX` (ORA-00001)"
    ],
    "correctIndex": 0,
    "hint": "Cuando SELECT INTO no encuentra ninguna coincidencia, Oracle genera NO_DATA_FOUND.",
    "explanation": "`NO_DATA_FOUND` se dispara en PL/SQL cuando una consulta `SELECT INTO` no recupera ninguna fila de la base de datos."
  },
  {
    "id": "BD-07",
    "subjectId": "basedatos",
    "subjectName": "Taller de Base de Datos",
    "subjectIcon": "🗄️",
    "category": "1.3.4 Excepciones de Usuario",
    "categoryLabel": "🗄️ 1.3.4 Excepciones Personalizadas",
    "difficulty": "Intermedio",
    "context": "En una regla de negocio bancaria, si el saldo de la cuenta es menor que el monto a retirar, se debe generar un error personalizado.",
    "question": "¿Cómo se declara y se lanza una excepción definida por el usuario en PL/SQL?",
    "options": [
      "Se declara con `mi_excepcion EXCEPTION;` y se lanza con `RAISE mi_excepcion;`.",
      "Se declara con `THROW mi_excepcion;` y se lanza con `CATCH;`.",
      "Se declara con `ERROR mi_excepcion;` y se lanza con `TRY;`.",
      "Se declara con `PRAGMA CREATE ERROR;`."
    ],
    "correctIndex": 0,
    "hint": "En PL/SQL se usa el tipo EXCEPTION y la instrucción RAISE.",
    "explanation": "Las excepciones personalizadas se declaran en la sección `DECLARE` como tipo `EXCEPTION` y se detonan explícitamente en el bloque ejecutable con `RAISE nombre_excepcion;`."
  },
  {
    "id": "BD-08",
    "subjectId": "basedatos",
    "subjectName": "Taller de Base de Datos",
    "subjectIcon": "🗄️",
    "category": "1.4.1 Procedimientos y Funciones",
    "categoryLabel": "🗄️ 1.4.1 Subprogramas PL/SQL",
    "difficulty": "Intermedio",
    "context": "Se necesita calcular el valor del impuesto IVA a partir de un monto neto y reutilizar este cálculo en múltiples consultas SQL.",
    "question": "¿Cuál es la diferencia fundamental entre un Procedimiento Almacenado (`PROCEDURE`) y una Función (`FUNCTION`) en Oracle PL/SQL?",
    "options": [
      "Una Función siempre debe tener una cláusula `RETURN tipo` y retornar un valor escalar obligatorio con `RETURN valor;`, lo que permite usarla en sentencias `SELECT` de SQL; un Procedimiento ejecuta acciones y no está obligado a retornar valor.",
      "Un Procedimiento no puede recibir parámetros y una Función sí.",
      "Una Función solo se ejecuta en la consola de comandos de Linux.",
      "Los Procedimientos no pueden realizar operaciones `INSERT` o `UPDATE`."
    ],
    "correctIndex": 0,
    "hint": "Las funciones retornan un valor mediante RETURN y pueden ser invocadas directamente en expresiones SQL.",
    "explanation": "Las funciones (`FUNCTION`) declaran obligatoriamente `RETURN tipo_dato` y retornan un resultado mediante la instrucción `RETURN`, pudiendo integrarse en sentencias SQL como `SELECT funcion() FROM dual;`."
  },
  {
    "id": "BD-09",
    "subjectId": "basedatos",
    "subjectName": "Taller de Base de Datos",
    "subjectIcon": "🗄️",
    "category": "1.4.1 Paquetes PLSQL",
    "categoryLabel": "🗄️ 1.4.1 Packages",
    "difficulty": "Intermedio",
    "context": "Se desea organizar y encapsular todos los procedimientos, funciones y tipos relacionados con el módulo de Ventas en un solo objeto de base de datos.",
    "question": "¿Cuáles son las dos partes obligatorias e independientes que componen un Paquete (`PACKAGE`) en Oracle?",
    "options": [
      "Especificación del Paquete (`PACKAGE SPECIFICATION`) y Cuerpo del Paquete (`PACKAGE BODY`).",
      "Encabezado del Paquete y Pie del Paquete.",
      "Trigger del Paquete y Tabla del Paquete.",
      "Vista del Paquete y Cursor del Paquete."
    ],
    "correctIndex": 0,
    "hint": "La Especificación declara los elementos públicos (interfaz) y el Body implementa el código real.",
    "explanation": "Un paquete de Oracle consta de dos partes: la **Especificación** (declara tipos, variables, constantes, procedimientos y funciones públicos) y el **Cuerpo** o Body (contiene la implementación del código y subprogramas privados)."
  },
  {
    "id": "BD-10",
    "subjectId": "basedatos",
    "subjectName": "Taller de Base de Datos",
    "subjectIcon": "🗄️",
    "category": "1.4.4 Triggers",
    "categoryLabel": "🗄️ 1.4.4 Triggers y :OLD / :NEW",
    "difficulty": "Avanzado",
    "context": "Se crea un Trigger para auditar cambios en el sueldo de los empleados, registrando el sueldo anterior y el nuevo.",
    "question": "¿Qué calificadores permiten acceder al valor previo a la modificación y al nuevo valor asignado en un Trigger a nivel de fila (`FOR EACH ROW`)?",
    "options": [
      "`:OLD.columna` (valor anterior) y `:NEW.columna` (valor nuevo).",
      "`:BEFORE.columna` y `:AFTER.columna`.",
      "`:PREV.columna` y `:NEXT.columna`.",
      "`:ORIGINAL.columna` y `:FINAL.columna`."
    ],
    "correctIndex": 0,
    "hint": "En triggers a nivel de fila se utilizan los pseudorregistros :OLD y :NEW.",
    "explanation": "En los triggers de fila (`FOR EACH ROW`), `:OLD.campo` contiene el valor original antes del `UPDATE`/`DELETE` y `:NEW.campo` contiene el nuevo valor a registrar en el `INSERT`/`UPDATE`."
  },
  {
    "id": "MOV-01",
    "subjectId": "moviles",
    "subjectName": "Desarrollo de Aplicaciones Móviles",
    "subjectIcon": "📱",
    "category": "kotlin_basics",
    "categoryLabel": "📱 Kotlin Fundamentos",
    "difficulty": "Fácil",
    "context": "En Kotlin se requiere declarar variables, diferenciando aquellas que son de solo lectura de aquellas que pueden reasignarse.",
    "question": "¿Qué palabra clave se utiliza en Kotlin para declarar una variable de solo lectura (inmutable)?",
    "options": [
      "`val`",
      "`var`",
      "`const`",
      "`let`"
    ],
    "correctIndex": 0,
    "hint": "val = valor inmutable (read-only), var = variable mutable.",
    "explanation": "En Kotlin, `val` declara una variable de solo lectura cuyo valor no puede ser reasignado después de su inicialización."
  },
  {
    "id": "MOV-02",
    "subjectId": "moviles",
    "subjectName": "Desarrollo de Aplicaciones Móviles",
    "subjectIcon": "📱",
    "category": "kotlin_nullsafety",
    "categoryLabel": "📱 Null Safety en Kotlin",
    "difficulty": "Intermedio",
    "context": "Kotlin incorpora seguridad contra nulos en su sistema de tipos para evitar los temidos `NullPointerException`.",
    "question": "¿Cómo se declara una variable de tipo `String` que PUEDA contener un valor nulo (`null`) en Kotlin?",
    "options": [
      "`var nombre: String? = null`",
      "`var nombre: NullableString = null`",
      "`var nombre: String = null`",
      "`var nombre: String! = null`"
    ],
    "correctIndex": 0,
    "hint": "El signo de interrogación '?' indica que el tipo admite nulos.",
    "explanation": "En Kotlin los tipos son no-nulos por defecto. Añadir el signo `?` (`String?`) declara explícitamente un tipo anulable (nullable)."
  },
  {
    "id": "MOV-03",
    "subjectId": "moviles",
    "subjectName": "Desarrollo de Aplicaciones Móviles",
    "subjectIcon": "📱",
    "category": "android_lifecycle",
    "categoryLabel": "📱 Ciclo de Vida de Activity",
    "difficulty": "Intermedio",
    "context": "Al rotar la pantalla de un dispositivo Android, la Activity actual se destruye y se vuelve a crear.",
    "question": "¿En qué método del ciclo de vida de una Activity en Android se debe inicializar la interfaz de usuario y enlazar vistas?",
    "options": [
      "`onCreate()`",
      "`onStart()`",
      "`onResume()`",
      "`onPause()`"
    ],
    "correctIndex": 0,
    "hint": "onCreate es el primer método invocado al instanciar la Activity.",
    "explanation": "`onCreate()` es el punto de entrada obligatorio del ciclo de vida de una Activity donde se configura el layout inicial y se inicializan componentes esenciales."
  },
  {
    "id": "MOV-04",
    "subjectId": "moviles",
    "subjectName": "Desarrollo de Aplicaciones Móviles",
    "subjectIcon": "📱",
    "category": "jetpack_compose",
    "categoryLabel": "📱 Jetpack Compose",
    "difficulty": "Intermedio",
    "context": "Android moderno utiliza Jetpack Compose para construir interfaces gráficas declarativas.",
    "question": "¿Qué anotación se utiliza en Kotlin para definir una función como un componente de interfaz de usuario en Jetpack Compose?",
    "options": [
      "`@Composable`",
      "`@Component`",
      "`@UI`",
      "`@Layout`"
    ],
    "correctIndex": 0,
    "hint": "Las funciones de Compose se anotan con @Composable.",
    "explanation": "`@Composable` indica al compilador de Compose que la función está diseñada para transformar datos en elementos visuales de la interfaz de usuario."
  },
  {
    "id": "MOV-05",
    "subjectId": "moviles",
    "subjectName": "Desarrollo de Aplicaciones Móviles",
    "subjectIcon": "📱",
    "category": "android_architecture",
    "categoryLabel": "📱 Arquitectura MVVM & ViewModel",
    "difficulty": "Avanzado",
    "context": "Se busca persistir los datos de la interfaz de usuario durante cambios de configuración (como la rotación de pantalla) sin reiniciar la lógica de negocio.",
    "question": "¿Cuál es la principal ventaja de utilizar un `ViewModel` de Android Jetpack en una aplicación móvil?",
    "options": [
      "Mantiene el estado y los datos de la interfaz de usuario intactos a través de cambios de configuración (como rotaciones de pantalla) sobreviviendo a la recreación de la Activity.",
      "Aumenta la velocidad de descarga de la aplicación desde Google Play Store.",
      "Reemplaza el sistema operativo Android.",
      "Elimina la necesidad de usar Kotlin o Java."
    ],
    "correctIndex": 0,
    "hint": "ViewModel está diseñado para almacenar y gestionar datos relacionados con la UI de forma consciente del ciclo de vida.",
    "explanation": "`ViewModel` sobrevive a los cambios de configuración como la rotación de la pantalla, evitando la pérdida de datos y llamadas innecesarias a la red o base de datos."
  },
  {
    "id": "POO-01",
    "subjectId": "poo",
    "subjectName": "Desarrollo Orientado a Objetos",
    "subjectIcon": "☕",
    "category": "poo_pilares",
    "categoryLabel": "☕ Pilares de POO",
    "difficulty": "Fácil",
    "context": "En el diseño de software orientado a objetos se busca proteger el estado interno de un objeto ocultando sus atributos.",
    "question": "¿Qué principio de la Programación Orientada a Objetos consiste en ocultar los atributos internos de una clase y exponer su acceso solo a través de métodos públicos (getters y setters)?",
    "options": [
      "Encapsulamiento",
      "Herencia",
      "Polimorfismo",
      "Sobrecarga"
    ],
    "correctIndex": 0,
    "hint": "Encapsular significa empaquetar los datos y protegerlos del acceso directo no autorizado.",
    "explanation": "El **Encapsulamiento** protege la integridad de los datos de un objeto restringiendo el acceso directo a sus variables internas (modificador `private`) y proporcionando métodos controlados (`get` y `set`)."
  },
  {
    "id": "POO-02",
    "subjectId": "poo",
    "subjectName": "Desarrollo Orientado a Objetos",
    "subjectIcon": "☕",
    "category": "poo_herencia",
    "categoryLabel": "☕ Herencia en Java",
    "difficulty": "Fácil",
    "context": "Se tiene una clase base `Vehiculo` y se desea crear una clase `Automovil` que herede todos sus métodos y propiedades.",
    "question": "¿Qué palabra clave se utiliza en Java para que una clase herede de otra clase padre?",
    "options": [
      "`extends`",
      "`implements`",
      "`inherits`",
      "`instanceof`"
    ],
    "correctIndex": 0,
    "hint": "extends = heredar de una clase; implements = implementar una interfaz.",
    "explanation": "En Java, la palabra clave `extends` se utiliza para declarar que una clase es una subclase que hereda de una superclase."
  },
  {
    "id": "POO-03",
    "subjectId": "poo",
    "subjectName": "Desarrollo Orientado a Objetos",
    "subjectIcon": "☕",
    "category": "poo_polimorfismo",
    "categoryLabel": "☕ Polimorfismo y Sobrescritura",
    "difficulty": "Intermedio",
    "context": "Una clase `Perro` y una clase `Gato` heredan de `Animal`. Ambas implementan de forma distinta el método `hacerSonido()`.",
    "question": "¿Qué anotación se utiliza en Java para indicar explícitamente que un método está sobrescribiendo el comportamiento de un método de la superclase?",
    "options": [
      "`@Override`",
      "`@Overwrite`",
      "`@Super`",
      "`@Polymorph`"
    ],
    "correctIndex": 0,
    "hint": "@Override le indica al compilador que valide la firma del método sobrescrito.",
    "explanation": "La anotación `@Override` verifica en tiempo de compilación que el método hijo realmente sobrescribe un método existente en la clase padre o interfaz."
  },
  {
    "id": "POO-04",
    "subjectId": "poo",
    "subjectName": "Desarrollo Orientado a Objetos",
    "subjectIcon": "☕",
    "category": "poo_colecciones",
    "categoryLabel": "☕ Colecciones en Java",
    "difficulty": "Intermedio",
    "context": "Se requiere almacenar un conjunto de usuarios en memoria donde cada usuario esté asociado unívocamente a su número de RUT como clave de búsqueda rápida.",
    "question": "¿Qué interfaz del Java Collections Framework es la más adecuada para almacenar pares clave-valor (`Key-Value`)?",
    "options": [
      "`Map<K, V>` (ej. `HashMap`)",
      "`List<E>` (ej. `ArrayList`)",
      "`Set<E>` (ej. `HashSet`)",
      "`Queue<E>` (ej. `LinkedList`)"
    ],
    "correctIndex": 0,
    "hint": "Map almacena asociaciones clave-valor con búsqueda rápida por clave.",
    "explanation": "La interfaz `Map<K, V>` (implementada por `HashMap`, `TreeMap`, etc.) almacena pares clave-valor únicos para búsquedas eficientes por clave."
  },
  {
    "id": "POO-05",
    "subjectId": "poo",
    "subjectName": "Desarrollo Orientado a Objetos",
    "subjectIcon": "☕",
    "category": "poo_interfaces",
    "categoryLabel": "☕ Clases Abstractas e Interfaces",
    "difficulty": "Avanzado",
    "context": "Se define un contrato de comportamiento que múltiples clases no relacionadas deben cumplir sin forzar una jerarquía de herencia común.",
    "question": "¿Cuál es la principal ventaja de utilizar una `Interface` en Java en comparación con una clase abstracta?",
    "options": [
      "Permite simular herencia múltiple de comportamiento, ya que una clase en Java puede implementar múltiples interfaces (`implements A, B, C`), pero solo puede heredar de una sola clase (`extends`).",
      "Las interfaces ocupan menos espacio en la memoria RAM.",
      "Las interfaces no requieren compilación en Java.",
      "Las interfaces solo permiten crear variables de tipo entero."
    ],
    "correctIndex": 0,
    "hint": "Java no permite herencia múltiple de clases, pero sí permite implementar múltiples interfaces.",
    "explanation": "Java prohíbe la herencia múltiple de clases (`extends` solo permite una clase padre), pero permite implementar múltiples interfaces (`implements A, B`), facilitando el desacoplamiento y el polimorfismo."
  }
];

const SUBJECT_THEORY = {
  "fullstack": {
    "id": "fullstack",
    "nombre": "Desarrollo Fullstack 2",
    "icono": "🌐",
    "descripcion": "Experiencia 1: HTML5 Semántico, CSS3 Responsivo (Flexbox/Grid), Bootstrap 5, JavaScript ES6, Manipulación del DOM y Formularios.",
    "temas": [
      {
        "id": "fs-html",
        "titulo": "HTML5 Semántico y Formularios Accesibles",
        "contenido": "\n        <p>• <strong>Estructura Semántica:</strong> Uso de <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;aside&gt;</code> y <code>&lt;footer&gt;</code> para optimizar SEO y accesibilidad (a11y).</p>\n        <p>• <strong>Formularios Accesibles:</strong> Vinculación obligatoria entre etiquetas y controles con <code>&lt;label for=\"id_campo\"&gt;</code> e <code>&lt;input id=\"id_campo\" type=\"...\"&gt;</code>.</p>\n        <p>• <strong>Tipos de Entrada Modernos:</strong> <code>type=\"email\"</code>, <code>type=\"tel\"</code>, <code>type=\"date\"</code> y atributos de validación nativa <code>required</code>, <code>pattern</code>, <code>minlength</code>.</p>\n      "
      },
      {
        "id": "fs-css",
        "titulo": "CSS3: Box Model, Flexbox y Grid",
        "contenido": "\n        <p>• <strong>Box Model:</strong> Contenido $\\rightarrow$ Padding $\\rightarrow$ Border $\\rightarrow$ Margin. Regla global recomendada: <code>* { box-sizing: border-box; }</code>.</p>\n        <p>• <strong>Flexbox (1D):</strong> Layout unidimensional. Propiedad <code>justify-content</code> para el eje principal y <code>align-items</code> para el eje transversal.</p>\n        <p>• <strong>CSS Grid (2D):</strong> Layout bidimensional de filas y columnas simultáneas (<code>grid-template-columns</code>, <code>gap</code>).</p>\n        <p>• <strong>Media Queries:</strong> <code>@media (max-width: 768px) { ... }</code> para adaptar estilos en tabletas y teléfonos móviles.</p>\n      "
      },
      {
        "id": "fs-js",
        "titulo": "JavaScript: DOM, Eventos y Métodos de Arreglos",
        "contenido": "\n        <p>• <strong>Selección en el DOM:</strong> <code>document.querySelector('selector')</code> y <code>document.querySelectorAll('selector')</code>.</p>\n        <p>• <strong>Manejo de Eventos:</strong> <code>element.addEventListener('click', handler)</code> y cancelación de envío con <code>event.preventDefault()</code>.</p>\n        <p>• <strong>Arreglos Modernos:</strong> <code>.map()</code>, <code>.filter()</code>, <code>.reduce()</code>, <code>.find()</code> y ordenamiento numérico <code>arr.sort((a, b) => a - b)</code>.</p>\n      "
      }
    ]
  },
  "basedatos": {
    "id": "basedatos",
    "nombre": "Taller de Base de Datos",
    "icono": "🗄️",
    "descripcion": "Experiencia 1: Programación PL/SQL Avanzada en Oracle: RECORD, VARRAY, Cursores Explícitos, Excepciones, Procedimientos, Funciones, Paquetes y Triggers.",
    "temas": [
      {
        "id": "bd-records",
        "titulo": "Estructuras Compuestas: RECORD y VARRAY",
        "contenido": "\n        <p>• <strong>RECORD:</strong> Agrupa campos heterogéneos en una sola variable. Definición: <code>TYPE t_emp IS RECORD (...);</code> o captura directa con <code>v_emp EMPLEADO%ROWTYPE;</code>.</p>\n        <p>• <strong>VARRAY (Colección):</strong> Arreglo unidimensional homogéneo con límite máximo declarado: <code>TYPE t_meses IS VARRAY(12) OF NUMBER;</code>.</p>\n      "
      },
      {
        "id": "bd-cursores",
        "titulo": "Cursores Explícitos y Ciclos de Procesamiento",
        "contenido": "\n        <p>• <strong>Ciclo Canónico:</strong> <code>DECLARE CURSOR c IS SELECT...</code> $\\rightarrow$ <code>OPEN c;</code> $\\rightarrow$ <code>FETCH c INTO v;</code> $\\rightarrow$ <code>CLOSE c;</code>.</p>\n        <p>• <strong>Cursor FOR LOOP:</strong> Automatiza la apertura, recuperación y cierre: <code>FOR reg IN c_datos LOOP ... END LOOP;</code>.</p>\n        <p>• <strong>Atributos de Cursor:</strong> <code>%FOUND</code>, <code>%NOTFOUND</code>, <code>%ISOPEN</code>, <code>%ROWCOUNT</code>.</p>\n      "
      },
      {
        "id": "bd-excepciones",
        "titulo": "Gestión de Excepciones y Reglas de Negocio",
        "contenido": "\n        <p>• <strong>Predefinidas de Oracle:</strong> <code>NO_DATA_FOUND</code> (ORA-01403), <code>TOO_MANY_ROWS</code> (ORA-01422), <code>DUP_VAL_ON_INDEX</code> (ORA-00001), <code>ZERO_DIVIDE</code> (ORA-01476).</p>\n        <p>• <strong>Excepciones de Usuario:</strong> Declaración con <code>e_saldo_insuficiente EXCEPTION;</code> y detonación con <code>RAISE e_saldo_insuficiente;</code>.</p>\n        <p>• <strong>Captura:</strong> Bloque <code>EXCEPTION WHEN e_nombre THEN ... WHEN OTHERS THEN ...</code>.</p>\n      "
      },
      {
        "id": "bd-subprogramas",
        "titulo": "Procedimientos, Funciones, Paquetes y Triggers",
        "contenido": "\n        <p>• <strong>Procedimientos (PROCEDURE):</strong> Ejecutan bloques de lógica DML y transaccional con parámetros <code>IN</code>, <code>OUT</code>, <code>IN OUT</code>.</p>\n        <p>• <strong>Funciones (FUNCTION):</strong> Declaran obligatoriamente <code>RETURN tipo</code> y devuelven un valor escalar con <code>RETURN resultado;</code>.</p>\n        <p>• <strong>Paquetes (PACKAGE):</strong> Encapsulan código dividiéndose en Especificación (pública) y Cuerpo (Body privado).</p>\n        <p>• <strong>Triggers:</strong> Disparadores automáticos ante eventos <code>BEFORE/AFTER INSERT/UPDATE/DELETE</code>. Acceso a datos con <code>:OLD.campo</code> y <code>:NEW.campo</code> en triggers de fila (<code>FOR EACH ROW</code>).</p>\n      "
      }
    ]
  },
  "moviles": {
    "id": "moviles",
    "nombre": "Desarrollo de Aplicaciones Móviles",
    "icono": "📱",
    "descripcion": "Experiencia 1: Fundamentos de Kotlin, Null Safety, Ciclo de Vida de Activities, Jetpack Compose y Arquitectura MVVM.",
    "temas": [
      {
        "id": "mov-kotlin",
        "titulo": "Kotlin y Ciclo de Vida Android",
        "contenido": "\n        <p>• <strong>Inmutabilidad:</strong> <code>val</code> (solo lectura) vs <code>var</code> (mutable).</p>\n        <p>• <strong>Null Safety:</strong> <code>String?</code> para tipos que admiten null, operador elvis <code>?:</code> y safe-call <code>?.</code>.</p>\n        <p>• <strong>Activity Lifecycle:</strong> <code>onCreate()</code>, <code>onStart()</code>, <code>onResume()</code>, <code>onPause()</code>, <code>onStop()</code>, <code>onDestroy()</code>.</p>\n        <p>• <strong>Jetpack Compose:</strong> Interfaces declarativas modernas con funciones anotadas con <code>@Composable</code>.</p>\n      "
      }
    ]
  },
  "poo": {
    "id": "poo",
    "nombre": "Desarrollo Orientado a Objetos",
    "icono": "☕",
    "descripcion": "Experiencia 1: Programación Orientada a Objetos en Java: Clases, Encapsulamiento, Herencia, Polimorfismo y Colecciones.",
    "temas": [
      {
        "id": "poo-java",
        "titulo": "Pilares de la POO y Java Collections",
        "contenido": "\n        <p>• <strong>Encapsulamiento:</strong> Atributos <code>private</code> con métodos públicos <code>get/set</code>.</p>\n        <p>• <strong>Herencia:</strong> Palabra clave <code>extends</code> para herencia simple de clases.</p>\n        <p>• <strong>Polimorfismo:</strong> Sobrescritura de métodos con la anotación <code>@Override</code>.</p>\n        <p>• <strong>Colecciones:</strong> <code>List&lt;E&gt;</code> (ArrayList), <code>Set&lt;E&gt;</code> (HashSet para elementos únicos) y <code>Map&lt;K, V&gt;</code> (HashMap para asociaciones clave-valor).</p>\n      "
      }
    ]
  },
  "estadistica": {
    "id": "estadistica",
    "nombre": "Estadística Descriptiva",
    "icono": "📊",
    "descripcion": "Experiencia 1: Población, Muestra, Variables, Tablas de Frecuencia, Gráficos, Tendencia Central y Dispersión.",
    "temas": [
      {
        "id": "estadistica-exp1",
        "titulo": "Resumen Teórico Experiencia 1: Conceptos Fundamentales",
        "contenido": "\n        <h3>👥 1. Población vs. Muestra</h3>\n        <p><strong>Población (N):</strong> El conjunto total de individuos sobre los cuales se quieren obtener conclusiones.</p>\n        <p><strong>Muestra (n):</strong> Subconjunto representativo efectivamente encuestado o medido.</p>\n        <hr>\n        <h3>🏷️ 2. Clasificación de Variables</h3>\n        <ul>\n          <li><strong>Cualitativa Nominal:</strong> Sin jerarquía (ej. Red social, Carrera).</li>\n          <li><strong>Cualitativa Ordinal:</strong> Con orden intrínseco (ej. Nivel de gravedad, Satisfacción).</li>\n          <li><strong>Cuantitativa Discreta:</strong> Conteo entero (ej. N° de televisores, N° de asignaturas).</li>\n          <li><strong>Cuantitativa Continua:</strong> Medición real con decimales (ej. Tiempo, Sueldo, Horas).</li>\n        </ul>\n        <hr>\n        <h3>📊 3. Tablas de Frecuencia y Gráficos</h3>\n        <p>• <strong>Frecuencias:</strong> $f_i$ (absoluta), $h_i$ (relativa %), $F_i, H_i$ (acumuladas).</p>\n        <p>• <strong>Histograma:</strong> Exclusivo para variables cuantitativas continuas agrupadas en intervalos.</p>\n        <hr>\n        <h3>⚖️ 4. Tendencia Central y Dispersión</h3>\n        <p>• <strong>Media ($\bar{x}$) vs Mediana ($Me$):</strong> Si $\bar{x} > Me \rightarrow$ Asimetría positiva (sesgo a la derecha, la mediana es más representativa).</p>\n        <p>• <strong>Homogeneidad:</strong> Si $CV = (s / \bar{x}) \times 100% le 30% \rightarrow$ Datos <strong>homogéneos</strong>.</p>\n      "
      }
    ]
  }
};

const SUBJECTS_LIST = [
  { id: 'all', nombre: '🌟 Todos los Temas (Modo Examen)', icono: '🌟' },
  { id: 'moviles', nombre: '📱 Aplicaciones Móviles', icono: '📱' },
  { id: 'poo', nombre: '☕ Orientado a Objetos (Java)', icono: '☕' },
  { id: 'fullstack', nombre: '🌐 Fullstack 2 (Web & JS)', icono: '🌐' },
  { id: 'basedatos', nombre: '🗄️ Taller de Base de Datos', icono: '🗄️' },
  { id: 'estadistica', nombre: '📊 Estadística Descriptiva', icono: '📊' }
];
