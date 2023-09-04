import logo from './logo.svg';
import './App.css';

//* importamos los componentes
import CompShowCompus from './blog/ShowCompu';
import CompCreateCompu from './blog/CreateCompu';
import CompEditCompu from './blog/EditCompu';

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
          <Route path='/' element={<CompShowCompus/>} />
          <Route path='/create' element={<CompCreateCompu/>} />
          <Route path='/edit/:id' element={<CompEditCompu/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
