import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { pdf } from '@react-pdf/renderer'; // Importa 'pdf' desde '@react-pdf/renderer'
import SignatureCanvas from 'react-signature-canvas';
import '@react-pdf-viewer/core/lib/styles/index.css';
import './styles.css';
import { PDFDocument } from 'pdf-lib';
import Recibo from "./Recibo";
import jsPDF from 'jspdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const URI = 'http://localhost:8000/acuerdo/';

const App = () => {
  const [pdfBase64, setPdfBase64] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const signatureRef = useRef();
  const [numPages, setNumPages] = useState(null);
  const navigate = useNavigate();

  const handleClearSignature = () => {
    signatureRef.current.clear();
  };

  const handleSaveSignature = async () => {
    const signatureImage = signatureRef.current.toDataURL();

    if (!pdfBase64) {
      return;
    }

    try {
      const originalPdfBytes = new Uint8Array(atob(pdfBase64).split('').map(char => char.charCodeAt(0)));
      const pdfDoc = await PDFDocument.load(originalPdfBytes);
      const page = pdfDoc.getPages()[pageNumber - 1]; // Obtén la página actual
      const image = await pdfDoc.embedPng(signatureImage);
      const { width, height } = image.size();
      const x = 100; // Posición X de la firma
      const y = 100; // Posición Y de la firma

      page.drawImage(image, {
        x,
        y,
        width: width * 0.5,
        height: height * 0.5,
      });

      const modifiedPdfBytes = await pdfDoc.save();
      const modifiedPdfBase64 = btoa(String.fromCharCode.apply(null, modifiedPdfBytes));
      setPdfBase64(modifiedPdfBase64);

      // Aquí puedes enviar modifiedPdfBase64 al servidor si es necesario
      // await axios.post(URI, { acuerdo: modifiedPdfBase64, idCliente: localStorage.getItem("Idcliente") });
      //console.log(modifiedPdfBase64); // Muestra la cadena Base64 en la consola
      await axios.post(URI,{
        acuerdo:modifiedPdfBase64,
        idCliente:localStorage.getItem("Idcliente")
      })
      navigate('/Acuerdo/Sign')

    } catch (error) {
      console.error("Error al guardar la firma en el PDF:", error);
    }
  };

  const [showPdf, setShowPdf] = useState(false);
  const generatePdfAsBase64 = async () => {
    try {
      const URI = 'http://localhost:8000/disp/';
      const pedido = await axios.get(URI);
      console.log(pedido);
      const URI2 = 'http://localhost:8000/cliente/';
      const datos = await axios.get(URI2 + localStorage.getItem("Idcliente"));
      console.log(datos);
      console.log('------------------------------');

      // Utiliza react-pdf para generar el PDF
      const pdfBlob = await pdf(<Recibo datos={datos.data} pedido={pedido.data} />).toBlob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const pdfBase64 = reader.result.split(',')[1]; // Obtén la parte base64 de la cadena de datos
        //console.log(pdfBase64);
        setPdfBase64(pdfBase64);
        setShowPdf(true); // Mostrar el PDF en la página
      };
      reader.readAsDataURL(pdfBlob);
    } catch (error) {
      console.error("Error al obtener datos o generar el PDF:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  return (
    <div>
      <h1>Generador de PDF con Firma</h1>
      <button onClick={generatePdfAsBase64}>Generar PDF y Base64</button>
      {showPdf && pdfBase64 && (
        <div>
          {/* Mostrar el PDF */}
          <div className='cuadroPDF'>
            <Document file={`data:application/pdf;base64,${pdfBase64}`} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
          <div>
            <p>
              Página {pageNumber} de {numPages}
            </p>
            <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>Página anterior</button>
            <button onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber === numPages}>Página siguiente</button>
          </div>
          <div>
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{ width: 400, height: 200, className: 'cuadroFirma' }}
            />
          </div>
          <div>
            <button onClick={handleClearSignature}>Borrar Firma</button>
            <button onClick={handleSaveSignature}>Guardar Firma</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
