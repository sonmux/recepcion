create database recepcion;
use recepcion;

create table cliente(
	id varchar(250) primary key not null,
    nombreCliente varchar(250) not null,
    direcciónCliente varchar(250) not null,
    telefono int not null,
    correo varchar(250) not null,
    nit int not null,
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


create table computadoraPs(
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
    createdAt date,
    updatedAt date
);

insert into computadoraPs (marca,modelo,serie,color,capacidadDisco,serieDisco,sistemaOperativo,contraseñaDispositivo,foto1,foto2,foto3,foto4,idCliente)
values ("marca1","modelo1","serie1","color1",250,"serieDisk1","sistema1","contra1","foto1","foto2","foto3","foto4","idcliente1");
insert into computadoraPs (marca,modelo,serie,color,capacidadDisco,serieDisco,sistemaOperativo,contraseñaDispositivo,foto1,foto2,foto3,foto4,idCliente)
values ("marca2","modelo2","serie2","color2",150,"serieDisk2","sistema2","contra2","foto1","foto2","foto3","foto4","idcliente2");
select*from computadoraPs;

drop table computadoraPs;


create table movilPs(
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
    createdAt date,
    updatedAt date
);

insert into movilPs(marca, modelo, imei, serie, color, foto1, foto2, foto3, idCliente)
values ("marca1","modelo1", "imei1", "serie1", "color1", "foto1", "foto2", "foto3", "cliente1");

select*from movilPs;

drop table movilPs;



