//* importamos el modelo
import UsuarioModel from "../models/Usuario.Model.js";
import jwt from 'jsonwebtoken'

//* Metodo para el CRUD de usuario

//! LOGIN
//! Mostrar solo un registro de usuario
export const getUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findAll({
            where:{
                usuario:req.body.usuario,
                pass: req.body.pass
            }
        })
        if(usuario[0] == undefined || usuario[0] == '' || usuario[0] == null){
            res.json({
                auth: false,
                message: "Error en las credenciales"
            })
        }else{
            jwt.sign({user:usuario[0]}, 'secretkey', (err, token)=>{
                res.json({
                    auth:true,
                    usuario:usuario[0],
                    token:token
                })
            })
        }
    } catch (error) {
        res.json({
            "auth":false,
            message: error.message
        })
    }
}