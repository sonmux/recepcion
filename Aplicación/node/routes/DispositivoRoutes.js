//* importamos express
import express from 'express'
import { createDisp, deleteDisp, getAllDisp, getAllDispUsr, getDisp, updateDisp } from '../controllers/DispositivoController.js'

const DispRouter = express.Router()

//? Ruta para traer solo registros dispositivo de un suauario
DispRouter.get('/all', getAllDispUsr)
//? Ruta para traer todos los registros de dispositivo
DispRouter.get('/', getAllDisp)
//? Ruta para traer solo un registro dispositivo
DispRouter.get('/:id', getDisp)
//? Ruta para crear un registro dispositivo
DispRouter.post('/', createDisp)
//? Ruta para actualizar un registro dispositivo
DispRouter.put('/:id', updateDisp)
//? Ruta para eliminar un registro dispositivo
DispRouter.delete('/:id', deleteDisp)

export default DispRouter