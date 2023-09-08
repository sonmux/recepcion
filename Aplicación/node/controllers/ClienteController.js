//* importamos el modelo
import ClienteModel from "../models/ClienteModel.js";

//* Metodo para el CRUD de clientes

//! Mostrar todos los registros de clientes
export const getAllCliente = async (req, res) => {
    try {
        const clientes = await ClienteModel.findAll()
        res.json(clientes)
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Mostrar solo un registro de cliente
export const getCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.findAll({
            where:{id:req.params.id}
        })
        res.json(cliente[0])
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Crear un registro cliente
export const createCliente = async (req, res) => {
    try {
        await ClienteModel.create(req.body)
        res.json({
            "auth":true,
            "message":"Cliente ingresado"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message:error.message
        })
    }
}

//! Actualizar datos cliente
export const updateCliente = async (req, res) => {
    try {
        await ClienteModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({
            "auth":true,
            "message":"Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message:error.message
        })
    }
}

//! eliminar un registro cliente
export const deleteCliente = async (req,res) => {
    try {
        await ClienteModel.destroy({
            where:{id:req.params.id}
        })
        res.json({
            "auth":true,
            "message":"Registro eliminado correctamente"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message:error.message
        })
    }
}