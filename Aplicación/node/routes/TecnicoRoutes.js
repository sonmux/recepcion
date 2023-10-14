//* import express
import express from 'express'
import {authenticateToken} from '../controllers/JWTmiddleware.js'
import { createRegTrabajo, getRegTec } from '../controllers/RegistroTrabajoController.js'
import { createRegRepuesto, getRegRepuesto } from '../controllers/RegistroRepuestoController.js'

const TecnicoRouter = express.Router()

//? Ruta para crear un registro de trabajo
TecnicoRouter.post('/', authenticateToken, createRegTrabajo)
TecnicoRouter.get('/reg/', authenticateToken, getRegTec)
TecnicoRouter.post('/regRep/', authenticateToken, createRegRepuesto)
TecnicoRouter.get('/getRep/:id', authenticateToken, getRegRepuesto)

export default TecnicoRouter