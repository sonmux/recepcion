create database recepcion;
use recepcion;
drop database recepcion;

create table registroPs( -- HISTORIAL DE ACCIONES EN EL SISTEMA
	id int primary key auto_increment, -- primary key auto increment
	usuario varchar(250),
    tema varchar(250),
    descripcion varchar(250),
    createdAt date,
    updatedAt date
);
select * from registroPs;
drop table registroPs;

create table usuarioPs(
	correo varchar(250) primary key,
    nombre varchar(250),
    telefono int,
    usuario varchar(20),
    pass varchar(20),
    numPerito int default 0,
    createdAt date,
    updatedAt date
);
select*from usuarioPs;
insert into usuarioPs(correo,nombre,telefono,usuario,pass) values ('prueba@prueba.com','usuarioPrueba',12345678,'admin','admin123');
insert into usuarioPs(correo,nombre,telefono,usuario,pass,numPerito) values ('prueba1@prueba.com','tecnico1',12345678,'tec1','tec1',1);
insert into usuarioPs(correo,nombre,telefono,usuario,pass,numPerito) values ('prueba2@prueba.com','tecnico2',12345678,'tec2','tec2',2);
insert into usuarioPs(correo,nombre,telefono,usuario,pass,numPerito) values ('prueba3@prueba.com','tecnico3',12345678,'tec3','tec3',3);
drop table usuarioPs;

create table clientePs(
	id varchar(250) primary key,
    nombreCliente varchar(250),
    direcciónCliente varchar(250),
    telefono varchar(250),
    correo varchar(250),
    nit int,
    peritoAsignado int default 0,
    dpiFrontal longtext,
    dpiReverso longtext,
    createdAt date,
    updatedAt date
);
select * from clienteps;
drop table clientePs;
update clienteps set correo='son.anggelo@gmail.com' where nombreCliente='anggelo';

create table dispositivoPs(
	id int primary key auto_increment,
    numOrden varchar(250), -- Codigo LEFCI+FECHA_ACTUAL+HORA
    tipo varchar(250),
    marca varchar(250) ,
    modelo varchar(250),
    serie varchar(250) ,
    color varchar(250) ,
    capacidadDisco int,
    serieDisco varchar(250),
    sistemaOperativo varchar(250),
    imei varchar(250),
    contraseñaDispositivo varchar(250) ,
    descripcion text, -- (agregar campo descripcion)
    solicitud text, -- (agregar campo solicitud)
    foto1 longtext,
    foto2 longtext,
    foto3 longtext,
    foto4 longtext,
    peritoAsignado int default 0, -- (agregar campo estado)
    estado text default('Ingresado'), -- (agregar campo estado)
    idCliente varchar(250),
    createdAt date,
    updatedAt date
);
insert into dispositivoPs (tipo,marca,modelo,serie,color,capacidadDisco,serieDisco,sistemaOperativo,imei,contraseñaDispositivo,foto1,foto2,foto3,foto4,idCliente)
values ("computadora","marca1","modelo1","serie1","color1",250,"serieDisk1","sistema1","imei1","contra1","foto1","foto2","foto3","foto4","idcliente1");
select*from dispositivoPs;
drop table dispositivoPs;

create table acuerdoPs(
	id int primary key auto_increment, -- DPI_USUARIO (cambiar tipo int, local storage, ya no es auto_increment)
    acuerdo longtext,
    idCliente varchar(250),
    numOrden varchar(250),
    estadoFirma int,
    createdAt date,
    updatedAt date
);
select * from acuerdops;
drop table acuerdoPs;


/* ************************************
***************************************
********* SECCIÓN DE INVENTARIO *******
***************************************
************************************* */

create table tipos(
	id int primary key auto_increment,
    tipo varchar(250),
    createdAt date,
    updatedAt date
);
select*from tipos;
insert into tipos(tipo) values ('usb');
insert into tipos(tipo) values ('disco duro');
insert into tipos(tipo) values ('pantalla');
drop table tipos;

create table inventarios(
	id int primary key auto_increment,
    tipo int,
    descripcion varchar(250),
    serie varchar(250),
    marca varchar(250),
    modelo varchar(250),
    cantidad int,
    createdAt date,
    updatedAt date
);
select*from inventarios;
insert into inventarios (tipo, descripcion, serie, marca, modelo, cantidad)values (2,'External HDD','1N0321615484','ADATA','HD680',13);
insert into inventarios (tipo, descripcion, serie, marca, modelo, cantidad)values (1,'Disco','1N0321615484','ADATA','HD680',13);
insert into inventarios (tipo, descripcion, serie, marca, modelo, cantidad)values (3,'USB','1N0321615484','ADATA','HD680',13);
drop table inventarios;

/* ************************************
***************************************
********* SECCIÓN DE TECNICO *******
***************************************
************************************* */

create table registroTrabajos (
	id int primary key auto_increment,
    perito varchar(250),
    dispositivoId int,
    historial varchar(800),
    createdAt date,
    updatedAt date
);
select*from registroTrabajos;
drop table registroTrabajos;

DELIMITER $$
DROP PROCEDURE IF EXISTS misTrabajos$$
CREATE PROCEDURE misTrabajos(
	IN perito varchar(250)
)
BEGIN
	DECLARE numP INT;
	SET numP = (select numPerito from usuarioPs where correo = perito);
	SELECT * FROM dispositivoPs where peritoAsignado = numP and estado!='Terminado';
END
$$
call misTrabajos("prueba1@prueba.com");

create table registroRepuestos(
	id int primary key auto_increment,
    perito varchar(250),
    dispositivoId int,
    inventarioId int,
    cantidad int,
    createdAt date,
    updatedAt date
);
select*from registroRepuestos;
drop table registroRepuestos;

DELIMITER $$
DROP PROCEDURE IF EXISTS regRepInv$$
CREATE PROCEDURE regRepInv(
	IN invId int,
	IN cant int
)
BEGIN
	DECLARE numDisp INT;
	SET numDisp = (select cantidad from inventarios where id=invId);
    SET numDisp = numDisp-cant;
	UPDATE inventarios SET cantidad = numDisp WHERE id=invId;
END
$$
call regRepInv(2,3);

select t.tipo,i.descripcion,i.serie,r.cantidad,r.createdAt from registroRepuestos r
inner join inventarios i on r.inventarioId = i.id
inner join tipos t on i.tipo = t.id
where r.dispositivoId = 1;

/* ************************************
***************************************
********* SECCIÓN DE ENTREGA *******
***************************************
************************************* */

create table servicios(
	id int primary key auto_increment,
    servicio varchar(250),
    descripcion varchar(250),
    precio int,
    createdAt date,
    updatedAt date
);
select*from servicios;
drop table servicios;
insert into servicios(servicio, descripcion, precio) values ('extracción de imagenes', 'se extrajeron las imagenes', 300);
insert into servicios(servicio, descripcion, precio) values ('extracción de mensajes', 'se extrajeron los mensajes', 200);
insert into servicios(servicio, descripcion, precio) values ('extracción de documentos', 'se extrajeron los documentos', 300);
insert into servicios(servicio, descripcion, precio) values ('Borrado seguro', 'se eliminó toda la información del dispositivo', 500);

create table dispServs(
	id int primary key auto_increment,
    dispId int,
    servId int,
    createdAt date,
    updatedAt date
);
select*from dispServs;
drop table dispServs;

select ds.id, s.servicio, s.descripcion, s.precio from dispServs as ds
inner join servicios s on ds.servId = s.id
where ds.dispId = 2
