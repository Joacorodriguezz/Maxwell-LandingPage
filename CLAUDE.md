# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page institucional para **Maxwell S.A. — Servicios de Ingeniería y Obra**, empresa con sede en La Plata, Buenos Aires. El sitio debe presentar la empresa, sus servicios y clientes de forma profesional.

## Status

En progreso. Stack pendiente de confirmar.

## Stack y tecnologías


- **Tecnologia:** React + Tailwind CSS
- **Estructura:**

```
/maxwell-landing
  /public
    /images     → logos, fotos de obras
    /icons
  /src
    index.html (o pages/index.jsx)
    styles.css
    /components → Header, Hero, Servicios, Clientes, Contacto, Footer
  README.md
```

Once a stack is confirmed, update this file with:
- Build, dev server, and lint commands
- How to run tests

---

## Identidad Visual

| Elemento | Valor |
|---|---|
| Azul marino (fondo/navbar) | `#1A2B4C` |
| Naranja (CTA/accents) | `#F26D21` |
| Gris carbón (texto) | `#333333` / `#2D3748` |
| Blanco (fondo principal) | `#FFFFFF` |
| Gris claro (fondos sec.) | `#F8F9FA` / `#F3F4F6` |
| Tipografía | Montserrat o Barlow (sans-serif industrial) |
| Estilo | Profesional, industrial, limpio. Diagonales/chevrons como elemento gráfico |

---

## Info de la Empresa

| Campo | Dato |
|---|---|
| Razón social | Maxwell Servicios de Ingeniería y Obra S.A. |
| Dirección | Calle 2 #1574, Piso 8 Depto B, La Plata, Buenos Aires. CP B1904CGH |
| Representante | Ing. Eduardo J. Rodriguez |
| Teléfono | 0221-4896360 |
| Móvil | 0221-15-4978097 |
| Web | www.maxwellsa.com.ar |
| Certificación | ISO 9001:2008 |

**Emails:**
- administracion@maxwellsa.com.ar
- gerencia@maxwellsa.com.ar
- ingenieria@maxwellsa.com.ar
- contacto@maxwellsa.com.ar
- calidad@maxwellsa.com.ar

---

## Secciones de la Landing

### 1. Header / Navbar
- Sticky, fondo `#1A1F4B`, texto blanco
- Logo: Maxwell S.A. (naranja + engranaje)
- Links: Inicio, Quiénes Somos, Servicios, Clientes, Calidad, Contacto
- Botón CTA naranja: "Contactanos" → scroll a sección Contacto

### 2. Hero
- Full-width con imagen industrial de fondo + overlay oscuro
- Diagonal naranja decorativa (elemento del branding)
- Título: *"Ingeniería y Obra de Alta Complejidad"*
- Subtítulo: *"Somos un grupo de profesionales y técnicos abocados a la elaboración de proyectos integrales de ingeniería — desde la concepción hasta la puesta en marcha."*
- CTA primario: "Conocé nuestros servicios" → scroll Servicios
- CTA secundario: "Contactanos" → scroll Contacto

### 3. Quiénes Somos
- Texto + imagen lateral
- 3 párrafos sobre la empresa
- 3 highlights con íconos:
  - Ingeniería Integral (conceptual, básica y de detalle)
  - Documentación Técnica (planos, memorias, isométricos)
  - Puesta en Marcha (pre-comisionado, comisionado, guardias 7x24)

### 4. Servicios (Gerencia de Ingeniería)
Grid de cards por departamento:
- **Procesos:** PFDs, P&IDs, cálculo hidráulico, intercambiadores, separadores, válvulas de alivio, sistema contra incendio
- **Instrumentación:** Diagramas de lazo, PLCs, SCADA, arquitectura de control, pre-comisionado
- **Mecánica y Cañerías:** Pipe Stress Analysis, ASME (recipientes a presión), API 650 (tanques)
- **Electricidad:** Cortocircuito, flujo de carga, luminotecnia, unifilares, comisionado
- **Saneamiento y Agua:** Redes agua potable/cloacas, AWWA M11, estaciones de bombeo
- **Estructuras y Civil:** Hormigón armado, fundaciones, obras de arte, edificios industriales

### 5. Clientes
Grid de logos/tarjetas. Cita destacada de +100 obras para YPF.

| Empresa | Sector |
|---|---|
| YPF S.A. | Petróleo y Gas |
| Cooperativa Eléctrica de Punta Indio | Energía Eléctrica |
| INDUNOR S.A. | Industria / Química |
| Petroken S.A. | Petroquímica |
| Flowserve S.A. | Industria |
| Trexcin Construcciones S.A. | Construcción |
| Tisico S.A. | Ingeniería |
| DECA Electromecánica | Electromecánica |
| Ingeniería y Construcciones Alsina S.A. | Construcción |
| Gelvez S.R.L. | Gas / Energía |
| Ford Motors Co. | Automotriz |
| Ronza Ingeniería S.A. | Ingeniería |

### 6. Política de Calidad
- Fondo azul marino
- 3 pilares: SGC ISO 9001:2008 / Mejora Continua / Satisfacción del Cliente

### 7. Contacto
- Formulario: Nombre, Empresa, Email, Teléfono, Asunto, Mensaje
- Datos de contacto completos (dirección, teléfonos, emails por área)

### 8. Footer
- Fondo azul marino, 3 columnas: logo+descripción / links rápidos / contacto
- Copyright: © getYear() Maxwell S.A. Todos los derechos reservados.

---


