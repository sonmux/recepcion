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

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'


//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/disp/'

// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
  };

const CompShowDisp = () => {
    const [dispos, setDisp] = useState([])
    useEffect (() => {
        getDisp()
    },[])

    //* procedimiento para mostrar todas las computadoras del usuario
    const getDisp = async () => {
        const res = await axios.get(URI+'all/'+`?id=${localStorage.getItem("Idcliente")}&orden=${localStorage.getItem("RegOrden")}`,{ headers })
        setDisp(res.data)
    }

    //* procedimiento para eliminar una computadora
    const deleteCompu = async (id) => {
        await axios.delete(`${URI}${id}`,{ headers })
        getDisp()
    }

    //? funciones para poder utilizar un popupMenu
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectRrow, setSelectedRow] = useState([])
    const [selectID, setID] = useState(0)
    const [selectTIPO, setTIPO] = useState('')
    const [selectIdDelete, setIdDelete] = useState('')

    const openModal = () => {
        setIsModalOpen(true);
    };
    const openModalEditar = (id,tipo) => {
        setSelectedRow([0,[id,tipo]])
        //console.log(selectRrow)
        setID(id)
        setTIPO(tipo)
        setIsModalOpenEdit(true);
    };


    const openModalDelete = (id) => {
        setIdDelete(id)
        setIsModalOpenDelete(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOption(null);
    };
    const closeModal2 = () => {
        setSelectedOption(null);
    };

    const closeModaDelete = () => {
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
        //console.log(id + ' - ' + tipo)
        if(tipo === 'Móvil'){
            return(
                <CompEditMovil id={id}/>
            )
        }else{
            return(
                <CompEditCompu id={id} />
            )
        }
        return null
        
    };

    const [Razon,setRazon]=useState('')
    const URILOG = 'http://localhost:8000/log/';
    const renderFormDelete = (id) => {
        
        const storeEliminar = async (e) => {
            e.preventDefault()
            try {
                await axios.post(URILOG, {
                    usuario: localStorage.getItem("usuario"),
                    tema: "Eliminar Dispositivo",
                    descripcion:`El usuario ${localStorage.getItem("usuario")} eliminó un dispositivo del cliente con dpi: ${localStorage.getItem("Idcliente")}, por la siguiente razón: ${Razon}`
                },{ headers });
                deleteCompu(id)
                //?------------------
                window.location.reload(); // Recargar la página actual
                
                //? otra forma de cerrar el modal
                /*setRazon('')
                setIsModalOpenDelete(false);*/
            } catch (error) {
                console.error('Error al agregar la computadora:', error);
                // Aquí puedes manejar errores de manera adecuada, como mostrar un mensaje de error al usuario
            }
        }

        //? funcion para recargar la pagina
        const handleReload = () => {
            //window.location.reload(); // Recargar la página actual
            setRazon('')
            setIsModalOpenDelete(false);
        };

        return(
            <div id='divEliminarDisp'>
            <h3>Eliminar Dispositivo</h3>
            <form onSubmit={storeEliminar}>
                <div className="mb-3">
                    <label className="form-label">¿Por qué desea eliminar este dispositivo?</label>
                    <textarea 
                        value={Razon}
                        onChange={(e) => setRazon(e.target.value)}
                        type="text"
                        className="form-control"
                        required
                    />
                </div>
                <button type='submit' className="btn btn-primary">Eliminar</button>
                <button type="button" className="btn btn-primary" onClick={handleReload}>Cancelar</button>
            </form>
            </div>
        )
    };

    //* retorna la estructura de la tabla
    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <button onClick={openModal} className='btn btn-primary mt-2 mb-2'>Agregar Equipo</button>
                    <Link to={`/Acuerdo`} className='btn btn-primary mt-2 mb-2'>Firmar Acuerdo</Link>
                    <Modal
                        isOpen={isModalOpen}
                        id='modalMenuDispositivos'
                        //onRequestClose={closeModal}
                        //contentLabel='Ejemplo de Menú Emergente'
                    >
                        <div id='divMenuDispositivo'>
                        <h2>Opciones de Menú</h2>
                        <ul>
                            <li>
                            <button onClick={() => handleOptionClick('opcion1')} className='btn btn-primary mt-2 mb-2'>Dispositivo Almacenamiento</button>
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
                                <td id='head1Table'>Actions</td>
                                <td id='head2Table'>Dispositivo</td>
                                <td id='head1Table'>Marca</td>
                                <td id='head2Table'>Modelo</td>
                                <td id='head1Table'>Serie</td>
                                <td id='head2Table'>Color</td>
                                <td id='head1Table'>Capacidad disco</td>
                                <td id='head2Table'>Serie del disco</td>
                                <td id='head1Table'>Sistema Operativo</td>
                                <td id='head2Table'>IMEI</td>
                                <td id='head1Table'>Contraseña Dispositivo</td>
                                <td id='head2Table'>Observaciones</td>
                                <td id='head1Table'>Solicitud</td>
                                <td id='head2Table'>Fotografia 1</td>
                                <td id='head1Table'>Fotografia 2</td>
                                <td id='head2Table'>Fotografia 3</td>
                                <td id='head1Table'>Fotografia 4</td>
                            </tr>
                        </thead>
                        <tbody>
                            {dispos.auth ? dispos.disp.map((disp) => (
                                <tr key={disp.id}>
                                    <td id='body1Table'>
                                        {/*<Link to={`/Dispositivo/editCompu/${disp.id}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>*/}
                                        <button onClick={() => openModalEditar(disp.id, disp.tipo)} className='btn btn-info'  onRequestClose={closeModal2}><i className="fa-solid fa-pen-to-square"></i></button>
                                        {/*<button onClick={() => deleteCompu(disp.id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>*/}
                                        <button onClick={() => openModalDelete(disp.id)} className='btn btn-danger'  onRequestClose={closeModaDelete}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                    <td id='body2Table'>{disp.tipo}</td>
                                    <td id='body1Table'>{disp.marca}</td>
                                    <td id='body2Table'>{disp.modelo}</td>
                                    <td id='body1Table'>{disp.serie}</td>
                                    <td id='body2Table'>{disp.color}</td>
                                    <td id='body1Table'>{disp.capacidadDisco}</td>
                                    <td id='body2Table'>{disp.serieDisco}</td>
                                    <td id='body1Table'>{disp.sistemaOperativo}</td>
                                    <td id='body2Table'>{disp.imei}</td>
                                    <td id='body1Table'>{disp.contraseñaDispositivo}</td>
                                    <td id='body2Table'>{disp.descripcion}</td>
                                    <td id='body1Table'>{disp.solicitud}</td>
                                    <td id='body2Table'><img src={disp.foto1} alt="" width='70px' height='60px'/></td>
                                    <td id='body1Table'><img src={disp.foto2} alt="" width='70px' height='60px'/></td>
                                    <td id='body2Table'><img src={disp.foto3} alt="" width='70px' height='60px'/></td>
                                    <td id='body1Table'><img src={disp.foto4} alt="" width='70px' height='60px'/></td>
                                    
                                    {/* Modal para editar*/}
                                    <Modal 
                                        isOpen={isModalOpenEdit}
                                        id='modalEditar'
                                    >
                                        {selectRrow !== null && (
                                            /* Renderiza el formulario según el ID seleccionado */
                                            renderFormEdit(selectID, selectTIPO)
                                        )}
                                    </Modal>
                                    {/* Modal para eliminar*/}
                                    <Modal 
                                        isOpen={isModalOpenDelete}
                                        id='modalEliminar'
                                    >
                                        {renderFormDelete(selectIdDelete)}
                                    </Modal>
                                    
                                </tr>
                            )):<></>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompShowDisp