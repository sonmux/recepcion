//* importar axios
import axios from "axios"
//* importar las librerias de react
import {useState} from 'react'
//* importar react-router-dom
import {useNavigate} from 'react-router-dom'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/cliente/'

//* borra la variable de sesión
sessionStorage.removeItem('Idcliente');

const CompCreateCliente = () => {
    const [Idcliente,setIdcliente]=useState('')
    const [NombreCliente,setNombreCliente]=useState('')
    const [DirecciónCliente,setDirecciónCliente]=useState('')
    const [Telefono,setTelefono]=useState(0)
    const [Correo,setCorreo]=useState('')
    const [Nit,setNit]=useState(0)
    const [DpiFrontal,setDpiFrontal]=useState('')
    const [DpiReverso,setDpiReverso]=useState('')
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI,{
            id: Idcliente,
            nombreCliente: NombreCliente,
            direcciónCliente: DirecciónCliente,
            telefono: parseInt(Telefono),
            correo: Correo,
            nit: parseInt(Nit),
            dpiFrontal: DpiFrontal,
            dpiReverso: DpiReverso
        })
        //* guarda el id como variable de sesión
        sessionStorage.setItem("Idcliente", Idcliente);
        //* ---------
        navigate('/Acuerdo')
    }

    //? Función para seleccionar las fotos
    const [imageBase64, setImageBase64] = useState('');
    const handleImageUpload1 = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            setImageBase64(base64);
            setDpiFrontal(base64)
        };
        reader.readAsDataURL(file);
        }
    };
    const [image2Base64, setImage2Base64] = useState('');
    const handleImageUpload2 = (event2) => {
        const file = event2.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            setImage2Base64(base64);
            setDpiReverso(base64)
        };
        reader.readAsDataURL(file);
        }
    };

    return(
        <div>
            <h3>Agregar cliente</h3>
            <form onSubmit={store}>
            <div className="mb-3">
                    <label className="form-label">ID cliente</label>
                    <input 
                        value={Idcliente}
                        onChange={(e) => setIdcliente(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input 
                        value={NombreCliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input 
                        value={DirecciónCliente}
                        onChange={(e) => setDirecciónCliente(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">telefono</label>
                    <input 
                        value={Telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input 
                        value={Correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">NIT</label>
                    <input 
                        value={Nit}
                        onChange={(e) => setNit(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    {imageBase64 ? (<img src={imageBase64} alt=""/>) :
                    (<img src="https://cdn-icons-png.flaticon.com/512/492/492705.png" alt=""/>)}
                    <input 
                        type="file" 
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload1}
                    />
                </div>
                <div className="mb-3">
                    {image2Base64 ? (<img src={image2Base64} alt=""/>) :
                    (<img src="https://cdn-icons-png.flaticon.com/512/492/492705.png" alt=""/>)}
                    <input 
                        type="file" 
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload2}
                    />
                </div>
                <button type='submit' className="btn btn-primary">Agregar Cliente</button>
            </form>
        </div>
    )
}
export default CompCreateCliente