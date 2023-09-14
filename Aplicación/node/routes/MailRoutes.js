//* importamos express
import express from 'express'
import { sendAcuerdo } from '../controllers/MailController.js'

const MailRouter = express.Router()

//? Enviar Acuerdo Firmado
MailRouter.post('/', sendAcuerdo)

export default MailRouter