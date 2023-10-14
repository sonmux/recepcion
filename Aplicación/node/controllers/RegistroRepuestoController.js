//* importamos el Modelo
import RegistroRepuestoModel from "../models/RegistroRepuestoModel.js";
//* importar la conexión de la db
import db from '../database/db.js';
//? comparadores logicos en sequelize
import {Op} from "sequelize";
import InventarioModel from "../models/InventarioModel.js";



//* Metodo para el CRUD del historial de repuestos usados
//! Crear un registro en el historial
export const createRegRepuesto = async (req,res) => {
    try {
        await RegistroRepuestoModel.create(req.body)
        //? procedimiento almacenado para actualizar la cantidad disponible en el inventario
        await db.query(`call regRepInv(${req.body.inventarioId},${req.body.cantidad});`)
        res.json({
            auth:true,
            "message":"Historial de repuestos ingresado"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//* Metodo para obtener los repuestos utilizados en un dispositivo
//! Obtener todos los repuestos usados en un dispositivo
export const getRegRepuesto = async (req, res) => {
    try {
        const rep = await db.query(`select t.tipo,i.descripcion,i.serie,r.cantidad,r.createdAt from registroRepuestos r
        inner join inventarios i on r.inventarioId = i.id
        inner join tipos t on i.tipo = t.id
        where r.dispositivoId = ${req.params.id};`)
        res.json({
            auth:true,
            repuestos: rep[0]
        })
    } catch (error) {
        
    }
}