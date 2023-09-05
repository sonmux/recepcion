//* importamos express
import express from 'express'
import { createMovil, deleteMovil, getAllMovil, getMovil, updateMovil } from '../controllers/MovilController.js'

const MovilRouter = express.Router()

//? Ruta para traer todos los registros de dispositivo movil
MovilRouter.get('/', getAllMovil)
//? Ruta para traer solo un registro dispositivo movil
MovilRouter.get('/:id', getMovil)
//? Ruta para crear un registro dispositivo movil
MovilRouter.post('/', createMovil)
//? Ruta para actualizar un registro dispositivo movil
MovilRouter.put('/:id', updateMovil)
//? Ruta para eliminar un registro dispositivo movil
MovilRouter.delete('/:id', deleteMovil)

export default MovilRouter