//* import express
import express from 'express'
import { createLog } from '../controllers/RegistroController.js'
import {authenticateToken} from '../controllers/JWTmiddleware.js'

const RegistroRouter = express.Router()

//? Ruta para ingresar un log al sistema
RegistroRouter.post('/', createLog)

export default RegistroRouter