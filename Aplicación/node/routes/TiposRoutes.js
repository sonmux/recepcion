//* importamos express
import express from 'express'
import { createServDisp, getAllServ, getAllTipos } from '../controllers/InventarioController.js'
import {authenticateToken} from '../controllers/JWTmiddleware.js'

const TipoRouter = express.Router()

//? Ruta para tener todos los servicios
TipoRouter.get('/serv/', authenticateToken, getAllServ)
//? Ruta para tener todos los registros del inventario
TipoRouter.get('/', authenticateToken, getAllTipos)
//? Asignar servicio a dispositivo
TipoRouter.post('/asignDisp/', authenticateToken, createServDisp)
//? Ruta para crear un registro en el inventario
//TipoRouter.post('/tip', createInventario)
//? Ruta para actualizar un registro en el inventario
//TipoRouter.put('/tip/:id', updateInventario)
//? Ruta para eliminar un registro del inventario
//TipoRouter.delete('/tip/:id', deleteInventario)


export default TipoRouter