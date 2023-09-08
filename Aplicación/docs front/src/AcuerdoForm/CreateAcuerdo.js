import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import DraggableSignature from 'react-digital-signature';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [signature, setSignature] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageNumber(1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleSignature = (signatureDataUrl) => {
    setSignature(signatureDataUrl);
  };

  const downloadSignedPDF = () => {
    // Aquí debes implementar la lógica para descargar el PDF firmado
    // utilizando pdf-lib y ofrecerlo como una descarga para el usuario.
  };

  const savePDFToMySQL = () => {
    // Aquí debes implementar la lógica para convertir el PDF con firma a Base64
    // y enviarlo a tu servidor Express con Axios para guardarlo en MySQL.
  };

  return (
    <div>
      <h1>Firma Digital en React</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {pdfFile && (
        <div>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <DraggableSignature onEnd={handleSignature} 
            style={{display:"inline-block", 
            border:"1px "}}
          />
          <button onClick={downloadSignedPDF}>Descargar PDF Firmado</button>
          <button onClick={savePDFToMySQL}>Guardar en MySQL</button>
        </div>
      )}
    </div>
  );
}

export default App;
