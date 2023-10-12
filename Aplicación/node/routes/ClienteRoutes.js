//* import express
import express from 'express'
import { createCliente, deleteCliente, getAllCliente, getCliente, updateCliente } from '../controllers/ClienteController.js'
import {authenticateToken} from '../controllers/JWTmiddleware.js'

const ClienteRouter = express.Router()

//? Ruta para traer todos los registros de cliente
ClienteRouter.get('/', authenticateToken, getAllCliente)
//? Ruta para traer solo un registro cliente
ClienteRouter.get('/:id', authenticateToken, getCliente)
//? Ruta para crear un registro cliente
ClienteRouter.post('/', authenticateToken, createCliente)
//? Ruta para actualizar un registro cliente
ClienteRouter.put('/:id', authenticateToken, updateCliente)
//? Ruta para eliminar un registro cliente
ClienteRouter.delete('/:id', authenticateToken, deleteCliente)

export default ClienteRouter