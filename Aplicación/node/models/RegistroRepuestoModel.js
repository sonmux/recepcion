//* Importar la conexión de la db
import db from '../database/db.js'

//* Importar sequelize
import { DataTypes } from "sequelize";

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas, en la db, deben estar escritas en plural
const RegistroRepuestoModel = db.define('registroRepuestos',{
    perito: {type: DataTypes.STRING},
    dispositivoId: {type: DataTypes.INTEGER},
    inventarioId: {type: DataTypes.INTEGER},
    cantidad: {type: DataTypes.INTEGER}
})

export default RegistroRepuestoModel