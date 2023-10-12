//* importamos express
import express from 'express'
import { createCompu, deleteCompu, getAllCompu, getCompu, updateCompu } from '../controllers/CompuController.js'
import {authenticateToken} from '../controllers/JWTmiddleware.js'

const CompuRouter = express.Router()

//? Ruta para traer todos los registros de computadoras
CompuRouter.get('/', authenticateToken, getAllCompu)
//? Ruta para traer solo un registro computadora
CompuRouter.get('/:id', authenticateToken, getCompu)
//? Ruta para crear un registro computadora
CompuRouter.post('/', authenticateToken, createCompu)
//? Ruta para actualizar un registro computadora
CompuRouter.put('/:id', authenticateToken, updateCompu)
//? Ruta para eliminar un registro computadora
CompuRouter.delete('/:id', authenticateToken, deleteCompu)

export default CompuRouter