//* importamos el modelo
import DispServModel from "../models/DispServ.js";
import ServicioModel from "../models/ServicioModel.js";
//* importar la conexión de la db
import db from '../database/db.js';
import regServicioModel from "../models/RegistroServicioModel.js";

//* Metodo para el CRUD de los servicios
//! Crear un servicio
export const createServ = async (req,res) => {
    try {
        await regServicioModel.create(req.body)
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
        const servicios = await regServicioModel.findAll()
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

//* Metodo para obtener los servicios dados a un dispositivo
//! obtener servicios de un dispositivo
export const getServ = async (req, res) => {
    try {
        const servicios = await db.query(`select id, servicio, descripcion, precio from regServicios
        where disp = ${req.params.id}`)
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