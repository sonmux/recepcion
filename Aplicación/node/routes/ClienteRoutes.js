//* import express
import express from 'express'
import { createCliente, deleteCliente, getAllCliente, getCliente, updateCliente } from '../controllers/ClienteController.js'

const ClienteRouter = express.Router()

//? Ruta para traer todos los registros de cliente
ClienteRouter.get('/', getAllCliente)
//? Ruta para traer solo un registro cliente
ClienteRouter.get('/:id', getCliente)
//? Ruta para crear un registro cliente
ClienteRouter.post('/', createCliente)
//? Ruta para actualizar un registro cliente
ClienteRouter.put('/:id', updateCliente)
//? Ruta para eliminar un registro cliente
ClienteRouter.delete('/:id', deleteCliente)

export default ClienteRouter