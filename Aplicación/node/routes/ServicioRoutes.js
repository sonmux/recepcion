//* import express
import express from 'express'
import { createServ } from '../controllers/ServicioController.js'

const ServicioRouter = express.Router()

//? Ruta para ingresar un log al sistema
ServicioRouter.post('/', createServ)

export default ServicioRouter