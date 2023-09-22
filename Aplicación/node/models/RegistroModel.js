//* Importar la conexión de la db
import db from '../database/db.js'

//* Importar sequelize
import { DataTypes } from "sequelize";

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas, en la db, deben estar escritas en plural
const RegistroModel = db.define('registroPs',{
    // AUTO INCREMENT id: {type: DataTypes.INTEGER},
    usuario: {type: DataTypes.STRING},
    tema: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
})

export default RegistroModel