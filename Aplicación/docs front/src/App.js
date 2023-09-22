import logo from './logo.svg';
import './App.css';

//* importamos los componentes
import CompShowCompus from './CompuForm/ShowCompu';
import CompCreateCompu from './CompuForm/CreateCompu';
import CompEditCompu from './CompuForm/EditCompu';
import CompCreateMovil from './MovilForm/CreateMovil';
import CompShowMovil from './MovilForm/ShowMovil';
import CompEditMovil from './MovilForm/EditMovil';
import CompCreateCliente from './ClienteForm/CreateCliente';
import CompCreateAcuerdo from './AcuerdoForm/CreateAcuerdo';
import CompCreateAcuerdo2 from './AcuerdoForm/CreateAcuerdo2';
import ViewPdfSign from './AcuerdoForm/ViewPdfSign';
import CompCreateDisp from './Dispositivo/CreateDisp';
import CompEditDisp from './Dispositivo/EditDisp';
import CompShowDisp from './Dispositivo/showDisp';

//* importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompGetUsr from './LoginForm/Login';
// Importa AuthProvider desde el archivo AuthContext.js
import { AuthProvider } from './LoginForm/AuthContext'; // Asegúrate de que la ruta al archivo AuthContext.js sea correcta

// Importa ProtectedRoute
import ProtectedRoute from './LoginForm/ProtectedRoute'; // Asegúrate de que la ruta sea correcta

function App() {
  /*return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <AuthProvider> 
          <Routes>
            <Route path='/' element={<CompGetUsr/>} />
          
            <Route
              path='/Cliente'
              element={
                <ProtectedRoute 
                  element={<CompCreateCliente />}
                />
              }
            />
            
            <Route path='/Acuerdo' element={<CompCreateAcuerdo2/>} />
            <Route path='/Acuerdo2' element={<CompCreateAcuerdo2/>} />
            <Route path='/Acuerdo/Sign' element={<ViewPdfSign/>} />
          
           </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );*/
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<CompGetUsr/>} />
            <Route path='/Cliente' element={<CompCreateCliente/>} />
            <Route path='/Dispositivo' element={<CompShowDisp/>} />
            <Route path='/Acuerdo' element={<CompCreateAcuerdo2/>} />
            <Route path='/Acuerdo2' element={<CompCreateAcuerdo2/>} />
            <Route path='/Acuerdo/Sign' element={<ViewPdfSign/>} />
           </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
