//* importamos el Modelo
import DBModel from "../models/DBModel.js";
import EmpModel from "../models/EmpresaModel.js";

//* Metodo para el CRUD de empresa
//! Mostrar todos los datos
export const getData = async (req, res) => {
    try {
        const data = await EmpModel.findAll()
        res.json({
            auth:true,
            dato:data[0]
        })
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}

//! Actualizar datos de la empresa
export const updateEmp = async (req,res) => {
    try {
        await EmpModel.update(req.body,{
            where:{id:1}
        })
        res.json({
            auth: true,
            message: "Datos actualizados correctamente"
        })
    } catch (error) {
        res.json({
            auth: false,
            message: error.message
        })
    }
}

//! Obtener las cuenta bancarias
export const getDB = async (req,res)=>{
    try {
        const data = await DBModel.findAll()
        res.json({
            auth:true,
            datos:data
        })
    } catch (error) {
        res.json({
            auth: false,
            message: error.message
        })
    }
}

//! Obtener una cuenta bancaria
export const getOneDB = async (req,res)=>{
    try {
        const data = await DBModel.findAll(
            {where:{id:req.params.id}}
        )
        res.json({
            auth:true,
            datos:data[0]
        })
    } catch (error) {
        res.json({
            auth: false,
            message: error.message
        })
    }
}

//! Actualizar datos de cuenta bancaria
export const updateDB = async (req,res) => {
    try {
        await DBModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({
            auth: true,
            message: "Datos actualizados correctamente"
        })
    } catch (error) {
        res.json({
            auth: false,
            message: error.message
        })
    }
}