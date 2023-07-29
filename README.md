# Desafio Always Music Modulo 7

Este proyecto corresponde al desafio del modulo 7 - Always Music, para el bootcamp **Desarrollo de Aplicaciones Full Stack JavaScript Trainee v2.0 Vespertino**.

### Ejercicio Propuesto 🚀

En este desafío deberás desarrollar una aplicación en Node que realice consultas a PostgreSQL con el paquete “pg” para:

-   Agregar un nuevo estudiante.
-   Consultar los estudiantes registrados.
-   Consultar estudiante por rut.
-   Actualizar la información de un estudiante.
-   Eliminar el registro de un estudiante.

Ya que el caso se trata de un proceso de desarrollo, la interacción la debes realizar con argumentos por la línea de comandos o a través de una API REST en Express.

### Requerimientos ⚙️

1. Realizar la conexión con PostgreSQL, utilizando la clase Pool y definiendo un máximo de 20 clientes, 5 segundos como tiempo máximo de inactividad de un cliente y 2 segundos de espera de un nuevo cliente.
2. Hacer todas las consultas con un JSON como argumento.
3. Hacer las consultas con texto parametrizado.
4. Liberar a un cliente al concluir su consulta si se usa client de pool.
5. Capturar los posibles errores en todas las consultas.
6. Retornar por consola un mensaje de error en caso de haber problemas de conexión.
7. Obtener el registro de los estudiantes registrados en formato de arreglos.

### BASE DE DATOS POSTGRESQL

Crear role/usuario con password:

```sql
CREATE USER desafio_always WITH PASSWORD '1234';
```

Crear base de datos db_always y asignarla a el role desafio_always:

```sql
CREATE DATABASE db_always OWNER always_user;
```

Crear tabla estudiante:

```sql
CREATE TABLE estudiante (
	rut VARCHAR(12) NOT NULL PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	curso VARCHAR(255) NOT NULL,
	nivel INT NOT NULL
);
```

Ingresar estudiante para test;

```sql
INSERT INTO estudiante(rut, nombre, curso, nivel)
VALUES ('11222333-4', 'John Doe', 'Violin', 1);
```

### Instalación / Ejecución 🧨

Instalación:

```
npm install
```

Ejecución de servidor en unix:

```
npm run dev
```

Ejecución de servidor en windows:

```
npm run dev-win
```

### End Points (Postman / Thunder client)

Listar Todos los Estudientes:

```
http://localhost:3000/
```

Búsqueda de Estudiente por RUT:

```
http://localhost:3000/read?rut=22333444-5
```

Añadir nuevo Estudiente:

```
http://localhost:3000/create?rut=22333444-5&nombre=Juan González&curso=Bateria&nivel=2
```

Actualizar Estudiente:

```
http://localhost:3000/update?rut=22333444-5&nombre=Juan González&curso=Guitarra&nivel=1
```

Eliminar Estudiente:

```
http://localhost:3000/delete?rut=22333444-5
```
