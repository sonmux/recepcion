create database recepcion;
use recepcion;

create table cliente(
	id varchar(250) primary key not null,
    nombreCliente varchar(250) not null,
    direcciónCliente varchar(250) not null,
    telefono int not null,
    correo varchar(250) not null,
    nit int not null,
    peritoAsignado int default 0,
    dpiFrontal varchar(250) not null,
    dpiReverso varchar(250) not null
);

/*create table dispositivo(
	id int primary key auto_increment,
    tipo varchar(259) not null
);
insert into dispositivo (tipo) values ("computadora");
insert into dispositivo (tipo) values ("dispositivo móvil");*/

create table computadora(
	id int primary key auto_increment,
    marca varchar(250) not null,
    modelo varchar(250) not null,
    serie varchar(250) not null,
    color varchar(250) not null,
    capacidadDisco int not null,
    serieDisco varchar(250) not null,
    sistemaOperativo varchar(250) not null,
    contraseñaDispositivo varchar(250) not null,
    foto1 varchar(250) not null,
    foto2 varchar(250) not null,
    foto3 varchar(250) not null,
    foto4 varchar(250) not null,
    idCliente varchar(250) not null,
    foreign key (idCliente) references cliente(id)
);

create table movil(
	id int primary key auto_increment,
    marca varchar(250) not null,
    modelo varchar(250) not null,
    imei varchar(250) not null,
    serie varchar(250) not null,
    color varchar(250) not null,
    foto1 varchar(250) not null,
    foto2 varchar(250) not null,
    foto3 varchar(250) not null,
    idCliente varchar(250) not null,
    foreign key (idCliente) references cliente(id)
);

create table acuerdo(
	id int primary key auto_increment,
    acuerdo varchar(250) not null,
    idCliente varchar(250) not null,
    foreign key (idCliente) references cliente(id)
);


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


create table computadoraPs(
	id int primary key auto_increment,
    marca varchar(250) ,
    modelo varchar(250),
    serie varchar(250) ,
    color varchar(250) ,
    capacidadDisco int,
    serieDisco varchar(250),
    sistemaOperativo varchar(250),
    contraseñaDispositivo varchar(250) ,
    foto1 longtext ,
    foto2 longtext,
    foto3 longtext,
    foto4 longtext,
    idCliente varchar(250) ,
    createdAt date,
    updatedAt date
);

insert into computadoraPs (marca,modelo,serie,color,capacidadDisco,serieDisco,sistemaOperativo,contraseñaDispositivo,foto1,foto2,foto3,foto4,idCliente)
values ("marca1","modelo1","serie1","color1",250,"serieDisk1","sistema1","contra1","foto1","foto2","foto3","foto4","idcliente1");
insert into computadoraPs (marca,modelo,serie,color,capacidadDisco,serieDisco,sistemaOperativo,contraseñaDispositivo,foto1,foto2,foto3,foto4,idCliente)
values ("marca2","modelo2","serie2","color2",150,"serieDisk2","sistema2","contra2","foto1","foto2","foto3","foto4","idcliente2");
select * from computadoraPs;

drop table computadoraPs;


create table movilPs(
	id int primary key auto_increment,
    marca varchar(250) not null,
    modelo varchar(250) not null,
    imei varchar(250) not null,
    serie varchar(250) not null,
    color varchar(250) not null,
    foto1 longtext,
    foto2 longtext,
    foto3 longtext,
    idCliente varchar(250) not null,
    createdAt date,
    updatedAt date
);

insert into movilPs(marca, modelo, imei, serie, color, foto1, foto2, foto3, idCliente)
values ("marca1","modelo1", "imei1", "serie1", "color1", "foto1", "foto2", "foto3", "cliente1");
select*from movilPs;

drop table movilPs;

create table clientePs(
	id varchar(250),
    nombreCliente varchar(250),
    direcciónCliente varchar(250),
    telefono int,
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

create table usuarioPs(
	correo varchar(250) primary key,
    nombre varchar(250),
    telefono int,
    usuario varchar(20),
    pass varchar(20),
    createdAt date,
    updatedAt date
);
insert into usuarioPs(correo,nombre,telefono,usuario,pass) values ('prueba@prueba.com','usuarioPrueba',12345678,'admin','admin123');
drop table usuarioPs;
SELECT `correo`, `nombre`, `telefono`, `usuario`, `pass`, `createdAt`, `updatedAt` FROM `usuarioPs` AS `usuarioPs` WHERE `usuarioPs`.`usuario` = 'admin' AND `usuarioPs`.`pass` = 'admin123';

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
    estado text default 'Ingresado', -- (agregar campo estado)
    idCliente varchar(250),
    createdAt date,
    updatedAt date
);
insert into dispositivoPs (tipo,marca,modelo,serie,color,capacidadDisco,serieDisco,sistemaOperativo,imei,contraseñaDispositivo,foto1,foto2,foto3,foto4,idCliente)
values ("computadora","marca1","modelo1","serie1","color1",250,"serieDisk1","sistema1","imei1","contra1","foto1","foto2","foto3","foto4","idcliente1");
select*from dispositivoPs;
drop table dispositivoPs;

create table servicioPs(
	id int, -- PK autoIncrement
    nombre varchar(250),
    descripcion varchar(250),
    precio int,
    createdAt date,
    updatedAt date
);
drop table servicioPs;
insert into servicioPs (nombre, descripcion, precio) values ('Analisis forense en móvil','Ánalisis forense de dispositivos móviles',0);
insert into servicioPs (nombre, descripcion, precio) values ('Analisis forense en computadora','Ánalisis forense de computadora',0);

create table registroPs(
	id int primary key auto_increment, -- primary key auto increment
	usuario varchar(250),
    tema varchar(250),
    descripcion varchar(250),
    createdAt date,
    updatedAt date
);
select * from registroPs;
drop table registroPs;



