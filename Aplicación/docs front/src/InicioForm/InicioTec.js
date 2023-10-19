
import { Link } from 'react-router-dom';

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'

//? para borara la variable del local storage
//localStorage.removeItem('Idcliente')
//localStorage.removeItem('RegOrden')
//localStorage.removeItem('tecnico')
//localStorage.removeItem('usuario')

function InicioTec() {
    return (
        <div className="div-principalLogin">
          <div className="mb-3">
            <form>
                <Link to="/Tecnico">
                    <button type="button" className="pulse" id='pulse'>Mis tareas</button>
                </Link>
                <Link to="/LoginTec">
                    <button type="button" className="pulse" id='pulse'>Salir</button>
                </Link>
            </form>
          </div>
        </div>
      );
}

export default InicioTec;
