//* import express
import express from 'express'
import { createServ, createServDisp, getAllServ, getServ } from '../controllers/ServicioController.js'
import { authenticateToken } from '../controllers/JWTmiddleware.js'
import regServicioModel from '../models/RegistroServicioModel.js'

const ServicioRouter = express.Router()

//? Ruta para ingresar un log al sistema
ServicioRouter.post('/', createServ)
//? Ruta para tener todos los servicios
ServicioRouter.get('/serv/', authenticateToken, getAllServ)
//? Asignar servicio a dispositivo
ServicioRouter.post('/asignDisp/', authenticateToken, createServDisp)
//? Ruta para obtener los servicios brindados a un dispositivo
ServicioRouter.get('/getServ/:id', authenticateToken, getServ)

export default ServicioRouter