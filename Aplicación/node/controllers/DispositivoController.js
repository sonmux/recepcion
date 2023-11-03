//* importamos el Modelo
import DispositivoModel from "../models/DispositivoModel.js"
//* importar la conexión de la db
import db from '../database/db.js';
//? comparadores logicos en sequelize
import {Op} from "sequelize";

//* Metodo para el CRUD de dispositivos

//! Mostrar todos los registros de dispositivos
export const getAllDisp = async (req, res) => {
    try {
        const disp = await DispositivoModel.findAll()
        res.json(disp)
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Mostrar todos los registros de dispositivos de un cliente
export const getAllDispUsr = async (req, res) => {
    try {
        const disp = await DispositivoModel.findAll({
            where:{
                idCliente:parseInt(req.query.id),
                numOrden:req.query.orden
            }
        })
        res.json(
            {
                auth: true,
                disp: disp
            })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Mostrar todos los registros asignados a un tecnico
export const getAllTask = async (req, res) => {
    try {
        if(req.query.sesion == 'adm'){
            const disp = await db.query(`SELECT * FROM dispositivoPs where estado!='Terminado' and estado!='Entregado';`)
            res.json(
                {
                    auth: true,
                    disp: disp[0]
                })
        }else{
            const disp = await db.query(`call misTrabajos(${req.query.usuario});`)
            res.json(
                {
                    auth: true,
                    disp: disp
                })
        }
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Mostrar todos los registros de dispositivos terminados
export const getAllDisEnd = async (req, res) => {
    try {
        const disp = await DispositivoModel.findAll({
            where:{
                estado: 'Terminado'
            }
        })
        res.json(
            {
                auth: true,
                disp: disp
            })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Mostrar solo un registro dispositivo
export const getDisp = async (req, res) => {
    try {
        const disp = await DispositivoModel.findAll({
            where:{id:req.params.id}
        })
        res.json(disp[0])
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Crear un registro dispositivo
export const createDisp = async (req, res) => {
    try {
        await DispositivoModel.create(req.body)
        res.json({
            "auth":true,
            "message":"Dispositivo Ingresada"
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Actualizar un registro dispositivo
export const updateDisp = async (req, res) => {
    try {
        await DispositivoModel.update(req.body,{
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

//! Eliminar un registro dispositivo
export const deleteDisp = async (req, res) => {
    try {
        await DispositivoModel.destroy({
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