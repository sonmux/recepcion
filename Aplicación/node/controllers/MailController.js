//* importamos el Modelo
import { enviar_mail } from "../mail/acuerdo-mail.js"
import ClienteModel from "../models/ClienteModel.js"

//! Metodo para enviar el acuerdo firmado
export const sendAcuerdo = async  (req, res) =>{
    try {
        //console.log(req.body)
        const datos = await ClienteModel.findAll({
            where:{id:req.body.id}
        })
        //console.log(req.body.pdfBase64,datos[0].dataValues.correo,datos[0].dataValues.nombreCliente)
        //console.log(req.body.pdfBase64)
        enviar_mail(req.body.pdfBase64,datos[0].dataValues.correo,datos[0].dataValues.nombreCliente)
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}