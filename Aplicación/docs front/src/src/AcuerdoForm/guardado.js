//* importar axios
import axios from "axios"
//* importar las librerias de react
import {useEffect, useState} from 'react'
//* importar react-router-dom
import {useNavigate} from 'react-router-dom'
import './styles.css';
import { Document, Page, pdfjs } from 'react-pdf';

// Configura la ubicación del worker de pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/acuerdo/'

const ViewPdfSign = () => {
    const [PdfFirma, setPdfFirma] = useState('')
    useEffect(() => {
        getPdfFirma()
    },[])
    
    const getPdfFirma = async () => {
        try {
            const res = await axios.get(URI+'qa')
            const acuerdoBase64 = res.data.acuerdo;
    
            if (acuerdoBase64) {
                setPdfFirma(acuerdoBase64);
                console.log(acuerdoBase64)
            } else {
                console.error('La cadena base64 del PDF está vacía o no es válida.');
            }
        } catch (error) {
            console.error('Error al obtener el PDF en base64', error);
        }
    }
    
    return (
        <div>
          {PdfFirma && (
            <Document
              file={{ data: PdfFirma, type: 'application/pdf' }}
              options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
            >
              {/* Puedes mostrar una o más páginas del PDF */}
              <Page pageNumber={1} />
              {/* <Page pageNumber={2} /> */}
              {/* Agrega más páginas según sea necesario */}
            </Document>
          )}
        </div>
      );
}

export default ViewPdfSign



{pdfFile && (
    <object data={pdfFile} type="application/pdf" width="100%" height="500px">
      Tu navegador no admite la visualización de PDF.
    </object>
  )}