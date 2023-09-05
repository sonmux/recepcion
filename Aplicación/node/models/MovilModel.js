//* importar la conexión de la db
import db from '../database/db.js';

//* importar sequelize
import { DataTypes } from "sequelize";

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas en la db deben estar escritas en plural
const MovilModel = db.define('movilPs',{
    // AUTO INCREMENT id: {type: DataTypes.INTEGER},
    marca: {type: DataTypes.STRING},
    modelo: {type: DataTypes.STRING},
    imei: {type: DataTypes.STRING},
    serie: {type: DataTypes.STRING},
    color: {type: DataTypes.STRING},
    foto1: {type: DataTypes.STRING},
    foto2: {type: DataTypes.STRING},
    foto3: {type: DataTypes.STRING},
    idCliente: {type: DataTypes.STRING},
})

export default MovilModel