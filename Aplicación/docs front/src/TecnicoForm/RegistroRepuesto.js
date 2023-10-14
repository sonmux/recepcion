import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-modal';
import {Link} from 'react-router-dom'

//?imports para la tabla
import "../estilos/tablaInventario.css";
import useColumns from "../InventarioForm/useColumns"
//import usesRows from "./useRows(sin uso)";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'


const URITEC = 'http://localhost:8000/tec/';
const URINV = 'http://localhost:8000/inv/';
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


function CompRegistroRep(props) {
    const columns = useColumns();
    const [data, setDisp] = useState([]);
    const { disp } = props;

    //* Procedimiento para obtener todos los repuestos usados al abrir la pagina
    const [reg, setReg] = useState([])
    useEffect (() => {
        getReg()
    },[])
    //* Procedimiento para mostar todas las tareas asignadas
    const getReg = async () => {
        const res = await axios.get(URITEC+'getRep/'+`${disp}`,{ headers })
        //console.log(res.data)
        setReg(res.data)
    }
  
    // Crear un estado para almacenar la cantidad por fila
    const [cantidadPorFila, setCantidadPorFila] = useState({});
  
    const store = async (e, row) => {
      e.preventDefault();
      //console.log(`Agregar ${cantidadPorFila[row.id]} unidades del inventario ${row.original.id}`);
      try {
        await axios.post(URITEC+'regRep/',{
            perito: localStorage.getItem('usuario'),
            dispositivoId: disp,
            inventarioId: row.original.id,
            cantidad: cantidadPorFila[row.id]
        },{ headers })
        await getDisp();
        await getReg()
      } catch (error) {
        console.error('Error al agregar la registro del inventario:', error);
      }
    };
  
    useEffect(() => {
      getDisp();
    }, []);
  
    const getDisp = async () => {
      const res = await axios.get(URINV, { headers });
      setDisp(res.data.inventario);
    };
  
    const table = useTable({ columns, data }, useGlobalFilter);
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      preGlobalFilteredRows,
      setGlobalFilter,
      state: { globalFilter },
    } = table;
  
    return (
      <div id="divCrearMovil">
        <div className="container" style={{ maxHeight: '420px', overflowY: 'auto' }}>
        <h3>Inventario Disponible</h3>
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
              </tr>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  <td id="head1Table">Action</td>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.filter((row) => row.values.cantidad !== 0).map((row) => {
                    prepareRow(row);
                    const cantidadInput = cantidadPorFila[row.id] || ''; // Obtén la cantidad actual
                    return (
                        <tr {...row.getRowProps()}>
                        <td id="body1Table">
                            <input
                                onChange={(e) => {
                                    setCantidadPorFila((prevCantidad) => ({
                                    ...prevCantidad,
                                    [row.id]: e.target.value,
                                    }));
                                }}
                                type="text"
                                placeholder="#"
                                style={{ width: "40px" }}
                                required={cantidadInput.trim() === ''} // Validación personalizada
                            ></input>
                            <button
                            onClick={(e) => {
                                if (cantidadInput.trim() !== '') {
                                  store(e, row);
                                } else {
                                  alert('El campo de cantidad es obligatorio.');
                                }
                              }}
                            className="btn btn-info"
                            onRequestClose={"closeModal2"}
                            >
                            Agregar
                            </button>
                        </td>
                        {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
        <div className="container">
        
        <h3>Repuestos utilizados en este dispositivo</h3>
        <div className="container" style={{ maxHeight: '420px', overflowY: 'auto' }}>
            <form onSubmit={store}>
                <div className='row'>
                        <div className='col'>
                            <table className='table'>
                                <thead className='table-primary'>
                                    <tr>
                                        <td id='head1Table'>Tipo</td>
                                        <td id='head2Table'>descripcion</td>
                                        <td id='head2Table'>Serie</td>
                                        <td id='head1Table'>Cantidad</td>
                                        <td id='head1Table'>Fecha</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reg.auth ? reg.repuestos.map((regs) => (
                                        <tr key={regs.id}>
                                            <td id='body1Table'>{regs.tipo}</td>
                                            <td id='body2Table'>{regs.descripcion}</td>
                                            <td id='body2Table'>{regs.serie}</td>
                                            <td id='body1Table'>{regs.cantidad}</td>
                                            <td id='body1Table'>{regs.createdAt}</td>
                                        </tr>
                                    )):<></>}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </form>
        </div>
        </div>
      </div>
    );
  }
  

export default CompRegistroRep