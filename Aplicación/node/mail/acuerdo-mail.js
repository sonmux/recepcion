'use-strict'
//const { PDFDocument, rgb, StandardFonts, PageSizes } = require('pdf-lib');
//const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';

export const enviar_mail = async (pdfBase64,correo,usuario) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'ayd2.2s2022@gmail.com',
            pass: 'qlvagbjiehciocwo'
        }
    });

    let mail_options = {
        from: 'LEFCI',
        to: `${correo}`,
        subject: `Acuerdo de confidencialidad ${usuario}`,
        html: `
                <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">  
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">Acuerdo de confidencialidad firmado</h1>
                        <p  style="color: #fff; text-align:center">
                            <span style="color: #e84393">LEFCI 111</span> 
                        </p>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:center">
                        <p style="color: #000">LEFCI</p>
                    </td>
                </tr>
                </table>
            `,
        attachments: [{
            filename: 'Acuerdo Confidencialidad.pdf',
            content: Buffer.from(pdfBase64, 'base64')
            }]
    }
    transporter.sendMail(mail_options, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log('El correo se envió correctamente '+ info.response)
        }
    });
};

//module.export = this;
