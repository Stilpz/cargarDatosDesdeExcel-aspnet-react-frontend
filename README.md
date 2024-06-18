# Detalles de la Aplicación

Esta aplicación ha sido desarrollada utilizando ASP.NET Core para el backend, React para el frontend, y SQL Server como base de datos relacional. A continuación se detallan las características y funcionamiento principal de la aplicación.
Funcionamiento de los Endpoints Principales

## GET /api/clientes
    Descripción: Retorna una lista paginada de todos los clientes almacenados en la base de datos.
    Uso: Este endpoint se utiliza para obtener la lista completa de clientes registrados. Los resultados se muestran paginados.
    Parámetros:
        page: Número de página para la paginación (opcional, por defecto es 1).
        pageSize: Tamaño de la página (opcional, por defecto es 10 registros por página).
    Respuesta Exitosa (200 OK): Retorna una lista paginada de clientes en formato JSON.
    Respuesta de Error: Retorna un mensaje de error con el código de estado correspondiente en caso de fallo.

## GET /api/clientes/{id}
    Descripción: Retorna un cliente específico según el ID proporcionado.
    Uso: Se utiliza para obtener los detalles de un cliente específico.
    Parámetros: {id} es el identificador único del cliente.
    Respuesta Exitosa (200 OK): Retorna los detalles del cliente solicitado en formato JSON.
    Respuesta de Error: Retorna un mensaje de error con el código de estado correspondiente si el cliente no existe o si hay un problema de servidor.

## POST /api/clientes
    Descripción: Crea un nuevo cliente con los datos proporcionados.
    Uso: Se utiliza para registrar un nuevo cliente en la base de datos.

Ejemplo de Datos (JSON):
json
```
    {
        "nombre": "Juan",
        "apellidos": "Pérez",
        "edad": 30,
        "email": "juan.perez@example.com",
        "telefono": "5551234",
        "direccion": "Calle Principal 123",
        "documento": "12345678",
        "tipo_documento": "CC"
    }
```
    Respuesta Exitosa (201 Created): Retorna los detalles del cliente creado y la URL para acceder a estos detalles.
    Respuesta de Error: Retorna un mensaje de error con el código de estado correspondiente si hay problemas de validación o de servidor.

## PUT /api/clientes/{id}

    Descripción: Actualiza los datos de un cliente existente.
    Uso: Se utiliza para modificar los datos de un cliente específico.
    Ejemplo de Datos (JSON):

    json
```
        {
            "id": 1,
            "nombre": "Juan Modificado",
            "apellidos": "Pérez",
            "edad": 31,
            "email": "juan.perez@example.com",
            "telefono": "5551234",
            "direccion": "Calle Principal 123",
            "documento": "12345678",
            "tipo_documento": "CC"
        }
```
        Respuesta Exitosa (200 OK): Retorna los detalles actualizados del cliente.
        Respuesta de Error: Retorna un mensaje de error con el código de estado correspondiente si el cliente no existe o si hay problemas de validación o de servidor.

  ## DELETE /api/clientes/{id}
      Descripción: Elimina un cliente según el ID proporcionado.
      Uso: Se utiliza para eliminar un cliente específico de la base de datos.
      Respuesta Exitosa (200 OK): Retorna el ID del cliente eliminado.
      Respuesta de Error: Retorna un mensaje de error con el código de estado correspondiente si el cliente no existe o si hay problemas de servidor.

  ## GET /api/clientes/search
      Descripción: Busca clientes por nombre y/o correo electrónico.
      Uso: Se utiliza para realizar búsquedas basadas en nombre y/o correo electrónico de los clientes.
      Parámetros Query:
          searchTerm: Término de búsqueda para nombre o correo electrónico.
      Respuesta Exitosa (200 OK): Retorna una lista de clientes que coinciden con el término de búsqueda en formato JSON.
      Respuesta de Error: Retorna un mensaje de error con el código de estado correspondiente si hay problemas de servidor.

 ##  POST /api/clientes/uploadcsv
      Descripción: Carga datos de clientes desde un archivo CSV.
      Uso: Se utiliza para importar múltiples registros de clientes desde un archivo CSV.
      Formato del Archivo CSV: El archivo debe contener las columnas: nombre, apellidos, edad, email, telefono, direccion, documento, tipo_documento.
      Respuesta Exitosa (200 OK): Retorna una lista de registros de clientes creados a partir del archivo CSV en formato JSON.
      Respuesta de Error: Retorna un mensaje de error con el código de estado correspondiente si hay problemas al procesar el archivo CSV.

## Buenas Prácticas y Patrones de Diseño Implementados

    Arquitectura de Capas: Se ha utilizado una arquitectura basada en capas separando la lógica de negocio, la capa de acceso a datos y la presentación (frontend).

    Inyección de Dependencias: ASP.NET Core utiliza inyección de dependencias de manera nativa, lo cual promueve un código más limpio, mantenible y testeable.

    Uso de DTOs (Data Transfer Objects): Se utilizan DTOs para transferir datos entre la capa de presentación (frontend) y la capa de servicio/entidad, evitando acoplamientos innecesarios y mejorando la seguridad.

    Seguridad: Se implementa seguridad a nivel de endpoints utilizando atributos de autorización y roles de usuario para proteger las operaciones sensibles como modificar o eliminar datos.

## Instrucciones para Configurar y Ejecutar la Aplicación

Para ejecutar la aplicación, sigue estos pasos:

    Backend (ASP.NET Core):
        Asegúrate de tener instalado Visual Studio con las cargas de trabajo de desarrollo de ASP.NET Core.
        Abre la solución en Visual Studio.
        Configura la cadena de conexión a la base de datos SQL Server en appsettings.json.
        Compila y ejecuta el proyecto.

    Frontend (React):
        Asegúrate de tener Node.js y npm instalados en tu sistema.
        Abre una terminal y navega hasta la carpeta del proyecto de frontend.
        Instala las dependencias usando npm install.
        Inicia la aplicación usando npm start.

    Base de Datos:
        Asegúrate de tener un servidor SQL Server instalado y disponible.
        Ejecuta las migraciones para crear la estructura de la base de datos utilizando Entity Framework Core.

## Instrucciones para Ejecutar las Pruebas Unitarias

Para ejecutar las pruebas unitarias, sigue estos pasos:

    Backend (ASP.NET Core):
        Abre el explorador de pruebas de Visual Studio.
        Ejecuta todas las pruebas unitarias proporcionadas en el proyecto.

    Frontend (React):
        Utiliza herramientas como Jest y Enzyme para las pruebas unitarias de componentes React.
        Ejecuta las pruebas usando npm test.

## Las siguientes son orientaciones a tener en cuenta para la correcta ejecución de la aplicación de React


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
