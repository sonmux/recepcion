//* importar axios
import axios from "axios";
//* importar las librerias de react
import {useState} from 'react'
//* importar react-router-dom
import{useNavigate} from 'react-router-dom'
import React, { useRef } from 'react';
import Modal from 'react-modal';

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/disp/'
const URILOG = 'http://localhost:8000/log/';

const CompCreateMovil = () => {
    const [Marca,setMarca]=useState('')
    const [Modelo,setModelo]=useState('')
    const [Imei,setImei]=useState('') 
    const [Serie,setSerie]=useState('')
    const [Color,setColor]=useState('') 
    const [Descripcion,setDescripcion]=useState('') 
    const [Solicitud,setSolicitud]=useState('')
    const [Fotografia1,setFotografia1]=useState('') 
    const [Fotografia2,setFotografia2]=useState('') 
    const [Fotografia3,setFotografia3]=useState('') 
    //const [IDcliente,setIDcliente]=useState('') 
    const navigate = useNavigate()

    //* procedimiento para guardad datos
    const store = async (e) => {
        e.preventDefault()
        try {
            await axios.post(URI,{
                numOrden:localStorage.getItem("RegOrden"),
                tipo:"Móvil",
                marca:Marca,
                modelo:Modelo,
                serie:Serie,
                color:Color,
                capacidadDisco:0,
                serieDisco:'',
                sistemaOperativo:'',
                imei:Imei,
                contraseñaDispositivo:'',
                descripcion:Descripcion,
                solicitud:Solicitud,
                foto1:Fotografia1,
                foto2:Fotografia2,
                foto3:Fotografia3,
                foto4:'',
                idCliente:localStorage.getItem("Idcliente")
            })
            //? función para guardar un log en el sistema
            //const URILOG = 'http://localhost:8000/log/';
            await axios.post(URILOG, {
                usuario: localStorage.getItem("usuario"),
                tema: "Crear Dispositivo Móvil",
                descripcion:`El usuario ${localStorage.getItem("usuario")} registro el dispositivo móvil con serie: ${Serie}, del cliente con dpi: ${localStorage.getItem("Idcliente")}`
            });
            //?------------------


            window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.error('Error al agregar la computadora:', error);
            // Aquí puedes manejar errores de manera adecuada, como mostrar un mensaje de error al usuario
        }
    }

    //? Función para seleccionar las fotos
    /*const [imageBase64, setImageBase64] = useState('');
    const handleImageUpload1 = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            setImageBase64(base64);
            setFotografia1(base64)
        };
        reader.readAsDataURL(file);
        }
    };*/

      const [isModalOpen1, setIsModalOpen1] = useState(false);
      const [isModalOpen2, setIsModalOpen2] = useState(false);
      const [isModalOpen3, setIsModalOpen3] = useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const videoRef = useRef(null);
      const [stream, setStream] = useState(null);
      const [capturedImages, setCapturedImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    });

      const startCamera = async (tipoCamara) => {
        setIsModalOpen(true);
        try {
            var userMediaStream=null;
            if(tipoCamara==1){
                userMediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;     
            }else{
                userMediaStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                    facingMode: { exact: "environment" } // Activar la cámara trasera
                    }
                });
            }
        
        videoRef.current.srcObject = userMediaStream;
        setStream(userMediaStream);
        } catch (error) {
        console.error('Error al acceder a la cámara:', error);
        }
    };

    const openModal = (num) => {
        if (num === 1) {
        setIsModalOpen1(true);
        } else if (num === 2) {
        setIsModalOpen2(true);
        } else if (num === 3) {
        setIsModalOpen3(true);
        }
    };

    const closeModal = (num) => {
        if (num === 1) {
        setIsModalOpen1(false);
        } else if (num === 2) {
        setIsModalOpen2(false);
        } else if (num === 3) {
        setIsModalOpen3(false);
        }
    };

    const captureImage = (numFoto) => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/jpeg');

        // Crear una copia del estado actual de las imágenes capturadas
        const newCapturedImages = { ...capturedImages };
        newCapturedImages[numFoto] = imageSrc;
        closeModal(numFoto)
        if(numFoto==1){
            setFotografia1(imageSrc)
        }else if(numFoto==2){
            setFotografia2(imageSrc)
        }if(numFoto==3){
            setFotografia3(imageSrc)
        }

        // Actualizar el estado con la nueva imagen
        setCapturedImages(newCapturedImages);
        console.log(newCapturedImages)

        // Detener la cámara y desactivar la vista previa
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        videoRef.current.srcObject = null;
        setIsModalOpen(false)
    };

    

    return(
        <div>
            <h3>Agregar dispositivo movil</h3>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="form-label">Marca</label>
                    <input 
                        value={Marca}
                        onChange={(e) => setMarca(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input 
                        value={Modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">IMEI</label>
                    <input 
                        value={Imei}
                        onChange={(e) => setImei(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Serie</label>
                    <input 
                        value={Serie}
                        onChange={(e) => setSerie(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Color</label>
                    <input 
                        value={Color}
                        onChange={(e) => setColor(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Observaciones</label>
                    <textarea 
                        value={Descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Solicitud</label>
                    <textarea 
                        value={Solicitud}
                        onChange={(e) => setSolicitud(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    {/*{imageBase64 ? (<img src={imageBase64} alt=""/>) :
                    (<img src="https://cdn-icons-png.flaticon.com/512/492/492705.png" alt=""/>)}
                    <input 
                        type="file" 
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload1}
                    />*/}
                    <div>
                        <h2>FOTO 1</h2>
                        <button type="button" onClick={() => { startCamera(1); openModal(1); }}>Cámara frontal</button>
                        <button type="button" onClick={()=>{ startCamera(2); openModal(1); }}>Cámara trasera</button>
                        <Modal
                            isOpen={isModalOpen1}
                            //onRequestClose={closeModal}
                            //contentLabel='Ejemplo de Menú Emergente'
                        >
                            <div>
                                <video ref={videoRef} autoPlay />
                            </div>
                            <button type="button" onClick={() => captureImage(1)}>Tomar Foto 1</button>
                        </Modal>
                        {capturedImages[1] && <img src={capturedImages[1]} alt="Captured" />}
                    </div>
                </div>
                <div className="mb-3">
                    <div>
                        <h2>FOTO 2</h2>
                        <button type="button" onClick={() => { startCamera(1); openModal(2); }}>Cámara frontal</button>
                        <button type="button" onClick={()=>{ startCamera(2); openModal(2); }}>Cámara trasera</button>
                        <Modal
                            isOpen={isModalOpen2}
                            //onRequestClose={closeModal}
                            //contentLabel='Ejemplo de Menú Emergente'
                        >
                            <div>
                                <video ref={videoRef} autoPlay />
                            </div>
                            <button type="button" onClick={() => captureImage(2)}>Tomar Foto 2</button>
                        </Modal>
                        {capturedImages[2] && <img src={capturedImages[2]} alt="Captured" />}
                    </div>
                </div>
                <div className="mb-3">
                    <div>
                        <h2>FOTO 2</h2>
                        <button type="button" onClick={() => { startCamera(1); openModal(3); }}>Cámara frontal</button>
                        <button type="button" onClick={()=>{ startCamera(2); openModal(3); }}>Cámara trasera</button>
                        <Modal
                            isOpen={isModalOpen3}
                            //onRequestClose={closeModal}
                            //contentLabel='Ejemplo de Menú Emergente'
                        >
                            <div>
                                <video ref={videoRef} autoPlay />
                            </div>
                            <button type="button" onClick={() => captureImage(3)}>Tomar Foto 3</button>
                        </Modal>
                        {capturedImages[3] && <img src={capturedImages[3]} alt="Captured" />}
                    </div>
                </div>
                <button type='submit' className="btn btn-primary">Agregar</button>
            </form>
        </div>
    )
}

export default CompCreateMovil