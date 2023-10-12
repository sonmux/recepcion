//* importamos express
import express from 'express'
import { sendAcuerdo } from '../controllers/MailController.js'
import {authenticateToken} from '../controllers/JWTmiddleware.js'

const MailRouter = express.Router()

//? Enviar Acuerdo Firmado
MailRouter.post('/', authenticateToken, sendAcuerdo)

export default MailRouter