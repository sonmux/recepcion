//* importamos express
import express from 'express'
import { createCompu, deleteCompu, getAllCompu, getCompu, updateCompu } from '../controllers/BlogController.js'

const router = express.Router()

//? Ruta para traer todos los registros de computadoras
router.get('/', getAllCompu)
//? Ruta para traer solo un registro computadora
router.get('/:id', getCompu)
//? Ruta para crear un registro computadora
router.post('/', createCompu)
//? Ruta para actualizar un registro computadora
router.put('/:id', updateCompu)
//? Ruta para eliminar un registro computadora
router.delete('/:id', deleteCompu)

export default router