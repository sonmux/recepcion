//* importamos el modelo
import TiposModel from "../models/TiposModel.js";

//* Metodo para el CRUD del inventario

//! Mostrar todos los registros de la tabla tipo
export const getAllTipos = async (req, res) => {
    try {
        const tipos = await TiposModel.findAll()
        res.json({
            auth: true,
            inventario: tipos
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}

//! Crear un registro en la tabla tipo
export const createTipo = async (req, res) => {
    try {
        await TiposModel.create(req.body)
        res.json({
            auth:true,
            message: "Tipo ingresado al inventario"
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}

//! Actualizar un registro de la tabla tipo
export const updateTipo = async (req, res) => {
    try {
        await TiposModel.update(req.body, {
            where:{id:req.params.id}
        })
        res.json({
            auth: true,
            message: "Tipo actualizado correctamente"
        })
    } catch (error) {
        res.json({
            auth: false,
            message: error.message
        })
    }
}

//! Eliminar un registro de la tabla tipo
export const deleteTipo = async (req, res) => {
    try {
        await TiposModel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            auth: true,
            message: 'Tipo eliminado correctamente'
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}