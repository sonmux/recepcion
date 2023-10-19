//* importar axios
import axios from "axios";
//* importar las librerias de react
import {useState,useEffect} from 'react'
//* importar react-router-dom
import {useNavigate} from 'react-router-dom'
import Select from 'react-select'

import React, { useRef } from 'react';
import Modal from 'react-modal';

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'

//* import para poder tener lista de codigo de area por pais para los telefonos
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CompDBEdit from "./EditDB";

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/emp/'
const URILOG = 'http://localhost:8000/log/';

// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
};

const CompEmpForm = () => {
    const [Nombre, setNombre] = useState('')
    const [Direccion, setDireccion] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [Correo, setCorreo] = useState('')
    const [RegMercantil, setRegMercantil] = useState('')
    const [Nit, setNit] = useState('')
    //const [Banco, setB] = useState('')
    //const [Cuenta, setCuenta] = useState(0)

    //* Procedimiento para obtener todos los servicios dados al abrir la pagina
    useEffect (() => {
        getDatos()
        getDB()
    },[])

    const getDatos = async () => {
        const res = await axios.get(URI,{ headers })
        if(res.data!==undefined && res.data!=null){
            if(res.data.auth){
                setNombre(res.data.dato.nombre)
                setDireccion(res.data.dato.direccion)
                setTelefono(res.data.dato.telefono)
                setCorreo(res.data.dato.correo)
                setRegMercantil(res.data.dato.regMercantil)
                setNit(res.data.dato.nit)
            }
        }
    }

    const [ban, setBan] = useState([])
    const getDB = async () => {
        const res = await axios.get(URI+'DB/',{ headers })
        setBan(res.data)
    }

    const storeEEdt = async (e) => {
        e.preventDefault()
        try {
            await axios.put(URI+'update/',{
                nombre:Nombre,
                direccion:Direccion,
                telefono:Telefono,
                correo:Correo,
                regMercantil:RegMercantil,
                nit:Nit
            },{ headers })
            await getDatos()
            window.confirm("Datos Actualizados");
        } catch (error) {
            console.error('Error al modificar los datos de la empresa', error)
        }
    }
    /*const storeCEdt = async (e) => {
        e.preventDefault()
        try {
            await axios.post(URI,{
                banco:Banco,
                cuenta:Cuenta
            })
        } catch (error) {
            console.error('Error al agregar cuenta', error)
        }
    }*/

    //*** MODAL PARA LA FUNCION DE EDITAR DB */
    const [ID, setId]=useState(0)
    const [EDBModalOpen, setEDBModalOpen] = useState(false);
    const openModificarModal = (id) => {
        setId(id)
        setEDBModalOpen(true);
    };
    const onClose = (id) => {
        setId(0)
        setEDBModalOpen(false);
    };
    const renderUpdateDB = (id) => {
        return(
            <CompDBEdit id={id} />
        )
    }

    return(
        <div id='divCrearCompu'>
            <h3>Datos de la empresa</h3>
            <form onSubmit={storeEEdt}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input 
                        value={Nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input2DC'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Direccion</label>
                    <input 
                        value={Direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input3DC'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefono</label>
                    <PhoneInput
                        placeholder="número de telefono"
                        className="form-control"
                        value={Telefono}
                        onChange={setTelefono}
                        id="input5C"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input 
                        value={Correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input5DC'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">RegMercantil</label>
                    <input 
                        value={RegMercantil}
                        onChange={(e) => setRegMercantil(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input6DC'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nit</label>
                    <input 
                        value={Nit}
                        onChange={(e) => setNit(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input6DC'
                        required
                    />
                </div>
                <button type='submit' className="btn btn-primary">Actualizar</button>
            </form>




            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>Cuentas Bancarias</h1>
                        <table className='table'>
                            <thead className='table-primary'>
                                <tr>
                                    <td id='head1Table'>Actividad</td>
                                    <td id='head1Table'>Banco</td>
                                    <td id='head2Table'>Cuenta</td>
                                </tr>
                            </thead>
                            <tbody>
                                {ban.auth ? ban.datos.map((BC) => (
                                    <tr key={BC.id}>
                                        <td id='body1Table'>
                                            <button onClick={()=>openModificarModal(BC.id)} className='btn btn-info'>Modificar</button>
                                            <Modal
                                                isOpen={EDBModalOpen}
                                            >
                                                {ID!==0 && (
                                                    renderUpdateDB(ID)
                                                )}
                                                <button onClick={onClose} className="close-button">CERRAR</button>
                                            </Modal>
                                        </td>
                                        <td id='body2Table'>{BC.banco}</td>
                                        <td id='body1Table'>{BC.numero}</td>
                                    </tr>
                                )):<></>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>















        </div>
    )

}

export default CompEmpForm