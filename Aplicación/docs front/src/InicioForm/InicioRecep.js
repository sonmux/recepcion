
import { Link } from 'react-router-dom';

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'

//? para borara la variable del local storage
//localStorage.removeItem('Idcliente')
//localStorage.removeItem('RegOrden')
//localStorage.removeItem('tecnico')
//localStorage.removeItem('usuario')

function InicioRecep() {
    return (
        <div className="div-principalLogin">
          <div className="mb-3">
            <form>
                <Link to="/Cliente">
                    <button type="button" className="pulse" id='pulse'>Ingresar Cliente</button>
                </Link>
                <Link to="/Tareas">
                    <button type="button" className="pulse" id='pulse'>Asignar Tarea</button>
                </Link>
                <Link to="/Inventario">
                    <button type="button" className="pulse" id='pulse'>Inventario</button>
                </Link>
                <Link to="/Entrega">
                    <button type="button" className="pulse" id='pulse'>Entregas</button>
                </Link>
                <Link to="/LoginRecep">
                    <button type="button" className="pulse" id='pulse'>Salir</button>
                </Link>
            </form>
          </div>
        </div>
      );
}

export default InicioRecep;
