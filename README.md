# Lumina — Reto 2: Empaquetado, versionamiento y despliegue

Aplicación web estática moderna para el seguimiento de hábitos diarios (máximo 3).  
Proyecto del módulo **Despliegues de aplicaciones web y móviles** (UVEG).

## Estructura del proyecto

```
Reto2/
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos fuente
│   └── styles.min.css      # Estilos minificados (producción)
├── js/
│   ├── app.js              # Lógica fuente
│   └── app.min.js          # Lógica minificada (producción)
├── img/                    # SVG optimizados (bajo peso)
├── nginx/
│   └── lumina.conf         # Server block de Nginx
├── scripts/
│   └── minify.js           # Script de minificación
├── lumina-web.zip          # Paquete listo para subir al servidor
└── README.md
```

## Propósito de la aplicación

**Lumina** permite registrar hasta tres hábitos del día, marcarlos como completados y reiniciar el progreso. Los datos se guardan en `localStorage` del navegador (sin backend).

## Parte 1 — Proceso realizado

### 1. Preparación y organización

1. Se organizaron los archivos en carpetas estándar: `/css`, `/js`, `/img` y `/nginx`.
2. Las imágenes se generaron en **SVG** (vectoriales, peso muy bajo, sin pérdida de calidad).
3. Se minificaron CSS y JS con el script `scripts/minify.js`.
4. `index.html` referencia las versiones minificadas (`styles.min.css` y `app.min.js`).

### 2. Empaquetado

Paquete generado: **`lumina-web.zip`**

Contiene la estructura final lista para desplegar:

- `index.html`
- `css/` (incluye minificado)
- `js/` (incluye minificado)
- `img/`

Para regenerar el paquete en PowerShell:

```powershell
Compress-Archive -Path index.html, css, js, img -DestinationPath lumina-web.zip -Force
```

Para regenerar minificados:

```powershell
node scripts/minify.js
```

### 3. Versionamiento (Git / GitHub)

1. Se inicializó el repositorio Git en este directorio.
2. Se realizaron **commits descriptivos** por etapa (estructura HTML, estilos, lógica, imágenes, minificación, Nginx, empaquetado y README).
3. El proyecto se publicó en GitHub (el documento Word de la entrega académica **no** forma parte de este repositorio).

### 4. Configuración del servidor — Nginx (Server Block)

Se eligió **Nginx** con un *server block* que publica la app en:

**http://localhost/lumina**

Archivo de configuración: [`nginx/lumina.conf`](nginx/lumina.conf)

#### Pasos de despliegue (simulación)

1. Instala Nginx (Windows, WSL o Linux).
2. Copia el contenido del paquete (o del repo) a la carpeta del servidor, por ejemplo:
   - Windows: `C:\nginx\html\lumina\`
   - Linux/WSL: `/var/www/html/lumina/`
3. Copia `nginx/lumina.conf` a la carpeta de configuración de Nginx e inclúyelo desde `nginx.conf`:

```nginx
include conf/lumina.conf;
```

4. Ajusta la ruta `alias` si tu instalación usa otra carpeta (por ejemplo `alias /var/www/html/lumina/;`).
5. Prueba y recarga:

```bash
nginx -t
nginx -s reload
```

6. Abre el navegador en `http://localhost/lumina`.

#### Puertos y mapeo

| Elemento | Valor |
|----------|--------|
| Puerto | `80` |
| `server_name` | `localhost` |
| URL de la app | `/lumina/` |
| Directorio | `html/lumina/` (alias) |

## Cómo probar en local sin Nginx

Abre `index.html` directamente en el navegador, o sirve la carpeta con:

```powershell
npx --yes serve -l 5500
```

Luego visita `http://localhost:5500`.

## Tecnologías

- HTML5 semántico
- CSS3 (variables, grid, animaciones)
- JavaScript (Vanilla + `localStorage`)
- Nginx (server block)
- Git / GitHub

## Autor

Proyecto académico — Reto 2 · UVEG
