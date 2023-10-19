//* Importar la conexión de la db
import db from '../database/db.js';

//* Importar sequelize
import { DataTypes } from "sequelize";

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas, en la db, deben estar escritas en plural
const DBModel = db.define('cuents',{
    banco:{type: DataTypes.STRING},
    numero:{type: DataTypes.BIGINT},
})

export default DBModel