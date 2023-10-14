//* Importar la conexión de la db
import db from '../database/db.js'

//* Importar sequelize
import { DataTypes } from "sequelize";

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas, en la db, deben estar escritas en plural
const ClienteModel = db.define('clientePs',{
    // AUTO INCREMENT id: {type: DataTypes.INTEGER},
    nombreCliente: {type: DataTypes.STRING},
    direcciónCliente: {type: DataTypes.STRING},
    telefono: {type: DataTypes.STRING},
    correo: {type: DataTypes.STRING},
    nit: {type: DataTypes.INTEGER},
    dpiFrontal: {type: DataTypes.STRING},
    dpiReverso: {type: DataTypes.STRING},
})

export default ClienteModel