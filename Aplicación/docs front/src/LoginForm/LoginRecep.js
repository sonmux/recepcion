import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
//! import { useAuth } from './AuthContext'; // Importa useAuth desde el archivo AuthContext.js

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'


const URI = process.env.REACT_APP_DIRFRONT+'usr/urcp';
const URILOG = process.env.REACT_APP_DIRFRONT+'log/';
const URIEMP = process.env.REACT_APP_DIRFRONT+'emp/';
//? para borara la variable del local storage
//localStorage.removeItem('Idcliente')
//localStorage.removeItem('RegOrden')
//localStorage.removeItem('tecnico')
//localStorage.removeItem('usuario')
//localStorage.removeItem('token')

function CompGetUsrRecep() {
  const [Usuario, setUsuario] = useState('');
  const [Pass, setPass] = useState('');
  const [Emp, setEmp] = useState('');
  const navigate = useNavigate(); // Importa navigate desde react-router-dom
  //! const { setIsAuthenticated } = useAuth(); // Obtén la función para establecer la autenticación desde el contexto

  const store = async (e) => {
    e.preventDefault();
    const login = await axios.post(URI, {
      usuario: Usuario,
      pass: Pass
    });

    //console.log(login.data)
    if (login.data.auth) {
      //! setIsAuthenticated(true); // Establece el estado de autenticación como verdadero
      localStorage.setItem('usuario', login.data.usuario.correo);
      localStorage.setItem('token',login.data.token)
      localStorage.setItem('sesion','rcp')
      localStorage.setItem('emp', Emp)

      //? función para guardar un log en el sistema
      await axios.post(URILOG, {
        usuario: localStorage.getItem("usuario"),
        tema: "Inicio de sesión exitoso",
        descripcion:`El usuario ${localStorage.getItem("usuario")} inició sesión en el sistema`
      });
      //?------------------

      console.log('exito')
      navigate('/InicioRecep');
    } else {
      //! setIsAuthenticated(false); // Establece el estado de autenticación como falso en caso de inicio de sesión fallido
      // Lógica para manejar el inicio de sesión fallido, por ejemplo, mostrar un mensaje de error
      //? función para guardar un log en el sistema
      //const URILOG = process.env.REACT_APP_DIRFRONT+'log/';
      await axios.post(URILOG, {
        usuario: localStorage.getItem("usuario"),
        tema: "Inicio de sesión fallido",
        descripcion:`El usuario ${localStorage.getItem("usuario")} no pudo entrar al sistema`
      });
      //?------------------
    }
  };

  //*** FUNCION PARA EL DROPDOWN MENU */
  const [supliers, setSupliers] = useState([]);
  
  useEffect (() => {
      getEmp()
  },[])
  const getEmp = async () => {
      const servi = await axios.get(URIEMP+'emplog/')
      //console.log(servi.data)
      setSupliers(servi.data.dato)
  }
  const handleSelectChange = (event) =>{
      //console.log(event)
      setEmp(event.value)
  }

  return (
    <div className="div-principalLogin">
      <div className="mb-3">
        <form onSubmit={store}>
          <h1>Login Recepción</h1>
          <label className="form-label" id='label'>Usuario</label>
          <input
            id="input1L"
            value={Usuario}
            placeholder="Ingresa tu usuario"
            onChange={(e) => setUsuario(e.target.value)}
            type="text"
            className="form-control"
          />
          <label className="form-label" id='label'>Contraseña</label>
          <input
            id="input2L"
            value={Pass}
            placeholder="Ingresa tu contraseña"
            onChange={(e) => setPass(e.target.value)}
            type="password"
            className="form-control"
          />
          <label className="form-label" id='label'>Seleccioar empresa</label>
          <br/>
          <div className="Supliers-container">
            <Select 
              options={supliers.map(sup=>({label: sup.nombre, value: sup.id}))}
              onChange={handleSelectChange}
              required
            />
          </div>
          <button type="submit" className="pulse" id='pulse'>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompGetUsrRecep;
