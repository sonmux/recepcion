//* importar axios
import axios from "axios"
//* importar las librerias de react
import {useState} from 'react'
//* importar react-router-dom
import {useNavigate} from 'react-router-dom'

import React, { useRef } from 'react';
import Modal from 'react-modal';
//* import para poder utilizar cookies en el navegador
//import Cookies from 'js-cookie'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/cliente/'
const URILOG = 'http://localhost:8000/log/';
//const URI = 'https://prueba-wytc.onrender.com/cliente/'

//* borra la variable de sesión
//sessionStorage.removeItem('Idcliente');
//! borra la cookie
//! Cookies.remove('Idcliente')
//? para borara la variable del local storage
//localStorage.removeItem('Idcliente')

const CompCreateCliente = () => {
    const [Idcliente,setIdcliente]=useState('')
    const [NombreCliente,setNombreCliente]=useState('')
    const [DirecciónCliente,setDirecciónCliente]=useState('')
    const [Telefono,setTelefono]=useState(0)
    const [Correo,setCorreo]=useState('')
    const [Nit,setNit]=useState(0)
    const [DpiFrontal,setDpiFrontal]=useState('')
    const [DpiReverso,setDpiReverso]=useState('')
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI,{
            id: Idcliente,
            nombreCliente: NombreCliente,
            direcciónCliente: DirecciónCliente,
            telefono: parseInt(Telefono),
            correo: Correo,
            nit: parseInt(Nit),
            dpiFrontal: DpiFrontal,
            dpiReverso: DpiReverso
        })
        //? función para guardar un log en el sistema
        //const URILOG = 'http://localhost:8000/log/';
        await axios.post(URILOG, {
            usuario: localStorage.getItem("usuario"),
            tema: "Nuevo Cliente",
            descripcion:`El usuario ${localStorage.getItem("usuario")} ingresó al cliente ${NombreCliente}`
        });
        //?------------------

        //? crear un registro para la orden
        // Crear un objeto Date para obtener la fecha y hora actual
        const fechaHoraActual = new Date();
        // Obtener la fecha en formato YYYYMMDD
        const fechaActual = fechaHoraActual.toISOString().split('T')[0].replace(/-/g, '');
        // Obtener la hora en formato HHMMSS
        const horaActual = fechaHoraActual.toTimeString().split(' ')[0].replace(/:/g, '');
        // Mezclar los valores de fecha y hora en una sola cadena
        const fechaYHora = 'LEFCI' + fechaActual + horaActual;


        //* guarda el id como variable de sesión
        //sessionStorage.setItem("Idcliente", Idcliente);
        //! Para guardar una variable en una cookie
        //!Cookies.set('miVariable', 'miValor');
        //? para guardar datos en local storage
        localStorage.setItem("Idcliente", Idcliente)
        localStorage.setItem("RegOrden", fechaYHora)
        //* ---------
        //navigate('/Acuerdo')
        navigate('/Dispositivo')
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
            setDpiFrontal(base64)
        };
        reader.readAsDataURL(file);
        }
    };*/
    //? Función para tomar una foto
    const videoRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [stream, setStream] = useState(null);
    const [capturedImages, setCapturedImages] = useState({
        1: null,
        2: null,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            setDpiFrontal(imageSrc)
        }else if(numFoto==2){
            setDpiReverso(imageSrc)
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

    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const openModal = (num) => {
        if (num === 1) {
        setIsModalOpen1(true);
        } else if (num === 2) {
        setIsModalOpen2(true);
        }
    };

    const closeModal = (num) => {
        if (num === 1) {
        setIsModalOpen1(false);
        } else if (num === 2) {
        setIsModalOpen2(false);
        }
    };
    

    const [buscarCli,setBuscarCli]=useState('')
    const BuscarCli = async (e) => {
        e.preventDefault()
        //console.log(buscarCli)
        const buscar = await axios.get(URI+buscarCli)
        //console.log(buscar)
        if(buscar.data!=''){
            setIdcliente(buscar.data.id)
            setNombreCliente(buscar.data.nombreCliente)
            setDirecciónCliente(buscar.data.direcciónCliente)
            setTelefono(buscar.data.telefono)
            setCorreo(buscar.data.correo)
            setNit(buscar.data.nit)
            setDpiFrontal(buscar.data.dpiFrontal)
            setDpiReverso(buscar.data.dpiReverso)

            //? función para guardar un log en el sistema
            //const URILOG = 'http://localhost:8000/log/';
            await axios.post(URILOG, {
                usuario: localStorage.getItem("usuario"),
                tema: "Buscar Cliente Exitoso",
                descripcion:`El usuario ${localStorage.getItem("usuario")} realizo la busqueda del cliente ${buscar.data.nombreCliente}, con dpi: ${buscarCli}`
            });
            //?------------------

        }else{
            setIdcliente('')
            setNombreCliente('')
            setDirecciónCliente('')
            setTelefono(0)
            setCorreo('')
            setNit(0)
            setDpiFrontal('')
            setDpiReverso('')
            //? función para guardar un log en el sistema
            await axios.post(URILOG, {
                usuario: localStorage.getItem("usuario"),
                tema: "Buscar Cliente Fallido",
                descripcion:`El usuario ${localStorage.getItem("usuario")} realizo la busqueda de un cliente con dpi: ${buscarCli}`
            });
            //?------------------
        }
    }


    return(
        <div>
            <div className="mb-3">
            <form onSubmit={BuscarCli}>
                <label className="form-label">Buscar</label>
                <input 
                    value={buscarCli}
                    onChange={(e) => setBuscarCli(e.target.value)}
                    type="text"
                    className="form-control"
                    //required 
                />
                <button type='submit' className="btn btn-primary">Buscar cliente</button>
            </form>
            </div>
            <h3>Agregar cliente</h3>
            <form onSubmit={store}>
            <div className="mb-3">
                    <label className="form-label">DPI</label>
                    <input 
                        value={Idcliente}
                        onChange={(e) => setIdcliente(e.target.value)}
                        type="text"
                        className="form-control"
                        //required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input 
                        value={NombreCliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                        type="text"
                        className="form-control"
                        //required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input 
                        value={DirecciónCliente}
                        onChange={(e) => setDirecciónCliente(e.target.value)}
                        type="text"
                        className="form-control"
                        //required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">telefono</label>
                    <input
                    value={Telefono}
                    onChange={(e) => {
                        // Utiliza una expresión regular para eliminar caracteres no numéricos
                        const numericValue = e.target.value.replace(/\D/g, '');
                        setTelefono(numericValue);
                    }}
                    type="text"
                    className="form-control"
                    inputMode="numeric" // Indica que se espera un valor numérico
                    pattern="[0-9]*"  // Acepta solo caracteres numéricos
                    //required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input 
                        value={Correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        type="text"
                        className="form-control"
                        //required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">NIT</label>
                    <input
                    value={Nit}
                    onChange={(e) => {
                        // Utiliza una expresión regular para eliminar caracteres no numéricos
                        const numericValue = e.target.value.replace(/\D/g, '');
                        setNit(numericValue);
                    }}
                    type="text"
                    className="form-control"
                    inputMode="numeric" // Indica que se espera un valor numérico
                    pattern="[0-9]*"  // Acepta solo caracteres numéricos
                    //required 
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
                        //required 
                    />*/}
                    <div>
                        <h2>FOTO 1</h2>
                        <div>
                            {DpiFrontal ? (<img src={DpiFrontal} alt=""/>) :
                            (<img src={'https://cdn-icons-png.flaticon.com/512/492/492705.png'} alt=""/>)}
                        </div>
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
                    </div>
                </div>
                <div className="mb-3">
                    <div>
                        <h2>FOTO 2</h2>
                        <div>
                            {DpiReverso ? (<img src={DpiReverso} alt=""/>) :
                            (<img src={'https://cdn-icons-png.flaticon.com/512/492/492705.png'} alt=""/>)}
                        </div>
                        <button type="button" onClick={() => { startCamera(1); openModal(2); }}>Cámara frontal</button>
                        <button type="button" onClick={()=>{ startCamera(2); openModal(2); }}>Cámara trasera</button>
                        <Modal
                            isOpen={isModalOpen2}
                        >
                            <div>
                                <video ref={videoRef} autoPlay />
                            </div>
                            <button type="button" onClick={() => captureImage(2)}>Tomar Foto 2</button>
                        </Modal>
                    </div>
                </div>
                <button type='submit' className="btn btn-primary">Agregar Cliente</button>
            </form>
        </div>
    )
}
export default CompCreateCliente