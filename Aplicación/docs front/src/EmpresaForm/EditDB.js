//* importamos las librerias
import axios from 'axios'
import { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import Modal from 'react-modal';

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/emp/'
const URILOG = 'http://localhost:8000/log/';

// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
  };

const CompDBEdit = (props) => {
    const [Banco, setBanco] = useState('')
    const [Numero, setNumero] = useState(0)
    const {id} = props;

    const update = async(e) => {
        e.preventDefault()
        try {
            await axios.put(URI+'uDB/'+id,{
                banco:Banco,
                numero:Numero
            },{ headers })
            await axios.post(URILOG, {
                usuario: localStorage.getItem("usuario"),
                tema: "Modificar Datos Banco",
                descripcion:`El usuario ${localStorage.getItem("usuario")} modificó los datos bancarios`
            },{ headers });
            window.location.reload();
        } catch (error) {
            console.error('Error al agregar la computadora:', error);
        }
    }

    useEffect(() => {
        getCompuById()
    },[])

    const getCompuById = async () => {
        const res = await axios.get(URI+'ODB/'+id,{ headers })
       if(res.data.auth){
            setBanco(res.data.datos.banco)
            setNumero(res.data.datos.numero)
        }
    }

    return(
        <div id='divEditCompu'>
            <h3>Editar Cuenta Bancaria</h3>
            <form onSubmit={update}>
            <div className="mb-3">
                    <label className="form-label">Banco</label>
                    <input 
                        value={Banco}
                        onChange={(e) => setBanco(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input1EDC'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cuenta</label>
                    <input 
                        value={Numero}
                        onChange={(e) => setNumero(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input1EDC'
                    />
                </div>
                <button type='submit' className="btn btn-primary">Actualizar</button>
            </form>
        </div>
    )
}

export default CompDBEdit