//* importar axios
import axios from "axios";
//* importar las librerias de react
import {useState} from 'react'
//* importar react-router-dom
import{useNavigate} from 'react-router-dom'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/disp/'

const CompCreateMovil = () => {
    const [Marca,setMarca]=useState('')
    const [Modelo,setModelo]=useState('')
    const [Imei,setImei]=useState('') 
    const [Serie,setSerie]=useState('')
    const [Color,setColor]=useState('') 
    const [Fotografia1,setFotografia1]=useState('') 
    const [Fotografia2,setFotografia2]=useState('') 
    const [Fotografia3,setFotografia3]=useState('') 
    //const [IDcliente,setIDcliente]=useState('') 
    const navigate = useNavigate()

    //* procedimiento para guardad datos
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI,{
            tipo:"Móvil",
            marca:Marca,
            modelo:Modelo,
            serie:Serie,
            color:Color,
            capacidadDisco:0,
            serieDisco:'',
            sistemaOperativo:'',
            imei:Imei,
            contraseñaDispositivo:'',
            foto1:Fotografia1,
            foto2:Fotografia2,
            foto3:Fotografia3,
            foto4:'',
            idCliente:localStorage.getItem("Idcliente")
        })
        navigate('/Dispositivo')
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
            setFotografia1(base64)
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
            setFotografia2(base64)
        };
        reader.readAsDataURL(file);
        }
    };
    const [image3Base64, setImage3Base64] = useState('');
    const handleImageUpload3 = (event3) => {
        const file = event3.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            setImage3Base64(base64);
            setFotografia3(base64)
        };
        reader.readAsDataURL(file);
        }
    };

    const handleReload = () => {
        window.location.reload(); // Recargar la página actual
      };


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
                <div className="mb-3">
                    {image3Base64 ? (<img src={image3Base64} alt=""/>) :
                    (<img src="https://cdn-icons-png.flaticon.com/512/492/492705.png" alt=""/>)}
                    <input 
                        type="file" 
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload3}
                    />
                </div>
                <button type='submit' className="btn btn-primary" onClick={handleReload}>Agregar</button>
            </form>
        </div>
    )
}

export default CompCreateMovil