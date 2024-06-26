//* importar axios
import axios from  'axios'
//* importar las librerias de react
import {useState, useEffect} from 'react'
//* importar react-router-dom
import {Link} from 'react-router-dom'
//? importar librerias necesarias para el popupMenu
import Modal from 'react-modal';
//import ModalAñadirHistorial from './ModalAñadirHistorial';
//import ModalAñadirRepuesto from './ModalAñadirRepuesto';

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'
import CompRegistroTrabajo from './RegistroTrabajo';
import CompRegistroRep from './RegistroRepuesto';

//* hacemos una constante para las rutas del back
const URI = process.env.REACT_APP_DIRFRONT+'disp/'

// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
  };

const CompShowTareas = () => {
    
        const [dispos, setDisp] = useState([])
        useEffect (() => {
            getDisp()
        },[])
        //* Procedimiento para mostar todas las tareas asignadas
        const getDisp = async () => {
            const res = await axios.get(URI+'task/'+`?usuario='${localStorage.getItem('usuario')}'&sesion=${localStorage.getItem('sesion')}`,{ headers })
            console.log(res)
            setDisp(res.data)
        }

    //*** MODAL PARA LA FUNCION DE AGREGAR UN REGISTRO DE TRABAJO */
    const [ID, setId]=useState(0)
    const [historialModalOpen, setHistorialModalOpen] = useState(false);
    const openHistorialModal = (id) => {
        setId(id)
        setHistorialModalOpen(true);
    };
    const onClose = (id) => {
        setId(0)
        setHistorialModalOpen(false);
    };
    const renderHistorial = (id) => {
        return(
            <CompRegistroTrabajo disp={id} />
        )
    }

    //*** MODAL PARA LA FUNCION DE AGREGAR UN REGISTRO DE REPUESTO */
    const [repuestoModalOpen, setRepuestoModalOpen] = useState(false);
    const openRepuestoModal = (id) => {
        setId(id)
        setRepuestoModalOpen(true);
    };
    const onCloseRep = (id) => {
        setId(0)
        setRepuestoModalOpen(false);
    };
    const renderRepuesto = (id) => {
        console.log(id)
        return(
            <CompRegistroRep disp={id} />
        )
    }

    //*** FUNCIÓN PARA TERMINAR UNA TAREA */
    const finTarea = async (id) => {
        //console.log(id)
        await axios.put(URI+id,{
            estado: 'Terminado'
        },{ headers })
        window.confirm('Tarea terminada, Gracias!');
        window.location.reload(); // Recargar la página actual
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Mis tareas asignadas</h1>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <td id='head1Table'>Actividad</td>
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
                                <td id='head1Table'>Terminar</td>
                            </tr>
                        </thead>
                        <tbody>
                            {dispos.auth ? dispos.disp.map((disp) => (
                                <tr key={disp.id}>
                                    <td id='body1Table'>
                                        <button onClick={()=>openHistorialModal(disp.id)} className='btn btn-info'>Registro</button>
                                        <button onClick={()=>openRepuestoModal(disp.id)} className='btn btn-info'>Repuesto</button>
                                        <Modal
                                            isOpen={historialModalOpen}
                                        >
                                            {ID!==0 && (
                                                renderHistorial(ID)
                                            )}
                                            <button onClick={onClose} className="close-button">CERRAR</button>
                                        </Modal>
                                        <Modal
                                            isOpen={repuestoModalOpen}
                                        >
                                            {ID!==0 && (
                                                renderRepuesto(ID)
                                            )}
                                            <button onClick={onCloseRep} className="close-button">CERRAR</button>
                                        </Modal>
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
                                    <td id='body2Table'>
                                        <button
                                            onClick={() => {
                                                const confirmAction = window.confirm("¿Estás seguro de que deseas terminar esta tarea?");
                                                if (confirmAction) {
                                                    // Aquí puedes agregar la lógica para realizar la acción de "Terminar"
                                                    // Puedes llamar a una función o realizar una solicitud al servidor, por ejemplo
                                                    finTarea(disp.id)
                                                }
                                            }}
                                            className='btn btn-info'
                                        >
                                            Terminar
                                        </button>
                                    </td>
                                </tr>
                            )):<></>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompShowTareas