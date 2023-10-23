//* import express
import express from 'express'
import { authenticateToken } from '../controllers/JWTmiddleware.js'
import { createServ, getAllServ, getServ } from '../controllers/RegServicioController.js'

const regServicioRouter = express.Router()

//? Ruta para ingresar un servicio
regServicioRouter.post('/', authenticateToken, createServ)
//? Ruta para tener todos los servicios
regServicioRouter.get('/serv/', authenticateToken, getAllServ)
//? Ruta para obtener los servicios brindados a un dispositivo
regServicioRouter.get('/getServ/:id', authenticateToken, getServ)

export default regServicioRouter