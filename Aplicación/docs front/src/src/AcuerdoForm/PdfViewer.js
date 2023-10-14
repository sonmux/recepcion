import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import './styles.css'; // Reemplaza 'styles.css' con la ruta correcta a tu archivo CSS

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PdfViewer = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  return (
    <div>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          disabled={pageNumber <= 1}
          onClick={() => handlePageChange(pageNumber - 1)}
        >
          Anterior
        </button>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => handlePageChange(pageNumber + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;