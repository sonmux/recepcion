//* importar axios
import axios from "axios";
//* importar las librerias de react
import {useState} from 'react'
//* importar react-router-dom
import{useNavigate} from 'react-router-dom'
import React, { useRef } from 'react';
import Modal from 'react-modal';

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/tec/'
const URILOG = 'http://localhost:8000/log/';

const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
  }

const CompRegistroTrabajo = (props) => {
    const [Historial, setHistorial] = useState('')
    const {disp} = props

    const store = async (e) => {
        e.preventDefault()
        try {
            await axios.post(URI,{
                perito: localStorage.getItem('usuario'),
                dispositivoId: disp,
                historial: Historial
            },{ headers })
            //? función para guardar un log en el sistema
            //const URILOG = 'http://localhost:8000/log/';
            await axios.post(URILOG, {
                usuario: localStorage.getItem("usuario"),
                tema: "Historial Trabajo",
                descripcion:`El usuario ${localStorage.getItem("usuario")} realizó una modificación sobre el dispositivo con ID: ${disp}`
            },{ headers });
            //?------------------
            //window.location.reload();
        } catch (error) {
            console.error('Error al agregar historial de trabajo:', error);
        }
    }

    return(
        <div id='divCrearMovil'>
            <h3>Agregar registro de trabajo</h3>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="form-label">Registro</label>
                    <textarea 
                        value={Historial}
                        onChange={(e) => setHistorial(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input1DM'
                    />
                </div>
                <button type='submit' className="btn btn-primary">Agregar</button>
            </form>
        </div>
    )
}

export default CompRegistroTrabajo