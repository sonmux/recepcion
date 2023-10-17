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

//* importar librerias para el menú dropdown
import {Drodown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'


//* hacemos una constante para las rutas del back
//const URI = 'http://localhost:8000/inv/'
const URILOG = 'http://localhost:8000/log/';
const URITIP = 'http://localhost:8000/serv';

// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
};

const CompRegistroServ = (props) => {
    const {disp} = props
    let Total=0

    //* Procedimiento para obtener todos los servicios dados al abrir la pagina
    const [reg, setReg] = useState([])
    useEffect (() => {
        getReg()
    },[])
    //* Procedimiento para mostar todos los servicios dados
    const getReg = async () => {
        const res = await axios.get(URITIP+'/getServ/'+`${disp}`,{ headers })
        //console.log(res.data)
        setReg(res.data)
    }

    //*** FUNCION PARA EL DROPDOWN MENU */
    const [supliers, setSupliers] = useState([]);
    const [suplier, setSuplier] = useState(0);
    const [Descripcion, setDescrip] = useState('');
    const [Precio, setPrecio] = useState(0);
    
    useEffect (() => {
        getServicios()
    },[])
    const getServicios = async () => {
        const servi = await axios.get(URITIP+'/serv/',{ headers })
        //console.log(tipos)
        setSupliers(servi.data.servicios)
    }
    const handleSelectChange = (event) =>{
        console.log(event)
        setDescrip(event.descripcion)
        setPrecio(event.precio)
        setSuplier(event.value)
        //console.log(suplier)
    }

    //** FUNCIÓN PARA ASIGNAR EL SERVICIO AL DISPOSITIVO */
    const store = async (e) => {
        e.preventDefault()
        try{
            await axios.post(URITIP+'/asignDisp/',{
                dispId: disp,
                servId: suplier
            },{ headers })

            //? función para guardar un log en el sistema
            /*await axios.post(URILOG, {
                usuario: localStorage.getItem("usuario"),
                tema: "Inventario",
                descripcion:`El usuario ${localStorage.getItem("usuario")} agregó un nuevo item al inventario`
            },{ headers });*/

            //window.location.reload()
            getReg()
        }catch(error){
            console.error('Error al agregar el servicio al dispositivo', error)
        }
    }

    return(
        <div id='divCrearCompu'>
            <h3>Seleccionar un servicio</h3>
            <form onSubmit={store}>
                {/*<div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <input 
                        value={Tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input1DC'
                    />
                </div>*/}
                <div className="Supliers-container">
                    <Select 
                        options={supliers.map(sup=>({label: sup.servicio, value: sup.id, descripcion:sup.descripcion, precio:sup.precio}))}
                        onChange={handleSelectChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripcion</label>
                    <textarea 
                        value={Descripcion}
                        type="text"
                        className="form-control"
                        id='input2DC'
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input 
                        value={Precio}
                        type="text"
                        className="form-control"
                        id='input3DC'
                        disabled
                    />
                </div>
                <button type='submit' className="btn btn-primary">Agregar</button>
            </form>
            <h3>Servicios brindados</h3>
            <div className="container" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                <form onSubmit={store}>
                    <div className='row'>
                            <div className='col'>
                                <table className='table'>
                                    <thead className='table-primary'>
                                        <tr>
                                            <td id='head1Table'>servicio</td>
                                            <td id='head2Table'>descripcion</td>
                                            <td id='head2Table'>precio</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reg.auth ? reg.servicios.map((regs) => {
                                        Total = Total + regs.precio
                                        return (
                                                <tr key={regs.id}>
                                                    <td id='body1Table'>{regs.servicio}</td>
                                                    <td id='body2Table'>{regs.descripcion}</td>
                                                    <td id='body2Table'>{regs.precio}</td>
                                                </tr>
                                            )
                                        }):<></>}
                                    </tbody>
                                    <tr>
                                        <td id='head1Table'>Total</td>
                                        <td id='body1Table'>{Total}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default CompRegistroServ