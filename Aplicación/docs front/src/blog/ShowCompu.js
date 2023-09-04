//* importar axios
import axios from  'axios'
//* importar las librerias de react
import {useState, useEffect} from 'react'
//* importar react-router-dom
import {Link} from 'react-router-dom'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/blogs/'

const CompShowCompus = () => {
    const [compus, setCompus] = useState([])
    useEffect (() => {
        getCompus()
    },[])

    //* procedimiento para mostrar todas las computadoras
    const getCompus = async () => {
        const res = await axios.get(URI)
        setCompus(res.data)
        console.log(res.data)
    }

    //* procedimiento para eliminar una computadora
    const deleteCompu = async (id) => {
        await axios.delete(`${URI}${id}`)
        getCompus()
    }

    //* retorna la estructura de la tabla
    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                <Link to={`/create`} className='btn btn-primary mt-2 mb-2'>Agregar Computadora</Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <td>Actions</td>
                                <td>Marca</td>
                                <td>Modelo</td>
                                <td>Serie</td>
                                <td>Color</td>
                                <td>Capacidad disco</td>
                                <td>Serie del disco</td>
                                <td>Sistema Operativo</td>
                                <td>Contraseña Dispositivo</td>
                                <td>Fotografia 1</td>
                                <td>Fotografia 2</td>
                                <td>Fotografia 3</td>
                                <td>Fotografia 4</td>
                            </tr>
                        </thead>
                        <tbody>
                            {compus.map((compu) => (
                                <tr key={compu.id}>
                                    <td>
                                        <Link to={`/edit/${compu.id}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>
                                        <button onClick={() => deleteCompu(compu.id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                    <td>{compu.marca}</td>
                                    <td>{compu.modelo}</td>
                                    <td>{compu.serie}</td>
                                    <td>{compu.color}</td>
                                    <td>{compu.capacidadDisco}</td>
                                    <td>{compu.serieDisco}</td>
                                    <td>{compu.sistemaOperativo}</td>
                                    <td>{compu.contraseñaDispositivo}</td>
                                    <td>{compu.foto1}</td>
                                    <td>{compu.foto2}</td>
                                    <td>{compu.foto3}</td>
                                    <td>{compu.foto4}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompShowCompus