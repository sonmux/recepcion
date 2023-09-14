//* importamos el modelo
import AcuerdoModel from "../models/AcuerdoModel.js";

//* Metodo para el CRUD de acuerdo

//! Mostrar solo un registro de acuerdo
export const getAcuerdo = async (req, res) => {
    try {
        const acuerdo = await AcuerdoModel.findAll({
            where:{idCliente:req.params.id}
        })
        res.json(acuerdo[0])
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Crear un registro acuerdo
export const createAcuerdo = async (req, res) => {
    try {
        await AcuerdoModel.create(req.body)
        res.json({
            "auth":true,
            "message":"Acuerdo Firmado"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message:error.message
        })
    }
}