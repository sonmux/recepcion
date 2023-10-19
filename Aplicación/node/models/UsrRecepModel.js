//* Importar la conexión de la db
import db from '../database/db.js'

//* Importar sequelize
import { DataTypes } from "sequelize";

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas, en la db, deben estar escritas en plural
const UsrRecepModel = db.define('usrreceps',{
    correo: {type: DataTypes.STRING, primaryKey: true}, //Primary key
    nombre: {type: DataTypes.STRING},
    telefono: {type: DataTypes.INTEGER},
    usuario: {type: DataTypes.STRING},
    pass: {type: DataTypes.INTEGER},
})

export default UsrRecepModel