//* importamos las librerias
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/movil/'

const CompEditMovil = () => {
    const [Marca,setMarca]=useState('')
    const [Modelo,setModelo]=useState('')
    const [Imei,setImei]=useState('') 
    const [Serie,setSerie]=useState('')
    const [Color,setColor]=useState('') 
    const [Fotografia1,setFotografia1]=useState('') 
    const [Fotografia2,setFotografia2]=useState('') 
    const [Fotografia3,setFotografia3]=useState('') 
    const navigate = useNavigate()
    const {id} = useParams()

    //* procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI+id,{
            marca:Marca,
            modelo:Modelo,
            imei:Imei,
            serie:Serie,
            color:Color,
            foto1:Fotografia1,
            foto2:Fotografia2,
            foto3:Fotografia3,
        })
        navigate('/Dispositivo')
    }

    useEffect(() => {
        getMovilById()
    },[])

    const getMovilById = async () => {
        const res = await axios.get(URI+id)
        setMarca(res.data.marca)
        setModelo(res.data.modelo)
        setImei(res.data.imei)
        setSerie(res.data.serie)
        setColor(res.data.color)
        setFotografia1(res.data.foto1)
        setFotografia2(res.data.foto2)
        setFotografia3(res.data.foto3)
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

    return(
        <div>
            <h3>Editar dispositivo movil</h3>
            <form onSubmit={update}>
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
                    (<img src={Fotografia1} alt=""/>)}
                    <input 
                        type="file" 
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload1}
                    />
                </div>
                <div className="mb-3">
                    {image2Base64 ? (<img src={image2Base64} alt=""/>) :
                    (<img src={Fotografia2} alt=""/>)}
                    <input 
                        type="file" 
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload2}
                    />
                </div>
                <div className="mb-3">
                    {image3Base64 ? (<img src={image3Base64} alt=""/>) :
                    (<img src={Fotografia3} alt=""/>)}
                    <input 
                        type="file" 
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload3}
                    />
                </div>
                <button type='submit' className="btn btn-primary">Actualizar</button>
            </form>
        </div>
    )
}

export default CompEditMovil