import axios from "axios";
import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'
import '../estilos/drag_and_drop.css'


const URIDisp = process.env.REACT_APP_DIRFRONT+'disp/'
const URILOG = process.env.REACT_APP_DIRFRONT+'log/';

// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
  }

function DragAndDrop () {
    const navigate = useNavigate();
    //* Funcion para obtener las tareas en el siste
    const [Tareas, setTareas] = useState([])
    useEffect (() => {
        getTareas()
    },[])
    const getTareas = async () => {
        const res = await axios.get(URIDisp,{ headers })
        setTareas(res.data)
    }
    const getList=(List)=>{
        return Tareas.filter(item=>item.peritoAsignado===List&&item.estado!=='Terminado'&&item.estado!=='Entregado')
    }
    const startDrag = (event, item) => {
        event.dataTransfer.setData('itemID',item.id)
        //console.log(item)
    }
    const dragginOver = (event) => {
        event.preventDefault();

    }
    const onDrop = async (event,List) => {
        try {
            const itemID = event.dataTransfer.getData('itemID')
            await axios.put(URIDisp+itemID,{
                peritoAsignado: List
            },{ headers })
            const item = Tareas.find(item => item.id == itemID && item.estado!=='Terminado' && item.estado!=='Entregado')
            item.peritoAsignado=List
            const newState = Tareas.map(task=>{
                if(task.id === itemID) return item;
                return task
            })
            setTareas(newState)
        } catch (error) {
            
        }
    }

    // Función para manejar la redirección
    const redirigirAInicio = () => {
        const condicion = localStorage.getItem('sesion');

        if (condicion === 'tec') {
            navigate('/InicioTec'); // Redirige a inicio tecnico
        } else if (condicion === 'rcp') {
            navigate('/InicioRecep'); // Redirige a inicio recepcion
        } else {
            navigate('/Inicio'); // Redirige a Inicio
        }
    }

    return(
      <>
        <h1>
            Asignar tareas &nbsp;
            <img className='icon-react' src="src/assets/react.svg" alt="" />
        </h1>
            {/*<Link to={`/Inicio`} className='btn btn-primary mt-2 mb-2'>Regresar Inicio</Link>*/}
            <button className='btn btn-primary mt-2 mb-2' onClick={redirigirAInicio}>
                Regresar al inicio
            </button>
        <br/>
        <div className='drag-and-drop'>
            <div className="column column--0">
                <h3>
                    Tareas en el sistema...
                </h3>
                <div className="dd-zone" droppable='true' onDragOver={(event=>dragginOver(event))} onDrop={(event => onDrop(event,0))}>
                    {getList(0).map(item=>(
                        <div className="dd-element" key={item.id} draggable onDragStart={(event) => startDrag(event,item)}>
                            <strong className="title">{item.tipo}</strong>
                            <p className="body">ID: {item.id}</p>
                            <p className="body"># Orden: {item.numOrden}</p>
                            <p className="body">Solicitud: {item.solicitud}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="column column--1">
                <h3>
                    Técnico 1
                </h3>
                <div className="dd-zone" droppable='true' onDragOver={(event=>dragginOver(event))} onDrop={(event => onDrop(event,1))}>
                    {getList(1).map(item=>(
                        <div className="dd-element" key={item.id} draggable onDragStart={(event) => startDrag(event,item)}>
                            <strong className="title">{item.tipo}</strong>
                            <p className="body">ID: {item.id}</p>
                            <p className="body"># Orden: {item.numOrden}</p>
                            <p className="body">Solicitud: {item.solicitud}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="column column--2">
                <h3>
                    Técnico 2
                </h3>
                <div className="dd-zone" droppable='true' onDragOver={(event=>dragginOver(event))} onDrop={(event => onDrop(event,2))}>
                    {getList(2).map(item=>(
                        <div className="dd-element" key={item.id} draggable onDragStart={(event) => startDrag(event,item)}>
                            <strong className="title">{item.tipo}</strong>
                            <p className="body">ID: {item.id}</p>
                            <p className="body"># Orden: {item.numOrden}</p>
                            <p className="body">Solicitud: {item.solicitud}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="column column--3">
                <h3>
                    Técnico 3
                </h3>
                <div className="dd-zone" droppable='true' onDragOver={(event=>dragginOver(event))} onDrop={(event => onDrop(event,3))}>
                    {getList(3).map(item=>(
                        <div className="dd-element" key={item.id} draggable onDragStart={(event) => startDrag(event,item)}>
                            <strong className="title">{item.tipo}</strong>
                            <p className="body">ID: {item.id}</p>
                            <p className="body"># Orden: {item.numOrden}</p>
                            <p className="body">Solicitud: {item.solicitud}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </>
    )
}

export default DragAndDrop