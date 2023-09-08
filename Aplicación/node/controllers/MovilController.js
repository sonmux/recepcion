//* importamos el modelo
import MovilModel from "../models/MovilModel.js";

//* Metodo para el CRUD de dispositivos Moviles

//! Mostrar todos los registros de moviles
export const getAllMovil = async (req, res) => {
    try {
        const movils = await MovilModel.findAll()
        res.json(movils)
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Mostrar solo un registro movil
export const getMovil = async (req, res) => {
    try {
        const movil = await MovilModel.findAll({
            where:{id:req.params.id}
        })
        res.json(movil[0])
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Crear un registro dispositivo movil
export const createMovil = async (req, res) => {
    try {
        await MovilModel.create(req.body)
        res.json({
            "auth":true,
            "message": "Dispositivo Movil Ingresado"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Actualizar un registro dispositivo movil
export const updateMovil = async (req, res) => {
    try {
        await MovilModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({
            "auth":true,
            "message":"Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Eliminar un registro dispositivo movil
export const deleteMovil = async (req, res) => {
    try {
        await MovilModel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "auth":true,
            "message":"Registro eliminado correctamente"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}