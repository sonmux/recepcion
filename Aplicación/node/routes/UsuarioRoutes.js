//* import express
import express from 'express'
import { getUsuario } from '../controllers/UsuarioController.js'

const UsuarioRouter = express.Router()

//? Ruta para traer solo un registro usuario
UsuarioRouter.post('/', getUsuario)

export default UsuarioRouter