//* importamos las librerias
import axios from 'axios'
import { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import Modal from 'react-modal';
import Select from 'react-select'

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'

//* hacemos una constante para las rutas del back
const URI = process.env.REACT_APP_DIRFRONT+'inv/'
const URILOG = process.env.REACT_APP_DIRFRONT+'log/';

// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
  };

const CompEditInv = (props) => {
    const [Tipo, setTipo] = useState('')
    const [Descripcion, setDescripcion] = useState('')
    const [Serie, setSerie] = useState('')
    const [Marca, setMarca] = useState('')
    const [Modelo, setModelo] = useState('')
    const [Cantidad, setCantidad] = useState(0)
    const {id} = props;

    //* procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        try{
            await axios.put(URI+id,{
                tipo: suplier,
                descripcion: Descripcion,
                serie: Serie,
                marca: Marca,
                modelo: Modelo,
                cantidad:parseInt(Cantidad)
            },{ headers })
            //? función para guardar un log en el sistema
            await axios.post(URILOG, {
                usuario: localStorage.getItem("usuario"),
                tema: "Modificar Inventario",
                descripcion:`El usuario ${localStorage.getItem("usuario")} modificó el item del inventario con id ${id}}`
            },{ headers });
            //?------------------
            window.location.reload();
        } catch (error) {
            console.error('Error al agregar la computadora:', error);
            // Aquí puedes manejar errores de manera adecuada, como mostrar un mensaje de error al usuario
        }
    }

    useEffect(() => {
        getInvById()
    },[])

    const getInvById = async () => {
        const res = await axios.get(URI+id,{ headers })
        setTipo(res.data.inventario[0].tipo)
        setDescripcion(res.data.inventario[0].descripcion)
        setSerie(res.data.inventario[0].serie)
        setMarca(res.data.inventario[0].marca)
        setModelo(res.data.inventario[0].modelo)
        setCantidad(res.data.inventario[0].cantidad)
    }
    //? funcion para recargar la pagina
    const handleReload = () => {
        window.location.reload(); // Recargar la página actual
    };

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

    return (
        <div id='divEditCompu'>
            <h3>Editar Inventario</h3>
            <form onSubmit={update}>
                {/*<div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <input 
                        value={Tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input1EDC'
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
                        id='input2EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Serie</label>
                    <input 
                        value={Serie}
                        onChange={(e) => setSerie(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input3EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Marca</label>
                    <input 
                        value={Marca}
                        onChange={(e) => setMarca(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input4EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input 
                        value={Modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input5EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input 
                        value={Cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input6EDC'
                    />
                </div>
                <button type='submit' className="btn btn-primary">Actualizar</button>
                <button type="button" className="btn btn-primary" onClick={handleReload}>Cancelar</button>
            </form>
        </div>
    )
}

export default CompEditInv