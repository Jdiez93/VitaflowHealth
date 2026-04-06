# VitaFlow 🌿



Una plataforma web integral diseñada para la gestión de la salud física y nutricional. Permite a los usuarios realizar un seguimiento detallado de su progreso, calcular métricas corporales y recibir asistencia inteligente mediante IA.

---

## 🚀 Funcionalidades

### 1. Gestión de Usuario y Perfil
* **Registro Seguro:** Autenticación de usuarios con perfiles privados.
* **Seguimiento Personalizado:** Dashboard para registrar ingesta de comidas, entrenamientos y evolución de peso.

### 2. Herramientas de Bienestar
* **Calculadora TMB:** Algoritmo de Tasa Metabólica Basal dinámico basado en las características físicas del usuario.
* **Recetario Interactivo:** Catálogo de recetas filtrables por objetivos nutricionales.

### 3. Inteligencia Artificial
* **AI Chatbot:** Asistente virtual integrado para consultas rápidas sobre nutrición y consejos de salud en tiempo real.

---

## 🛠️ Stack Tecnológico

* **Frontend:** `TypeScript` para una lógica de cliente robusta y tipada.
* **Estilos:** `CSS3` con metodologías modernas para un diseño responsive y minimalista.
* **Backend & Data:** `PL/SQL` para la gestión eficiente de la lógica de negocio en base de datos, triggers y procedimientos almacenados.

---

## 📂 Arquitectura del Proyecto

```text
├── database/
│   ├── procedures/    # Lógica de cálculo y seguimiento en PL/SQL
│   └── schema.sql     # Estructura de tablas de usuarios y registros
├── src/
│   ├── components/    # UI Components (TS)
│   ├── styles/        # Hojas de estilo modulares (CSS)
│   ├── services/      # Integración con la API del Chatbot
│   └── utils/         # Helpers para cálculos matemáticos (TMB)
└── README.md
