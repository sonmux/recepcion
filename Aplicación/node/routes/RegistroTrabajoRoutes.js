//* import express
import express from 'express'
import {authenticateToken} from '../controllers/JWTmiddleware.js'
import { createRegTrabajo } from '../controllers/RegistroTrabajoController.js'

const RegistroTrabajoRouter = express.Router()

//? Ruta para crear un registro de trabajo
RegistroTrabajoRouter.post('/', authenticateToken, createRegTrabajo)

export default RegistroTrabajoRouter