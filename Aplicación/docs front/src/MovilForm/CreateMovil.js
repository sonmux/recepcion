//* importar axios
import axios from "axios";
//* importar las librerias de react
import {useState} from 'react'
//* importar react-router-dom
import{useNavigate} from 'react-router-dom'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/movil/'

const CompCreateMovil = () => {
    const [Marca,setMarca]=useState('')
    const [Modelo,setModelo]=useState('')
    const [Imei,setImei]=useState('') 
    const [Serie,setSerie]=useState('')
    const [Color,setColor]=useState('') 
    const [Fotografia1,setFotografia1]=useState('') 
    const [Fotografia2,setFotografia2]=useState('') 
    const [Fotografia3,setFotografia3]=useState('') 
    const [IDcliente,setIDcliente]=useState('') 
    const navigate = useNavigate()

    //* procedimiento para guardad datos
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI,{
            marca:Marca,
            modelo:Modelo,
            imei:Imei,
            serie:Serie,
            color:Color,
            foto1:Fotografia1,
            foto2:Fotografia2,
            foto3:Fotografia3,
            idCliente:IDcliente
        })
        navigate('/')
    }

    return(
        <div>
            <h3>Agregar dispositivo movil</h3>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="form-label">Marca</label>
                    <input 
                        value={Marca}
                        onChange={(e) => setMarca(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input 
                        value={Modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">IMEI</label>
                    <input 
                        value={Imei}
                        onChange={(e) => setImei(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Serie</label>
                    <input 
                        value={Serie}
                        onChange={(e) => setSerie(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Color</label>
                    <input 
                        value={Color}
                        onChange={(e) => setColor(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fotografia1</label>
                    <input 
                        value={Fotografia1}
                        onChange={(e) => setFotografia1(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fotografia2</label>
                    <input 
                        value={Fotografia2}
                        onChange={(e) => setFotografia2(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fotografia3</label>
                    <input 
                        value={Fotografia3}
                        onChange={(e) => setFotografia3(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">IDcliente</label>
                    <input 
                        value={IDcliente}
                        onChange={(e) => setIDcliente(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <button type='submit' className="btn btn-primary">Agregar</button>
            </form>
        </div>
    )
}

export default CompCreateMovil