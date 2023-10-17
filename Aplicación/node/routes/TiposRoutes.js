//* importamos express
import express from 'express'
import { getAllTipos } from '../controllers/InventarioController.js'
import {authenticateToken} from '../controllers/JWTmiddleware.js'

const TipoRouter = express.Router()

//? Ruta para tener todos los registros del inventario
TipoRouter.get('/', authenticateToken, getAllTipos)
//? Ruta para crear un registro en el inventario
//TipoRouter.post('/tip', createInventario)
//? Ruta para actualizar un registro en el inventario
//TipoRouter.put('/tip/:id', updateInventario)
//? Ruta para eliminar un registro del inventario
//TipoRouter.delete('/tip/:id', deleteInventario)


export default TipoRouter