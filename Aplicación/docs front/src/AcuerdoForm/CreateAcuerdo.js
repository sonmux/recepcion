//* importar axios
import axios from "axios";
//* importar react-router-dom
import {useNavigate} from 'react-router-dom'
import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import SignatureCanvas from 'react-signature-canvas';
import '@react-pdf-viewer/core/lib/styles/index.css';
import './styles.css';
import { PDFDocument } from 'pdf-lib';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Configura la ubicación del worker de pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/acuerdo/'

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const signatureRef = useRef();
  const [numPages, setNumPages] = useState(null);
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(URL.createObjectURL(file));
  };

  const handleClearSignature = () => {
    signatureRef.current.clear();
  };

  const handleSaveSignature = async () => {
    const signatureImage = signatureRef.current.toDataURL();

    if (!pdfFile) {
      return;
    }

    const originalPdfBytes = await fetch(pdfFile).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(new Uint8Array(originalPdfBytes));
    const pages = pdfDoc.getPages();

    if (pageNumber <= pages.length) {
      const page = pages[pageNumber - 1];

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
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      setPdfFile(URL.createObjectURL(modifiedPdfBlob));
      let binaryString = '';
      modifiedPdfBytes.forEach((byte) => {
        binaryString += String.fromCharCode(byte);
      });

      // Convierte la cadena a Base64
      const base64modifiedPdf = btoa(binaryString);

      
      await axios.post(URI,{
        acuerdo:base64modifiedPdf,
        idCliente:localStorage.getItem("Idcliente")
      })
      
      console.log(base64modifiedPdf); // Muestra la cadena Base64 en la consola
      navigate('/Acuerdo/Sign')
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div>
      <h1>Aplicación de Firma Electrónica</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {pdfFile && (
        <div>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <p>
              Página {pageNumber} de {numPages}
            </p>
            <button
              onClick={() => setPageNumber(pageNumber - 1)}
              disabled={pageNumber <= 1}
            >
              Anterior
            </button>
            <button
              onClick={() => setPageNumber(pageNumber + 1)}
              disabled={pageNumber >= numPages}
            >
              Siguiente
            </button>
          </div>
          <div>
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{ width: 400, height: 200, className: "cuadroFirma" }}
            />
          </div>
          <div>
            <button onClick={handleClearSignature}>Borrar Firma</button>
            <button onClick={handleSaveSignature}>Guardar Firma como Base64</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
