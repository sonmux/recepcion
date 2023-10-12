//* importar la conexión de la db
import db from '../database/db.js';

//* importar sequelize
import { DataTypes } from "sequelize";
//import TiposModel from './TiposModel.js';

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas, en la db, deben estar escritas en plural
const InventarioModel = db.define('inventarios',{
    // AUTO INCREMENT id: {type: DataTypes.INTEGER},
    tipo: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
    serie: {type: DataTypes.STRING},
    marca: {type: DataTypes.STRING},
    modelo: {type: DataTypes.STRING},
    cantidad: {type: DataTypes.INTEGER},
})

//InventarioModel.belongsTo(TiposModel, { foreignKey: 'xid' });

export default InventarioModel