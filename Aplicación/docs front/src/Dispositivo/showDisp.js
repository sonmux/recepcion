//* importar axios
import axios from  'axios'
//* importar las librerias de react
import {useState, useEffect} from 'react'
//* importar react-router-dom
import {Link} from 'react-router-dom'
//? importar librerias necesarias para el popupMenu
import Modal from 'react-modal';
import { useNavigate  } from 'react-router-dom'; // Importa useHistory
import CompCreateCompu from '../CompuForm/CreateCompu';
import CompCreateMovil from '../MovilForm/CreateMovil';
import CompEditCompu from '../CompuForm/EditCompu';
import CompEditMovil from '../MovilForm/EditMovil';


//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/disp/'

const CompShowDisp = () => {
    const [dispos, setDisp] = useState([])
    useEffect (() => {
        getDisp()
    },[])

    //* procedimiento para mostrar todas las computadoras
    const getDisp = async () => {
        const res = await axios.get(URI)
        setDisp(res.data)
        console.log(res.data)
    }

    //* procedimiento para eliminar una computadora
    const deleteCompu = async (id) => {
        await axios.delete(`${URI}${id}`)
        getDisp()
    }

    //? funciones para poder utilizar un popupMenu
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectRrow, setSelectedRow] = useState([])
    const [selectID, setID] = useState(0)
    const [selectTIPO, setTIPO] = useState('')

    const openModal = () => {
        setIsModalOpen(true);
    };
    const openModalEditar = (id,tipo) => {
        setSelectedRow([0,[id,tipo]])
        console.log(selectRrow)
        setID(id)
        setTIPO(tipo)
        setIsModalOpenEdit(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOption(null);
    };
    const closeModal2 = () => {
        setSelectedOption(null);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        //closeModal();
    };

  // Renderiza el formulario correspondiente según la opción seleccionada
    const renderForm = () => {
        if (selectedOption === 'opcion1') {
        return (
            <CompCreateCompu/>
        );
        } else if (selectedOption === 'opcion2') {
        return (
            //<div>
            //  <h3>Formulario para Opción 2</h3>
            //  {/* Agrega aquí el contenido del formulario para Opción 2 */}
            //</div>
            <CompCreateMovil/>
        );
        }
        return null; // Devuelve null si no se ha seleccionado ninguna opción
    };

    const renderFormEdit = (id, tipo) => {
        console.log(id + ' - ' + tipo)
        if(tipo === 'Computadora'){
            return(
                <CompEditCompu id={id}/>
            )
        }
        else if(tipo === 'Móvil'){
            return(
                <CompEditMovil id={id}/>
            )
        }
        return null
        
    };

    //* retorna la estructura de la tabla
    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                {/*<Link to={`/Dispositivo/createCompu`} className='btn btn-primary mt-2 mb-2'>Agregar Dispositivo</Link>*/}
                    <button onClick={openModal} className='btn btn-primary mt-2 mb-2'>Agregar Equipo</button>
                    <Modal
                        isOpen={isModalOpen}
                        //onRequestClose={closeModal}
                        //contentLabel='Ejemplo de Menú Emergente'
                    >
                        <div>
                        <h2>Opciones de Menú</h2>
                        <ul>
                            <li>
                            <button onClick={() => handleOptionClick('opcion1')} className='btn btn-primary mt-2 mb-2'>Computadora</button>
                            </li>
                            <li>
                            <button onClick={() => handleOptionClick('opcion2')} className='btn btn-primary mt-2 mb-2'>Dispositivo Móvil</button>
                            </li>
                            {/* Agrega más opciones de menú aquí */}
                        </ul>
                        <button onClick={closeModal} className='btn btn-primary mt-2 mb-2'>Cerrar Menú</button>
                        <div>
                            {selectedOption && renderForm()} {/* Renderiza el formulario seleccionado */}
                        </div>
                        </div>
                    </Modal>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <td>Actions</td>
                                <td>Dispositivo</td>
                                <td>Marca</td>
                                <td>Modelo</td>
                                <td>Serie</td>
                                <td>Color</td>
                                <td>Capacidad disco</td>
                                <td>Serie del disco</td>
                                <td>Sistema Operativo</td>
                                <td>IMEI</td>
                                <td>Contraseña Dispositivo</td>
                                <td>Fotografia 1</td>
                                <td>Fotografia 2</td>
                                <td>Fotografia 3</td>
                                <td>Fotografia 4</td>
                            </tr>
                        </thead>
                        <tbody>
                            {dispos.map((disp) => (
                                <tr key={disp.id}>
                                    <td>
                                        {/*<Link to={`/Dispositivo/editCompu/${disp.id}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>*/}
                                        <button onClick={() => openModalEditar(disp.id, disp.tipo)} className='btn btn-info'  onRequestClose={closeModal2}><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button onClick={() => deleteCompu(disp.id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                    <td>{disp.tipo}</td>
                                    <td>{disp.marca}</td>
                                    <td>{disp.modelo}</td>
                                    <td>{disp.serie}</td>
                                    <td>{disp.color}</td>
                                    <td>{disp.capacidadDisco}</td>
                                    <td>{disp.serieDisco}</td>
                                    <td>{disp.sistemaOperativo}</td>
                                    <td>{disp.imei}</td>
                                    <td>{disp.contraseñaDispositivo}</td>
                                    <td><img src={disp.foto1} alt=""/></td>
                                    <td><img src={disp.foto2} alt=""/></td>
                                    <td><img src={disp.foto3} alt=""/></td>
                                    <td><img src={disp.foto4} alt=""/></td>
                                    
                                    {/* Modal para editar*/}
                                    <Modal isOpen={isModalOpenEdit}>
                                        {selectRrow !== null && (
                                            /* Renderiza el formulario según el ID seleccionado */
                                            renderFormEdit(selectID, selectTIPO)
                                        )}
                                    </Modal>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompShowDisp