//* importar axios
import axios from  'axios'
//* importar las librerias de react
import {useState, useEffect} from 'react'
//* importar react-router-dom
import {Link} from 'react-router-dom'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/movil/'

const CompShowMovil = () => {
    const [movils, setMovils] = useState([])
    useEffect(() => {
        getMovils()
    },[])

    //* procedimiento para mostrar todos los dispositivos moviles
    const getMovils = async () => {
        const res = await axios.get(URI)
        setMovils(res.data)
        console.log(res.data)
    }

    //* procedimiento para eliminar un dispositivo movil
    const deleteMovil = async (id) => {
        await axios.delete(`${URI}${id}`)
        getMovils()
    }

    //* retorna la estructura de la tabla
    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                <Link to={`/Dispositivo/createMovil`} className='btn btn-primary mt-2 mb-2'>Agregar Dispositivo Movil</Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <td>Actions</td>
                                <td>Marca</td>
                                <td>Modelo</td>
                                <td>IMEI</td>
                                <td>Serie</td>
                                <td>Color</td>
                                <td>Fotografia 1</td>
                                <td>Fotografia 2</td>
                                <td>Fotografia 3</td>
                            </tr>
                        </thead>
                        <tbody>
                            {movils.map((movil) => (
                                <tr key={movil.id}>
                                    <td>
                                        <Link to={`/Dispositivo/editMovil/${movil.id}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>
                                        <button onClick={() => deleteMovil(movil.id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                    <td>{movil.marca}</td>
                                    <td>{movil.modelo}</td>
                                    <td>{movil.imei}</td>
                                    <td>{movil.serie}</td>
                                    <td>{movil.color}</td>
                                    <td><img src={movil.foto1} alt=""/></td>
                                    <td><img src={movil.foto2} alt=""/></td>
                                    <td><img src={movil.foto3} alt=""/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompShowMovil