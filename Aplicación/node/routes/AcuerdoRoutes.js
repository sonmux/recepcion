//* import express
import express from 'express'
import { createAcuerdo, getAcuerdo } from '../controllers/AcuerdoController.js'

const AcuerdoRouter = express.Router()

//? Ruta para traer solo un registro acuerdo
AcuerdoRouter.get('/:id', getAcuerdo)
//? Ruta para crear un registro acuerdo
AcuerdoRouter.post('/', createAcuerdo)

export default AcuerdoRouter