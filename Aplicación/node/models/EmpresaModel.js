//* Importar la conexión de la db
import db from '../database/db.js';

//* Importar sequelize
import { DataTypes } from "sequelize";

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas, en la db, deben estar escritas en plural
const EmpModel = db.define('emprs',{
    nombre:{type: DataTypes.STRING},
    direccion:{type: DataTypes.STRING},
    telefono:{type: DataTypes.STRING},
    correo:{type: DataTypes.STRING},
    regMercantil:{type: DataTypes.STRING},
    nit:{type: DataTypes.STRING},
})

export default EmpModel