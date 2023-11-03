//* importar axios
import axios from "axios";
//* importar las librerias de react
import {useState, useEffect} from 'react'
//* importar react-router-dom
import{useNavigate} from 'react-router-dom'
import React, { useRef } from 'react';
import Modal from 'react-modal';

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'

//* hacemos una constante para las rutas del back
const URI = process.env.REACT_APP_DIRFRONT+'tec/'
const URILOG = process.env.REACT_APP_DIRFRONT+'log/';

const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
  }

const CompRegistroTrabajo = (props) => {
    const [Historial, setHistorial] = useState('')
    const {disp} = props
    const [reg, setReg] = useState([])
    useEffect (() => {
        getReg()
    },[])
    //* Procedimiento para mostar todas las tareas asignadas
    const getReg = async () => {
        const res = await axios.get(URI+'reg/'+`?tec=${localStorage.getItem('usuario')}&disp=${disp}`,{ headers })
        console.log(res.data)
        setReg(res.data)
    }

    const store = async (e) => {
        e.preventDefault()
        try {
            await axios.post(URI,{
                perito: localStorage.getItem('usuario'),
                dispositivoId: disp,
                historial: Historial
            },{ headers })
            //? función para guardar un log en el sistema
            //const URILOG = process.env.REACT_APP_DIRFRONT+'log/';
            await axios.post(URILOG, {
                usuario: localStorage.getItem("usuario"),
                tema: "Historial Trabajo",
                descripcion:`El usuario ${localStorage.getItem("usuario")} realizó una modificación sobre el dispositivo con ID: ${disp}`
            },{ headers });
            //?------------------
            await getReg()
            //console.log(reg)
            setHistorial('')
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
                        required
                    />
                </div>
                <button type='submit' className="btn btn-primary">Agregar</button>
                <h1>Registro de actividad</h1>
                <div className='container' style={{ maxHeight: '420px', overflowY: 'auto' }}>
                    <div className='row'>
                        <div className='col'>
                            <table className='table'>
                                <thead className='table-primary'>
                                    <tr>
                                        <td id='head1Table'>Fecha registro</td>
                                        <td id='head2Table'>Historial</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reg.auth ? reg.registro.map((regs) => (
                                        <tr key={regs.id}>
                                            <td id='body2Table'>{regs.createdAt}</td>
                                            <td id='body1Table'>{regs.historial}</td>
                                        </tr>
                                    )):<></>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CompRegistroTrabajo