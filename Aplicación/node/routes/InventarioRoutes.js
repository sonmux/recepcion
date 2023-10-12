//* importamos express
import express from 'express'
import { createInventario, deleteInventario, getAllInventario, getAllTipos, getInv, updateInventario } from '../controllers/InventarioController.js'
import {authenticateToken} from '../controllers/JWTmiddleware.js'

const InventarioRouter = express.Router()

//? Ruta para tener todos lso registros del inventario
InventarioRouter.get('/', authenticateToken, getAllInventario)
//? Ruta para traer solo un registro del inventario
InventarioRouter.get('/:id', authenticateToken, getInv)
//? Ruta para crear un registro en el inventario
InventarioRouter.post('/', authenticateToken, createInventario)
//? Ruta para actualizar un registro en el inventario
InventarioRouter.put('/:id', authenticateToken, updateInventario)
//? Ruta para eliminar un registro del inventario
InventarioRouter.delete('/:id', authenticateToken, deleteInventario)


export default InventarioRouter
