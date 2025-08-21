# API KAREN

Servidor para aplicación android.

## Requisitos

- Node.js (v22.14.0)
- npm

## Instalación

1. Copiar el archivo de configuración de ejemplo `.env.example` a `.env`:

```bash
cp .env.example .env

npm install

```
2. Acomodar los datos de la base de datos del `.env`

3. Ejecutar el comando

```bash
npm run dev 
```


## Bash para crear modulos

1. Le damos permisos al archivo sh
```bash
chmod +x createModule.sh
```

2. Ejecutamos el comando 
```bash
./createModule.sh
```
Nos va a pedir el nombre del modulo, lo ponemos y apretamos enter 
```bash
Nombre del módulo (singular, ej: User):
```

y al instante deberiamos ver dentro de modules/ el modulo que hemos creado con sus directorios de controllers, interfaces, models, routes

