//* importar axios
import axios from "axios"
//* importar las librerias de react
import {useEffect, useState} from 'react'
//* importar react-router-dom
import {Link} from 'react-router-dom'
import './styles.css';
import { Document, Page, pdfjs } from 'react-pdf';

// Configura la ubicación del worker de pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/acuerdo/'
//* hacemos una constante para las rutas del back
const URI2 = 'http://localhost:8000/mailAcuerdo/'

const ViewPdfSign = () => {
    const [PdfFirma, setPdfFirma] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        getPdfFirma();
    }, []);

    const getPdfFirma = async () => {
        try {
            const res = await axios.get(URI + localStorage.getItem("Idcliente"));
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
            });
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
                <Link to={`/Dispositivo/`} className='btn btn-primary mt-2 mb-2'>Continuar</Link>
            </div>
        </div>
      );
      
}



export default ViewPdfSign