//* importar la conexión de la db
import db from '../database/db.js';

//* importar sequelize
import { DataTypes } from "sequelize";

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas, en la db, deben estar escritas en plural
const ServiciosModel = db.define('dispServs',{
    // AUTO INCREMENT id: {type: DataTypes.INTEGER},
    servicio: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
    precio: {type: DataTypes.INTEGER},
})

export default ServiciosModel