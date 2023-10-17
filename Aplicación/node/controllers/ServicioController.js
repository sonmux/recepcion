//* importamos el modelo
import DispServModel from "../models/DispServ.js";
import ServicioModel from "../models/ServicioModel.js";
//* importar la conexión de la db
import db from '../database/db.js';
import ServiciosModel from "../models/ServiciosModel.js";

//* Metodo para el CRUD de los servicios
//! Crear un servicio
export const createServ = async (req,res) => {
    try {
        await ServicioModel.create(req.body)
        res.json({
            "auth":true,
            "message": "servicio creado"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
} 

//* Metodo para el CRUD de servicios
//! Obtener todos los servicios
export const getAllServ = async (req, res) => {
    try {
        const servicios = await ServicioModel.findAll()
        res.json({
            auth: true,
            servicios: servicios
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}


//* Metodo paraasignar un servicio a un dispositivo
//! Incertar servicio y dispositivo en tabla dispServ
export const createServDisp = async (req, res) => {
    try {
        await DispServModel.create(req.body)
        res.json({
            auth:true,
            message: "Servicio asignado a dispositivo"
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}

//* Metodo para obtener los servicios dados a un dispositivo
//! obtener servicios de un dispositivo
export const getServ = async (req, res) => {
    try {
        const servicios = await db.query(`select ds.id, s.servicio, s.descripcion, s.precio from dispServs as ds
        inner join servicios s on ds.servId = s.id
        where ds.dispId = ${req.params.id}`)
        res.json({
            auth: true,
            servicios: servicios[0]
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}