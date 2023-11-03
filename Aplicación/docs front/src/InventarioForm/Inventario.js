import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-modal';
import {Link} from 'react-router-dom'

//?imports para la tabla
import "../estilos/tablaInventario.css";
import useColumns from "./useColumns"
//import usesRows from "./useRows(sin uso)";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'
import CompCreateInv from "./CreateInv";
import CompEditInv from "./EditInv";

const URI = process.env.REACT_APP_DIRFRONT+'inv/';
// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
  'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
};

function CarsFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const totalCarsAvailable = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onFilterChange = useAsyncDebounce(
    (value) => setGlobalFilter(value || undefined),
    200
  );

  const handleInputChange = (e) => {
    setValue(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <span className="cars-filter">
      Find a device &nbsp;{" "}
      <input
        size={40}
        value={value || ""}
        onChange={handleInputChange}
        placeholder={`${totalCarsAvailable} available models...`}
      />
    </span>
  );
}


function CompInventario(){
  const navigate = useNavigate();
  //const [data, setData] = useState(null)
  const columns = useColumns();
  /*useEffect(() => {
    usesRows().then(result => {
      setData(result);
      console.log(result)
    }).catch(error => {
      console.error(error);
    });
  }, []);*/
  const URINV = process.env.REACT_APP_DIRFRONT+'inv/';
  /*const response = await axios.get(URI);
  const data = response.data.inventario;*/
  const [data, setDisp] = useState([])
    useEffect (() => {
        getDisp()
    },[])
    const getDisp = async () => {
      const res = await axios.get(URINV,{ headers })
      setDisp(res.data.inventario)
    }
  //console.log(data)
  
  const table = useTable({ columns, data }, useGlobalFilter);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { globalFilter }
  } = table;


  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderCreateInv = () => {
    return(
      <CompCreateInv/>
    )
  }

  //*** FUNCION PARA ELIMINAR UN ITEM DEL INVENTARIO */
  const [Razon,setRazon]=useState('')
  const [selectIdDelete, setIdDelete] = useState('')
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const URILOG = process.env.REACT_APP_DIRFRONT+'log/';
  const openModalDelete = (id) => {
    setIdDelete(id)
    setIsModalOpenDelete(true);
  };
  const closeModaDelete = () => {
    //setSelectedOption(null);
  };
  const deleteItem = async (id) => {
      await axios.delete(`${URI}${id}`,{ headers })
      getDisp()
  }
  const renderFormDelete = (id) => {
      const storeEliminar = async (e) => {
          e.preventDefault()
          try {
              await axios.post(URILOG, {
                  usuario: localStorage.getItem("usuario"),
                  tema: "Eliminar un item del inventario",
                  descripcion:`El usuario ${localStorage.getItem("usuario")} eliminó un item del inventario por la razón: ${Razon}`
              },{ headers });
              deleteItem(id)
              //?------------------
              window.location.reload(); // Recargar la página actual
              
              //? otra forma de cerrar el modal
              /*setRazon('')
              setIsModalOpenDelete(false);*/
          } catch (error) {
              console.error('Error al agregar la computadora:', error);
              // Aquí puedes manejar errores de manera adecuada, como mostrar un mensaje de error al usuario
          }
      }

    //? funcion para recargar la pagina
    const handleReload = () => {
        //window.location.reload(); // Recargar la página actual
        setRazon('')
        setIsModalOpenDelete(false);
    };
    return(
      <div id='divEliminarDisp'>
      <h3>Eliminar Dispositivo</h3>
      <form onSubmit={storeEliminar}>
          <div className="mb-3">
              <label className="form-label">¿Por qué desea eliminar este dispositivo?</label>
              <textarea 
                  value={Razon}
                  onChange={(e) => setRazon(e.target.value)}
                  type="text"
                  className="form-control"
                  required
              />
          </div>
          <button type='submit' className="btn btn-primary">Eliminar</button>
          <button type="button" className="btn btn-primary" onClick={handleReload}>Cancelar</button>
      </form>
      </div>
  )
  }

  //*** FUNCION PARA EDITAR LA CANTIDAD UN ITEM DEL INVENTARIO */
  const [selectID, setID] = useState(0)
  //const [selectRrow, setSelectedRow] = useState([])
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const openModalEditar = (id) => {
    //setSelectedRow([0,id])
    //console.log(selectRrow)
    setID(id)
    setIsModalOpenEdit(true);
  };
  const renderFormEdit = (id) => {
    return(
      <CompEditInv id={id} />
    )
  };

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


  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th colSpan={4}>
              <CarsFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
            <th>
              <button onClick={openModal} className='btn btn-primary mt-2 mb-2'>Agregar Equipo</button>
            </th>
            <th>
              <button className='btn btn-primary mt-2 mb-2' onClick={redirigirAInicio}>
                  Regresar al inicio
              </button>
            </th>
          </tr>
          <Modal
              isOpen={isModalOpen}
              id='modalMenuDispositivos'
              //onRequestClose={closeModal}
              //contentLabel='Ejemplo de Menú Emergente'
          >
            <button onClick={closeModal} className='btn btn-primary mt-2 mb-2'>Cerrar</button>
            <div>
              {renderCreateInv()}
            </div>
          </Modal>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <td id='head1Table'>Actions</td>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td id='body1Table'>
                  <button onClick={() => openModalEditar(row.original.id)} className='btn btn-info'  onRequestClose={'closeModal2'}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button onClick={() => openModalDelete(row.original.id)} onRequestClose={closeModaDelete} className='btn btn-danger'>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
          {/* Modal para editar*/}
          <Modal 
            isOpen={isModalOpenEdit}
            id='modalEditar'
          >
            {selectID !== 0 && (
                /* Renderiza el formulario según el ID seleccionado */
                renderFormEdit(selectID)
            )}
          </Modal>
          {/* Modal para eliminar*/}
          <Modal 
            isOpen={isModalOpenDelete}
            id='modalEliminar'
          >
            {renderFormDelete(selectIdDelete)}
          </Modal>
        </tbody>
      </table>
    </div>
  );
}

export default CompInventario