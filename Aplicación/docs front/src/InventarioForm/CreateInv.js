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
const URI = process.env.REACT_APP_DIRFRONT+'inv/'
const URILOG = process.env.REACT_APP_DIRFRONT+'log/';

// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
};

const CompCreateInv = () => {
    const [Tipo,setTipo]=useState('')
    const [Descripcion,setDescripcion]=useState('')
    const [Serie,setSerie]=useState('')
    const [Marca,setMarca]=useState('')
    const [Modelo,setModelo]=useState('')
    const [Cantidad,setCantidad]=useState('')

    const store = async (e) => {
        e.preventDefault()
        try{
            await axios.post(URI,{
                tipo: suplier,
                descripcion: Descripcion,
                serie: Serie,
                marca: Marca,
                modelo: Modelo,
                cantidad: parseInt(Cantidad)
            },{ headers })

            //? función para guardar un log en el sistema
            //const URILOG = process.env.REACT_APP_DIRFRONT+'log/';
            await axios.post(URILOG, {
                usuario: localStorage.getItem("usuario"),
                tema: "Inventario",
                descripcion:`El usuario ${localStorage.getItem("usuario")} agregó un nuevo item al inventario`
            },{ headers });
            /*console.log({
                tipo: suplier,
                descripcion: Descripcion,
                serie: Serie,
                marca: Marca,
                modelo: Modelo,
                cantidad: Cantidad
            })*/

            window.location.reload()
        }catch(error){
            console.error('Error al agregar el item al inventario', error)
        }
    }

    //*** FUNCION PARA EL DROPDOWN MENU */
    const URITIP = process.env.REACT_APP_DIRFRONT+'tip/';
    const [supliers, setSupliers] = useState([]);
    const [suplier, setSuplier] = useState(0);
    useEffect (() => {
        getTipos()
    },[])
    const getTipos = async () => {
        const tipos = await axios.get(URITIP,{ headers })
        //console.log(tipos)
        setSupliers(tipos.data.tipos)
    }
    const handleSelectChange = (event) =>{
        //console.log(event)
        setSuplier(event.value)
        //console.log(suplier)
    }

    return(
        <div id='divCrearCompu'>
            <h3>Agregar al inventario</h3>
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
                        options={supliers.map(sup=>({label: sup.tipo, value: sup.id}))}
                        onChange={handleSelectChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripcion</label>
                    <input 
                        value={Descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input2DC'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Serie</label>
                    <input 
                        value={Serie}
                        onChange={(e) => setSerie(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input3DC'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Marca</label>
                    <input 
                        value={Marca}
                        onChange={(e) => setMarca(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input4DC'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input 
                        value={Modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input5DC'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input 
                        value={Cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input6DC'
                        required
                    />
                </div>
                <button type='submit' className="btn btn-primary">Agregar</button>
            </form>
        </div>
    )
}

export default CompCreateInv