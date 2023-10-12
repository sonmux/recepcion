import React from 'react';

function ModalCerrar({ onClose }) {
  return (
    <div>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

export default ModalCerrar;