//* importar axios
import axios from "axios";
//* importar las librerias de react
import {useState} from 'react'
import { useRef } from "react";
//* importar react-router-dom
import {useNavigate} from 'react-router-dom'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/compu/'

const CompCreateCompu = () => {
    const [Marca,setMarca]=useState('')
    const [Modelo,setModelo]=useState('')
    const [Serie,setSerie]=useState('')
    const [Color,setColor]=useState('')
    const [Capacidad,setCapacidad]=useState('')
    const [SerieDisco,setSerieDisco]=useState('')
    const [Sistema,setSistema]=useState('')
    const [Contraseña,setContraseña]=useState('') 
    const [Fotografia1,setFotografia1]=useState('') 
    const [Fotografia2,setFotografia2]=useState('') 
    const [Fotografia3,setFotografia3]=useState('') 
    const [Fotografia4,setFotografia4]=useState('') 
    const [IDcliente,setIDcliente]=useState('') 
    const navigate = useNavigate()

    //*procedimiento para guardar datos
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI,{
            marca:Marca,
            modelo:Modelo,
            serie:Serie,
            color:Color,
            capacidadDisco:parseInt(Capacidad),
            serieDisco:SerieDisco,
            sistemaOperativo:Sistema,
            contraseñaDispositivo:Contraseña,
            foto1:Fotografia1,
            foto2:Fotografia2,
            foto3:Fotografia3,
            foto4:Fotografia4,
            idCliente:IDcliente
        })
        navigate('/')
    }

    //? Función para seleccionar foto1
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const [image,setImage]=useState("")
    const [image2,setImage2]=useState("")
    const [image3,setImage3]=useState("")
    const [image4,setImage4]=useState("")

    const handleImageClick = () => {
        inputRef.current.click()
    }
    const handleImageClick2 = () => {
        inputRef2.current.click()
    }
    const handleImageClick3 = () => {
        inputRef3.current.click()
    }
    const handleImageClick4 = () => {
        inputRef4.current.click()
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0]
        console.log(file)
        setImage(event.target.files[0])
        setFotografia1(URL.createObjectURL(event.target.files[0]))
    }
    const handleImageChange2 = (event) => {
        const file2 = event.target.files[0]
        console.log(file2)
        setImage2(event.target.files[0])
        setFotografia2(URL.createObjectURL(event.target.files[0]))
    }
    const handleImageChange3 = (event) => {
        const file3 = event.target.files[0]
        console.log(file3)
        setImage3(event.target.files[0])
        setFotografia3(URL.createObjectURL(event.target.files[0]))
    }
    const handleImageChange4 = (event) => {
        const file4 = event.target.files[0]
        console.log(file4)
        setImage4(event.target.files[0])
        setFotografia4(URL.createObjectURL(event.target.files[0]))
    }


    return(
        <div>
            <h3>Agregar computadora</h3>
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
                    <label className="form-label">Capacidad</label>
                    <input 
                        value={Capacidad}
                        onChange={(e) => setCapacidad(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Serie del disco</label>
                    <input 
                        value={SerieDisco}
                        onChange={(e) => setSerieDisco(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Sistema operativo</label>
                    <input 
                        value={Sistema}
                        onChange={(e) => setSistema(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña dispositivo</label>
                    <input 
                        value={Contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3" onClick={handleImageClick}>
                    {image ? (<img src={URL.createObjectURL(image)} alt=""/>) :
                    (<img src="https://cdn-icons-png.flaticon.com/512/492/492705.png" alt=""/>)}
                    <input 
                        type="file" 
                        ref={inputRef}
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="mb-3" onClick={handleImageClick2}>
                    {image2 ? (<img src={URL.createObjectURL(image2)} alt=""/>) :
                    (<img src="https://cdn-icons-png.flaticon.com/512/492/492705.png" alt=""/>)}
                    <input 
                        type="file" 
                        ref={inputRef2}
                        accept="image/*"
                        onChange={handleImageChange2}
                    />
                </div>
                <div className="mb-3" onClick={handleImageClick3}>
                    {image3 ? (<img src={URL.createObjectURL(image3)} alt=""/>) :
                    (<img src="https://cdn-icons-png.flaticon.com/512/492/492705.png" alt=""/>)}
                    <input 
                        type="file" 
                        ref={inputRef3}
                        accept="image/*"
                        onChange={handleImageChange3}
                    />
                </div>
                <div className="mb-3" onClick={handleImageClick4}>
                    {image4 ? (<img src={URL.createObjectURL(image4)} alt=""/>) :
                    (<img src="https://cdn-icons-png.flaticon.com/512/492/492705.png" alt=""/>)}
                    <input 
                        type="file" 
                        ref={inputRef4}
                        accept="image/*"
                        onChange={handleImageChange4}
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

export default CompCreateCompu