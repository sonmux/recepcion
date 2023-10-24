//* import express
import express from 'express'
import {authenticateToken} from '../controllers/JWTmiddleware.js'
import { getDB, getData, getNameEmp, getOneDB, updateDB, updateEmp } from '../controllers/EmpresaController.js'

const EmpRouter = express.Router()

//? Ruta para traer los datos de empresa
EmpRouter.get('/', authenticateToken, getData)
//? Ruta para modificar los datos de empresa
EmpRouter.put('/update/:id', authenticateToken, updateEmp)
//? Ruta para obtener cuentas bancarias
EmpRouter.get('/DB/:id', authenticateToken, getDB)
//? Ruta para obtener una cuenta bancaria
EmpRouter.get('/ODB/:id', authenticateToken, getOneDB)
//? Ruta para modificar los datos de cuenta bancaria
EmpRouter.put('/uDB/:id', authenticateToken, updateDB)

//? Ruta para traer los datos de empresa
EmpRouter.get('/emplog/', getNameEmp)

export default EmpRouter