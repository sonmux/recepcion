//* importamos el Modelo
import BlogModel from "../models/BlogModel.js";

//* Metodo para el CRUD de computadora

//! Mostrar todos los registros de computadoras
export const getAllCompu = async (req, res) => {
    try {
        const compus = await BlogModel.findAll()
        res.json(compus)
    } catch (error) {
        res.json({
            "auth":false,
            "hola":"hola",
            message: error.message
        })
    }
}

//! Mostrar sol un registro computadora
export const getCompu = async (req, res) => {
    try {
        const compu = await BlogModel.findAll({
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
        await BlogModel.create(req.body)
        res.json({
            "auth":true,
            "mesage":"Orden creada!"
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
        await BlogModel.update(req.body,{
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
        await BlogModel.destroy({
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