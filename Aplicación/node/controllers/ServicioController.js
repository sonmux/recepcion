//* importamos el modelo
import ServicioModel from "../models/ServicioModel.js";

//* Metodo para el CRUD de los servicios
//! Crear un servicio
export const createServ = async (req,res) => {
    try {
        await ServicioModel.create(req.body)
        res.json({
            "auth":true,
            "message": "Log creado"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
} 