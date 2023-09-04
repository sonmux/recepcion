//* importamos las librerias
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/blogs/'

const CompEditCompu = () => {
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
    //const [IDcliente,setIDcliente]=useState('') 
    const navigate = useNavigate()
    const {id} = useParams()

    //* procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI+id,{
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
            foto4:Fotografia4
            /* aqui no se debe actualizar el idCliente
            idCliente:IDcliente
            */
        })
        navigate('/')
    }

    useEffect(() => {
        getCompuById()
    },[])

    const getCompuById = async () => {
        const res = await axios.get(URI+id)
        setMarca(res.data.marca)
        setModelo(res.data.modelo)
        setSerie(res.data.serie)
        setColor(res.data.color)
        setCapacidad(res.data.capacidadDisco)
        setSerieDisco(res.data.serieDisco)
        setSistema(res.data.sistemaOperativo)
        setContraseña(res.data.contraseñaDispositivo)
        setFotografia1(res.data.foto1)
        setFotografia2(res.data.foto2)
        setFotografia3(res.data.foto3)
        setFotografia4(res.data.foto4)
    }

    return (
        <div>
            <h3>Editar computadora</h3>
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
                    <label className="form-label">Fotografia4</label>
                    <input 
                        value={Fotografia4}
                        onChange={(e) => setFotografia4(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <button type='submit' className="btn btn-primary">actualizar</button>
            </form>
        </div>
    )


}

export default CompEditCompu