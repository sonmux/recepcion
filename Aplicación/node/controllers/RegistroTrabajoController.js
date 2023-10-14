//* importamos el Modelo
import RegistroTrabajoModel from "../models/RegistroTrabajoModel.js";
//* importar la conexión de la db
import db from '../database/db.js';
//? comparadores logicos en sequelize
import {Op} from "sequelize";

//* Metodo para el CRUD del historial de trabajo
//! Crear un registro en el historial
export const createRegTrabajo = async (req, res) => {
    try {
        await RegistroTrabajoModel.create(req.body)
        res.json({
            "auth":true,
            "message":"Historial de trabajo ingresado"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Mostrar el registro de trabajo de un tecnico
export const getRegTec = async (req,res) => {
    console.log(req.query)
    try {
        const reg = await RegistroTrabajoModel.findAll({
            where:{
                perito: req.query.tec,
                dispositivoId: req.query.disp
            }
        })
        res.json({
            auth:true,
            registro: reg
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}