# BACKEND CLAYBIOSECURITY

# DEPENDENCIAS IMPLEMENTADAS

```JSON
        "class-transformer": "0.5.1",
        "class-validator": "0.14.0",
        "cookie-parser": "1.4.6",
        "dotenv": "16.3.1",
        "express": "4.18.2",
        "express-query-boolean": "2.0.0",
        "express-rate-limit": "6.8.1",
        "express-routes-versioning": "^1.0.1",
        "express-session": "1.17.3",
        "express-validator": "7.0.1",
        "jose": "4.14.4",
        "mongodb": "5.7.0",
        "nodemon": "3.0.1",
        "passport": "0.6.0",
        "passport-http-bearer": "1.0.1"
```

<br><br>

# IMPLEMENTACION PROYECTO

### CLONACION DEL REPOSITORIO

Clonamos el repositorio con visual estudio code y lo guardamos en una carpeta de nuestra elección

```
https://github.com/JoseCabrejoVillarCampus/PushUpClayBioseguridad
```

<br><br>

### DEPENDENCIAS USADAS


```
"devDependencies": {
    "class-transformer": "0.5.1",
    "class-validator": "0.14.0",
    "dotenv": "16.3.1",
    "express": "4.18.2",
    "mysql2": "^3.5.1",
    "nodemon": "3.0.1",
    "reflect-metadata": "0.1.13",
    "typescript": "5.1.6"
  },
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "express-query-boolean": "^2.0.0",
    "express-session": "^1.17.3",
    "jose": "^5.0.2",
    "tsc": "^2.0.4"
  }
```

### INSTALACION DE DEPENDENCIAS

Para Usar las Dependencias que estan en el package.json :

```
npm install
```

<br><br>

# CONFIGURACION DEL .env

Dentro de la Ruta que creamos para alojar el proyecto buscamos  el  archivo llamado ".env.example" y lo cambiamos por ".env"
En el archivo .env, configurar las siguientes variables de conexión a la base de datos:

```
MY_CONNECT:{"host":"","database":"", "user":"", "password":""}
MY_CONFIG:{"hostname":"", "port":}
JWT_PRIVATE_KEY:""
```

En el campo de MY_SERVER ingrese un hostname y un puerto a su elección(preferiblemente mayor al 5000). Recuerde que por defecto el local host requiere que el hostname es 127.0.0.1. pero puede ser,
ATLAS_USER es el usuario de la base de datos registrado en Atlas y ATLAS_PASSWORD es la contraseña que le asignamos, ATLAS_DB es el nombre de la base de datos y el JWT_PRIVATE_KEY es la palabra secreta que usaremos para generar los tokens de JWT

Hemos Creado un Usuario con acceso a la db de Moongo npara el testeo:

``` SQL
MY_CONNECT:{"host":"","database":"", "user":"", "password":""}
MY_CONFIG:{"hostname":"", "port":}
JWT_PRIVATE_KEY:""
```

<br><br>

# INICIAR nodemon

```
npm run dev
```

<br><br>

**1. Listar todas las ventas que se realizaron en el mes de julio de 2023**

```sql
SELECT * FROM venta
WHERE Fecha BETWEEN '2023-07-01' AND '2023-07-30' ; 
```

**2. Seleccionar todos los empleados con sus respectivos cargos y municipios**

```sql
SELECT e.nombre, m. nombre, c.descripcion
FROM	empleado AS e
INNER JOIN municipio AS m ON e.IdMunicipioFk=m.id
INNER JOIN cargos AS c ON e.IdCargosFk=c.id
```

**3. Obtener la lista de todas las ventas con la información de los clientes y la forma de pago**

```sql
SELECT v.Fecha, c. cliente, f.forma_pago
FROM	venta AS v
INNER JOIN cliente AS c ON v.IdClienteFk=c.id
INNER JOIN forma_pago AS c ON e.IdFormaPagoFk=f.id
```

**4. Mostrar los detalles de todas las órdenes junto con los nombres de los empleados y clientes asociados**

```sql
SELECT *, o.IdClienteFk, o.IdEmpleadoFk
FROM	detalle_orden AS do
INNER JOIN orden AS o ON do.IdClienteFk=o.id
INNER JOIN orden AS c ON do.IdEmpleadoFk=o.id
```

