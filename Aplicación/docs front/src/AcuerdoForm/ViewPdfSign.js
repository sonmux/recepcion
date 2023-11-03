//* importar axios
import axios from "axios"
//* importar las librerias de react
import {useEffect, useState} from 'react'
//* importar react-router-dom
import {Link} from 'react-router-dom'
import '../estilos/stylesPDF.css';
import { Document, Page, pdfjs } from 'react-pdf';

// Configura la ubicación del worker de pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


//* hacemos una constante para las rutas del back
const URI = process.env.REACT_APP_DIRFRONT+'acuerdo/'
//* hacemos una constante para las rutas del back
const URI2 = process.env.REACT_APP_DIRFRONT+'mailAcuerdo/'

// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
  };

const ViewPdfSign = () => {
    const [PdfFirma, setPdfFirma] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        getPdfFirma();
    }, []);

    const getPdfFirma = async () => {
        try {
            const res = await axios.get(URI + localStorage.getItem("Idcliente"),{ headers });
            const acuerdoBase64 = res.data.acuerdo;

            if (acuerdoBase64) {
                setPdfFirma(acuerdoBase64);
                console.log(res);
                // Envía la cadena base64 por correo electrónico
                enviarPdfPorCorreo(acuerdoBase64);
                
            } else {
                setError('La cadena base64 del PDF está vacía o no es válida.');
            }
        } catch (error) {
            console.error('Error al obtener el PDF en base64', error);
            setError('Error al obtener el PDF en base64');
        }
    }

    const enviarPdfPorCorreo = async (acuerdoBase64) => {
        try {
            const datosusu = await axios.post(URI2, {
                pdfBase64: acuerdoBase64,
                id: localStorage.getItem("Idcliente")
            },{ headers });
            console.log(datosusu);
        } catch (error) {
            console.error('Error al enviar el PDF por correo electrónico', error);
        }
    }

    return (
        <div>
            <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <embed
                    src={`data:application/pdf;base64,${PdfFirma}`}
                    type="application/pdf"
                    width="55%"
                    height="600px"
                    style={{ marginTop: '35px', border: '1px solid #ccc' }}
                ></embed>
            )}
            </div>
            <div>
                <Link to={`/Inicio`} className='btn btn-primary mt-2 mb-2'>Continuar</Link>
            </div>
        </div>
      );
      
}



export default ViewPdfSign