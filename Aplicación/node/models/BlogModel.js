//* Importar la conexión de la db
import db from '../database/db.js';

//* Importar sequelize
import { DataTypes } from "sequelize";

//! en define colocamos el nombre de nuestra tabla
const BlogModel = db.define('computadoraPs',{
    // AUTO INCREMENT id: {type: DataTypes.INTEGER},
    marca: {type: DataTypes.STRING},
    modelo: {type: DataTypes.STRING},
    serie: {type: DataTypes.STRING},
    color: {type: DataTypes.STRING},
    capacidadDisco: {type: DataTypes.INTEGER},
    serieDisco: {type: DataTypes.STRING},
    sistemaOperativo: {type: DataTypes.STRING},
    contraseñaDispositivo: {type: DataTypes.STRING},
    foto1: {type: DataTypes.STRING},
    foto2: {type: DataTypes.STRING},
    foto3: {type: DataTypes.STRING},
    foto4: {type: DataTypes.STRING},
    idCliente: {type: DataTypes.STRING},
})

export default BlogModel