**5. Listar los productos disponibles en el inventario junto con su talla y color**

```sql
# Consulta realizada ....
```

**6. Mostrar todos los proveedores junto con la lista de insumos que suminis**

```sql
# Consulta realizada ....
```

**7. Encontrar la cantidad de ventas realizadas por cada empleado**

```sql
# Consulta realizada ....
```

**8. Mostrar la lista de órdenes en proceso junto con los nombres de los clientes y empleados asociados**

```sql
# Consulta realizada ....
```

**9. Obtener el nombre de la empresa y su respectivo representante legal junto con el nombre del municipio al que pertenecen**

```sql
# Consulta realizada ....
```

**10. Mostrar la lista de prendas y su respectivo stock disponible**

```sql
# Consulta realizada ....
```

**11. Encontrar el nombre de los clientes que realizaron compras en una fecha específica junto con la cantidad de artículos comprados**

```sql
# Consulta realizada ....
```

**12. Mostrar la lista de empleados y la duración de su empleo en años **

```sql
# Consulta realizada ....
```

**13. Obtener el nombre de las prendas junto con el valor total de ventas en dólares para cada una **

```sql
# Consulta realizada ....
```

**14. Obtener el nombre de las prendas junto con la cantidad mínima y máxima de insumos necesarios para su fabricación **

```sql
# Consulta realizada ....
```

**15. Obtener la lista de empleados y su información de contacto, incluyendo el nombre, el cargo y el municipio **

```sql
# Consulta realizada ....
```

**16. Mostrar la lista de ventas realizadas en un rango de fechas específico junto con el nombre del cliente y la forma de pago **

```sql
# Consulta realizada ....
```

**17. Obtener el nombre de las prendas y su valor unitario en dólares junto con el estado de disponibilidad **

```sql
# Consulta realizada ....
```

**18. Mostrar la lista de clientes y la cantidad de compras que han realizado **

```sql
# Consulta realizada ....
```

**19. Obtener la lista de órdenes junto con el estado actual y la fecha en que se crearon **

```sql
# Consulta realizada ....
```

**20. Obtener el nombre y la descripción de los cargos con un sueldo base superior a 2.000.000  **

```sql
# Consulta realizada ....
```

**21. Mostrar la lista de clientes con sus respectivos municipios y países  **

```sql
# Consulta realizada ....
```

**22 Obtener el nombre y la descripción de los tipos de protección y el número de prendas asociadas a cada tipo  **

```sql
# Consulta realizada ....
```

**23 Mostrar la lista de empleados con sus cargos y fechas de ingreso ordenados por la fecha de ingreso de manera descendente  **

```sql
# Consulta realizada ....
```

**24 Mostrar el nombre y la descripción de todos los cargos junto con la cantidad de empleados en cada cargo  **

```sql
# Consulta realizada ....
```

**25 Obtener el nombre y la descripción de los estados junto con la cantidad de prendas asociadas a cada estado  **

```sql
# Consulta realizada ....
```

**26 Obtener el nombre y la descripción de los tipos de persona junto con la cantidad de clientes asociados a cada tipo  **

```sql
# Consulta realizada ....
```

**27 Mostrar el nombre y la descripción de los tipos de protección junto con la cantidad de prendas asociadas a cada tipo  **

```sql
# Consulta realizada ....
```

**28 Obtener el nombre y la descripción de los estados junto con la cantidad de órdenes asociadas a cada estado  **

```sql
# Consulta realizada ....
```

**29 Obtener el nombre y la descripción de los tipos de pago junto con la cantidad de ventas asociadas a cada tipo  **

```sql
# Consulta realizada ....
```

**30 Mostrar el nombre y la descripción de los tipos de insumos junto con la cantidad de prendas que los utilizan **

```sql
# Consulta realizada ....
```

**31 Obtener el nombre de los clientes y la cantidad total gastada por cada uno en ventas **

```sql
# Consulta realizada ....
```

**32 Mostrar el nombre y la descripción de las prendas junto con el valor total de ventas en pesos colombianos para cada una **

```sql
# Consulta realizada ....
```

**33 Mostrar el nombre y la descripción de los estados junto con la cantidad de prendas asociadas a cada estado en orden ascendente de la cantidad de prendas **

```sql
# Consulta realizada ....
```