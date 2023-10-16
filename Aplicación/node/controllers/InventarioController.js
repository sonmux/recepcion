//* importamos el modelo
import InventarioModel from "../models/InventarioModel.js";
import TiposModel from "../models/TiposModel.js";
//* importar la conexión de la db
import db from '../database/db.js';
import ServiciosModel from "../models/ServiciosModel.js";
import DispServModel from "../models/DispServ.js";

//* Metodo para el CRUD del inventario

//! Mostrar todos los registros del inventario
export const getAllInventario = async (req, res) => {
    /*try {
        const inventarios = await InventarioModel.findAll()
        res.json({
            auth: true,
            inventario: inventarios
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }*/

    /*try {
        const inventarios = await InventarioModel.findAll({
            attributes: ['descripcion', 'serie', 'marca', 'modelo', 'cantidad'],
            include: [
                {
                    model: TiposModel,
                    attributes: ['tipo']
                }
            ]
        });
        res.json({
            auth: true,
            inventario: inventarios
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }*/
    try {
        const inventarios = await db.query(`select i.id, t.tipo, i.descripcion, i.serie, i.marca, i.modelo, i.cantidad from inventarios i
        inner join tipos t where i.tipo = t.id;`)
        res.json({
            auth: true,
            inventario: inventarios[0]
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}

//! Mostrar solo un registro del inventario
export const getInv = async (req, res) => {
    try {
        const inventarios = await db.query(`select i.id, t.tipo, i.descripcion, i.serie, i.marca, i.modelo, i.cantidad from inventarios i
        inner join tipos t where i.tipo = t.id and i.id = ${req.params.id};`)
        res.json({
            auth: true,
            inventario: inventarios[0]
        })
    } catch (error) {
        res.json
    }
}


//! Crear un registro en el inventario
export const createInventario = async (req, res) => {
    try {
        await InventarioModel.create(req.body)
        res.json({
            auth:true,
            message: "Producto ingresado al inventario"
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}

//! Actualizar un registro del inventario
export const updateInventario = async (req, res) => {
    try {
        await InventarioModel.update(req.body, {
            where:{id:req.params.id}
        })
        res.json({
            auth: true,
            message: "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({
            auth: false,
            message: error.message
        })
    }
}

//! Eliminar un registro del inventario
export const deleteInventario = async (req, res) => {
    try {
        await InventarioModel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            auth: true,
            message: 'Registro eliminado correctamente'
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}



//* Metodo para el CRUD del inventario

//! Mostrar todos los registros de la tabla tipo
export const getAllTipos = async (req, res) => {
    try {
        const tipos = await TiposModel.findAll()
        res.json({
            auth: true,
            tipos: tipos
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
    /*try {
        const tipos = await db.query(`select tipo as label, id as value from tipos;`)
        res.json({
            auth: true,
            tipos: tipos[0]
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }*/
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


//* Metodo para el CRUD de servicios
//! Obtener todos los servicios
export const getAllServ = async (req, res) => {
    try {
        const servicios = await ServiciosModel.findAll()
        res.json({
            auth: true,
            servicios: servicios
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}


//* Metodo paraasignar un servicio a un dispositivo
//! Incertar servicio y dispositivo en tabla dispServ
export const createServDisp = async (req, res) => {
    try {
        await DispServModel.create(req.body)
        res.json({
            auth:true,
            message: "Servicio asignado a dispositivo"
        })
    } catch (error) {
        res.json({
            auth:false,
            message: error.message
        })
    }
}