import logo from './logo.svg';
import './App.css';

//* importamos los componentes
import CompShowCompus from './CompuForm/ShowCompu';
import CompCreateCompu from './CompuForm/CreateCompu';
import CompEditCompu from './CompuForm/EditCompu';
import CompCreateMovil from './MovilForm/CreateMovil';
import CompShowMovil from './MovilForm/ShowMovil';
import CompEditMovil from './MovilForm/EditMovil';

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
          <Route
            path='/'
            element={
              <>
                <CompShowCompus/>
                <CompShowMovil/>
              </>
            }
          />
          <Route path='/createCompu' element={<CompCreateCompu/>} />
          <Route path='/createMovil' element={<CompCreateMovil/>} />
          <Route path='/editCompu/:id' element={<CompEditCompu/>} />
          <Route path='/editMovil/:id' element={<CompEditMovil/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
