//* import express
import express from 'express'
import { getUsuario } from '../controllers/UsuarioController.js'
import { getUsrTecnico } from '../controllers/UsrTecnicoController.js'
import { getUsrRecep } from '../controllers/UsrRecepController.js'
import { getUsrAdm } from '../controllers/UsrAdmController.js'

const UsuarioRouter = express.Router()

//? Ruta para traer solo un registro usuario
//UsuarioRouter.post('/', getUsuario)
//? Ruta para traer solo un registro usuario tecnico
UsuarioRouter.post('/utec', getUsrTecnico)
//? Ruta para traer solo un registro usuario recepcion
UsuarioRouter.post('/urcp', getUsrRecep)
//? Ruta para traer solo un registro usuario recepcion
UsuarioRouter.post('/', getUsrAdm)

export default UsuarioRouter