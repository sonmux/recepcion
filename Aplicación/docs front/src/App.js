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


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompCreateCliente/>} />
          <Route path='/Dispositivo' element={<CompShowDisp/>} />
          {/*<Route
            path='/Dispositivo'
            element={
              <>
                <CompShowCompus/>
                <CompShowMovil/>
              </>
            }
          />
          <Route path='/Dispositivo/Create' element={<CompCreateDisp/>} />
          <Route path='/Dispositivo/Edit/:id' element={<CompEditDisp/>} />
          <Route path='/Dispositivo/EditCompu/:id' element={<CompEditCompu/>} />
          <Route path='/Dispositivo/EditMovil/:id' element={<CompEditMovil/>} />*/}
          <Route path='/Acuerdo' element={<CompCreateAcuerdo/>} />
          <Route path='/Acuerdo2' element={<CompCreateAcuerdo2/>} />
          <Route path='/Acuerdo/Sign' element={<ViewPdfSign/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
