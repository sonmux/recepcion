//* import express
import express from 'express'
import { createAcuerdo, getAcuerdo } from '../controllers/AcuerdoController.js'
import {authenticateToken} from '../controllers/JWTmiddleware.js'

const AcuerdoRouter = express.Router()

//? Ruta para traer solo un registro acuerdo
AcuerdoRouter.get('/:id', authenticateToken, getAcuerdo)
//? Ruta para crear un registro acuerdo
AcuerdoRouter.post('/', authenticateToken, createAcuerdo)

export default AcuerdoRouter