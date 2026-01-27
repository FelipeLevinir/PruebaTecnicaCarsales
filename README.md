# Rick & Morty – BFF + Angular 19

Proyecto de prueba técnica que implementa un **Backend for Frontend (BFF)** en **.NET 8** y un **Frontend en Angular 19**, consumiendo la API pública de Rick & Morty.

El objetivo es demostrar:
- Separación de responsabilidades
- Buenas prácticas de arquitectura
- Tipado estricto
- Uso de tecnologías modernas (.NET 8, Angular 19, PrimeNG)

---

## Arquitectura General

### Backend (BFF)
- .NET 8
- Minimal APIs
- Arquitectura en capas:
  - **Api**
  - **Application**
  - **Infrastructure**
- Manejo de errores centralizado
- Tipado fuerte con DTOs

### Frontend
- Angular 19 (Standalone components)
- Signals
- PrimeNG (sin frameworks CSS externos)
- Separación en capas:
  - `core`
  - `data-access`
  - `features`
  - `shared`
- Tipado estricto (sin `any`)
- Manejo visual de errores


## Requisitos

### Backend
- .NET SDK **8.x**
- Verificar instalación:
```
dotnet --list-sdks
```
### Frontend
-Node.js 18+
-Angular CLI 19
```
node -v
npm -v
ng version
```
## Levantar el Backend (BFF)

Desde la raíz del repositorio:
```
cd rick-and-morty-api
dotnet restore
dotnet run --project Bff.Api
```
El backend quedará disponible en:

http://localhost:5188

Endpoints principales

-GET /api/episodes?page=1
-GET /api/characters?page=1
-GET /api/characters/{id}

## Levantar el Frontend (Angular)

En otra consola, desde la raíz del repositorio:
```
cd rick-and-morty-app
npm install
ng serve
```
La aplicación quedará disponible en:
http://localhost:4200

El frontend asume que el backend está corriendo localmente.
