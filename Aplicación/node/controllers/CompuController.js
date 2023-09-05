//* importamos el Modelo
import CompuModel from "../models/CompuModel.js";

//* Metodo para el CRUD de computadora

//! Mostrar todos los registros de computadoras
export const getAllCompu = async (req, res) => {
    try {
        const compus = await CompuModel.findAll()
        res.json(compus)
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Mostrar solo un registro computadora
export const getCompu = async (req, res) => {
    try {
        const compu = await CompuModel.findAll({
            where:{id:req.params.id}
        })
        res.json(compu[0])
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Crear un registro computadora
export const createCompu = async (req, res) => {
    try {
        await CompuModel.create(req.body)
        res.json({
            "auth":true,
            "message":"Computadora Ingresada"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Actualizar un registro computadora
export const updateCompu = async (req, res) => {
    try {
        await CompuModel.update(req.body,{
            where:{id: req.params.id}
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

//! Eliminar un registro computadora
export const deleteCompu = async (req, res) => {
    try {
        await CompuModel.destroy({
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