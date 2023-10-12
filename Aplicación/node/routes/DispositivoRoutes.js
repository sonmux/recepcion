//* importamos express
import express from 'express'
import { createDisp, deleteDisp, getAllDisp, getAllDispUsr, getAllTask, getDisp, updateDisp } from '../controllers/DispositivoController.js'
import {authenticateToken} from '../controllers/JWTmiddleware.js'

const DispRouter = express.Router()


//? Ruta para traer solo registros dispositivo de un suauario
DispRouter.get('/task', authenticateToken, getAllTask)
//? Ruta para traer solo registros dispositivo de un suauario
DispRouter.get('/all', authenticateToken, getAllDispUsr)
//? Ruta para traer todos los registros de dispositivo
DispRouter.get('/', authenticateToken, getAllDisp)
//? Ruta para traer solo un registro dispositivo
DispRouter.get('/:id', authenticateToken, getDisp)
//? Ruta para crear un registro dispositivo
DispRouter.post('/', authenticateToken, createDisp)
//? Ruta para actualizar un registro dispositivo
DispRouter.put('/:id', authenticateToken, updateDisp)
//? Ruta para eliminar un registro dispositivo
DispRouter.delete('/:id', authenticateToken, deleteDisp)

export default DispRouter