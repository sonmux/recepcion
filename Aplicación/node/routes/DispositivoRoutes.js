//* importamos express
import express from 'express'
import { createDisp, deleteDisp, getAllDisp, getDisp, updateDisp } from '../controllers/DispositivoController.js'

const DispRouter = express.Router()

//? Ruta para traer todos los registros de computadoras
DispRouter.get('/', getAllDisp)
//? Ruta para traer solo un registro computadora
DispRouter.get('/:id', getDisp)
//? Ruta para crear un registro computadora
DispRouter.post('/', createDisp)
//? Ruta para actualizar un registro computadora
DispRouter.put('/:id', updateDisp)
//? Ruta para eliminar un registro computadora
DispRouter.delete('/:id', deleteDisp)

export default DispRouter