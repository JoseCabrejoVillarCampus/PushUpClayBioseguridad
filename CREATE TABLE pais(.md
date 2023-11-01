CREATE TABLE pais(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    PRIMARY KEY (Id));

CREATE TABLE departamento(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL, 
	IdPaisFk INT (11), 
	PRIMARY KEY (Id),
    FOREIGN KEY (IdPaisFk) REFERENCES pais(Id));

CREATE TABLE municipio(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL, 
	IdDepartamentoFk INT (11), 
	PRIMARY KEY (Id),
    FOREIGN KEY (IdDepartamentoFk) REFERENCES departamento(Id));

CREATE TABLE empresa(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    nit VARCHAR (50) NOT NULL, 
	razon_social TEXT,
	representante_legal VARCHAR (50) NOT NULL, 
	FechaCreacion DATE, 
	IdMunicipioFk INT (11),	
	PRIMARY KEY (Id),
    FOREIGN KEY (IdMunicipioFk) REFERENCES municipio(Id));

CREATE TABLE cargos(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR (50) NOT NULL, 
	sueldo_base DOUBLE,
    PRIMARY KEY (Id));

CREATE TABLE empleado(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL, 
	IdCargoFk INT (11), 
	fecha_igreso DATE, 
	IdMunicipioFk INT (11),
	FOREIGN KEY (IdCargoFk) REFERENCES cargos(Id),
	FOREIGN KEY (IdMunicipioFk) REFERENCES municipio(Id),
    PRIMARY KEY (Id));

CREATE TABLE tipo_persona(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR (50) NOT NULL,
    PRIMARY KEY (Id));

CREATE TABLE cliente(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL, 
	IdCliente VARCHAR (255) NOT NULL, 
	IdTipoPersonaFk INT (11),
	fechaRegistro DATE, 
	IdMunicipioFk INT (11),
	FOREIGN KEY (IdTipoPersonaFk) REFERENCES tipo_persona(Id),
	FOREIGN KEY (IdMunicipioFk) REFERENCES municipio(Id),
    PRIMARY KEY (Id));

CREATE TABLE proveedor(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    NitProveedor VARCHAR (50) NOT NULL, 
	Nombre VARCHAR (50) NOT NULL, 
	IdTipoPersonaFk INT (11), 
	IdMunicipioFk INT (11),
	FOREIGN KEY (IdTipoPersonaFk) REFERENCES tipo_persona(Id),
	FOREIGN KEY (IdMunicipioFk) REFERENCES municipio(Id),
    PRIMARY KEY (Id));

CREATE TABLE forma_pago(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR (50) NOT NULL,
    PRIMARY KEY (Id));

CREATE TABLE venta(
    Id INT(11) NOT NULL AUTO_INCREMENT, 
	Fecha DATE,
	IdEmpleadoFk INT (11), 
	IdClienteFk INT (11), 
	IdFormaPagoFk INT (11),
	FOREIGN KEY (IdEmpleadoFk) REFERENCES empleado(Id),
	FOREIGN KEY (IdClienteFk) REFERENCES cliente(Id),
	FOREIGN KEY (IdFormaPagoFk) REFERENCES forma_pago(Id),
    PRIMARY KEY (Id));

CREATE TABLE tipo_estado(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    Descripcion VARCHAR (50) NOT NULL,
    PRIMARY KEY (Id));

CREATE TABLE estado(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR (50) NOT NULL, 
	IdTipoEstadoFk INT (11),
	FOREIGN KEY (IdTipoEstadoFk) REFERENCES tipo_estado(Id),
    PRIMARY KEY (Id));

CREATE TABLE orden(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    fecha DATE, 
	IdEmpleadoFk INT (11), 
	IdClienteFk INT (11), 
	IdEstadoFk INT (11),
	FOREIGN KEY (IdEmpleadoFk) REFERENCES empleado(Id), 
	FOREIGN KEY (IdClienteFk) REFERENCES cliente(Id), 
	FOREIGN KEY (IdEstadoFk) REFERENCES estado(Id),
	PRIMARY KEY (Id));

CREATE TABLE genero(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR (50) NOT NULL,
    PRIMARY KEY (Id));

CREATE TABLE tipo_proteccion(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    Descripcion VARCHAR (50) NOT NULL,
    PRIMARY KEY (Id));

CREATE TABLE talla(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR (50) NOT NULL,
    PRIMARY KEY (Id));

CREATE TABLE color(
    Id INT(11) NOT NULL AUTO_INCREMENT,
    Descripcion VARCHAR (255) NOT NULL,
    PRIMARY KEY (Id));

CREATE TABLE insumo(
	Id INT(11) NOT NULL AUTO_INCREMENT, 
	nombre VARCHAR(50), 
	valor_unit DOUBLE, 
	stock_min DOUBLE, 
	stock_max DOUBLE, 
	PRIMARY KEY (Id));

CREATE TABLE insumo_proveedor(
    IdInsumoFk INT(11) ,
    IdProveedorFk INT(11) , 
	FOREIGN KEY (IdInsumoFk) REFERENCES insumo(Id),
	FOREIGN KEY (IdProveedorFk ) REFERENCES proveedor(Id));

CREATE TABLE prenda(
	Id INT(11) NOT NULL AUTO_INCREMENT, 
	Nombre VARCHAR(50), 
	ValorUnitCop DOUBLE, 
	ValorUnitUsd DOUBLE,
	IdEstadoFk INT(11) ,
    IdTipoProteccion INT(11) , 
	IdGeneroFk INT (11), 
	Codigo VARCHAR (50), 
	PRIMARY KEY (Id),
	FOREIGN KEY (IdEstadoFk) REFERENCES estado(Id), 
	FOREIGN KEY (IdTipoProteccion) REFERENCES tipo_proteccion(Id),
	FOREIGN KEY (IdGeneroFk ) REFERENCES genero(Id));

CREATE TABLE insumo_prendas(
    IdInsumoFk INT(11) ,
    IdPrendaFk INT(11) , 
	Cantidad INT (11), 
	FOREIGN KEY (IdInsumoFk) REFERENCES insumo(Id),
	FOREIGN KEY (IdPrendaFk ) REFERENCES prenda(Id));

CREATE TABLE inventario(
	Id INT(11) NOT NULL AUTO_INCREMENT, 
	CodInv VARCHAR(50), 
	IdPrendaFk INT(11) ,
	ValorVtaCop DOUBLE, 
	ValorVtaUsd DOUBLE, 
	PRIMARY KEY (Id),
	FOREIGN KEY (IdPrendaFk ) REFERENCES prenda(Id));



CREATE TABLE inventario_talla(
    IdInvFk INT(11) ,
    IdTallaFk INT(11) , 
	FOREIGN KEY (IdInvFk) REFERENCES inventario(Id),
	FOREIGN KEY (IdTallaFk ) REFERENCES talla(Id));

CREATE TABLE detalle_venta(
	Id INT(11) NOT NULL AUTO_INCREMENT, 
	IdVentaFk INT(11) , 
	IdProductoFk INT(11) , 
	IdTallaFk INT(11) ,
	cantidad INT (11), 
	valor_unit DOUBLE, 
	PRIMARY KEY (Id),
	FOREIGN KEY (IdProductoFk ) REFERENCES inventario(Id), 
	FOREIGN KEY (IdVentaFk ) REFERENCES venta(Id), 
	FOREIGN KEY (IdTallaFk ) REFERENCES talla(Id));



CREATE TABLE detalle_orden(
	Id INT(11) NOT NULL AUTO_INCREMENT, 
	IdOrdenFk INT(11) , 
	IdPrendaFk INT(11) , 
	PrendaId INT (11), 	
	cantidad_producir INT (11), 
	IdColorFk INT(11) , 
	cantidad_producida INT (11), 
	IdEstadoFk INT (11), 
	PRIMARY KEY (Id),
	FOREIGN KEY (IdOrdenFk ) REFERENCES orden(Id), 
	FOREIGN KEY (IdPrendaFk ) REFERENCES prenda(Id), 
	FOREIGN KEY (IdColorFk ) REFERENCES color(Id), 
	FOREIGN KEY (IdEstadoFk ) REFERENCES estado(Id));