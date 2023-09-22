//* importamos el modelo
import RegistroModel from "../models/RegistroModel.js";

//* Metodo para el CRUD de logs en el servidor
//! Crear un log
export const createLog = async (req, res) => {
    try {
        await RegistroModel.create(req.body)
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