import React from 'react';
import ModalCerrar from './ModalCerrar';

function ModalAñadirRepuesto({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Contenido del Modal Añadir Repuesto</p>
        <ModalCerrar onClose={onClose} />
      </div>
    </div>
  );
}

export default ModalAñadirRepuesto;