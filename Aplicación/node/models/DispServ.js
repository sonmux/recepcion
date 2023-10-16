//* importar la conexión de la db
import db from '../database/db.js';

//* importar sequelize
import { DataTypes } from "sequelize";

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas, en la db, deben estar escritas en plural
const DispServModel = db.define('dispServs',{
    // AUTO INCREMENT id: {type: DataTypes.INTEGER},
    dispId: {type: DataTypes.STRING},
    servId: {type: DataTypes.STRING},
})

export default DispServModel