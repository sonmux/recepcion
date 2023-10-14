//* import express
import express from 'express'
import {authenticateToken} from '../controllers/JWTmiddleware.js'
import { createRegTrabajo, getRegTec } from '../controllers/RegistroTrabajoController.js'

const RegistroTrabajoRouter = express.Router()

//? Ruta para crear un registro de trabajo
RegistroTrabajoRouter.post('/', authenticateToken, createRegTrabajo)
RegistroTrabajoRouter.get('/reg/', authenticateToken, getRegTec)

export default RegistroTrabajoRouter