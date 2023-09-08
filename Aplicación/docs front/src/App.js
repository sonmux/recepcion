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

//* importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<CompCreateCliente/>} />
        <Route path='/Acuerdo' element={<CompCreateAcuerdo/>} />
          <Route
            path='/Dispositivo'
            element={
              <>
                <CompShowCompus/>
                <CompShowMovil/>
              </>
            }
          />
          <Route path='/Dispositivo/CreateCompu' element={<CompCreateCompu/>} />
          <Route path='/Dispositivo/CreateMovil' element={<CompCreateMovil/>} />
          <Route path='/Dispositivo/EditCompu/:id' element={<CompEditCompu/>} />
          <Route path='/Dispositivo/EditMovil/:id' element={<CompEditMovil/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
