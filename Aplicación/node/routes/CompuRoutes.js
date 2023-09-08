//* importamos express
import express from 'express'
import { createCompu, deleteCompu, getAllCompu, getCompu, updateCompu } from '../controllers/CompuController.js'

const CompuRouter = express.Router()

//? Ruta para traer todos los registros de computadoras
CompuRouter.get('/', getAllCompu)
//? Ruta para traer solo un registro computadora
CompuRouter.get('/:id', getCompu)
//? Ruta para crear un registro computadora
CompuRouter.post('/', createCompu)
//? Ruta para actualizar un registro computadora
CompuRouter.put('/:id', updateCompu)
//? Ruta para eliminar un registro computadora
CompuRouter.delete('/:id', deleteCompu)

export default CompuRouter