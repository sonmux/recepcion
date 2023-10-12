//* importamos express
import express from 'express'
import { createMovil, deleteMovil, getAllMovil, getMovil, updateMovil } from '../controllers/MovilController.js'
import {authenticateToken} from '../controllers/JWTmiddleware.js'

const MovilRouter = express.Router()

//? Ruta para traer todos los registros de dispositivo movil
MovilRouter.get('/', authenticateToken, getAllMovil)
//? Ruta para traer solo un registro dispositivo movil
MovilRouter.get('/:id', authenticateToken, getMovil)
//? Ruta para crear un registro dispositivo movil
MovilRouter.post('/', authenticateToken, createMovil)
//? Ruta para actualizar un registro dispositivo movil
MovilRouter.put('/:id', authenticateToken, updateMovil)
//? Ruta para eliminar un registro dispositivo movil
MovilRouter.delete('/:id', authenticateToken, deleteMovil)

export default MovilRouter