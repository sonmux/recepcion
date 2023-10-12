//* importamos las librerias
import axios from 'axios'
import { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import Modal from 'react-modal';

//* importamos los estilos CSS
import '../estilos/formulario.css'
import '../estilos/botones.scss'

//* hacemos una constante para las rutas del back
const URI = 'http://localhost:8000/disp/'
const URILOG = 'http://localhost:8000/log/';

// Configura los encabezados de la solicitud para incluir el token JWT
const headers = {
    'Authorization': `${localStorage.getItem('token')}` // Utiliza el formato 'Bearer Token'
  };

const CompEditCompu = (props) => {
    const [Tipo,setTipo]=useState('')
    const [Marca,setMarca]=useState('')
    const [Modelo,setModelo]=useState('')
    const [Serie,setSerie]=useState('')
    const [Color,setColor]=useState('')
    const [Capacidad,setCapacidad]=useState('')
    const [SerieDisco,setSerieDisco]=useState('')
    const [Sistema,setSistema]=useState('')
    const [Contraseña,setContraseña]=useState('') 
    const [Descripcion,setDescripcion]=useState('') 
    const [Solicitud,setSolicitud]=useState('') 
    const [Fotografia1,setFotografia1]=useState('') 
    const [Fotografia2,setFotografia2]=useState('') 
    const [Fotografia3,setFotografia3]=useState('') 
    const [Fotografia4,setFotografia4]=useState('') 
    //const [IDcliente,setIDcliente]=useState('') 
    const navigate = useNavigate()
    //const {id} = useParams()

    const { id } = props;
    //console.log(id)

    //* procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        try {
            await axios.put(URI+id,{
                tipo: Tipo,
                marca:Marca,
                modelo:Modelo,
                serie:Serie,
                color:Color,
                capacidadDisco:parseInt(Capacidad),
                serieDisco:SerieDisco,
                sistemaOperativo:Sistema,
                contraseñaDispositivo:Contraseña,
                descripcion:Descripcion,
                solicitud:Solicitud,
                foto1:Fotografia1,
                foto2:Fotografia2,
                foto3:Fotografia3,
                foto4:Fotografia4
                /* aqui no se debe actualizar el idCliente
                idCliente:IDcliente
                */
            },{ headers })
            //? función para guardar un log en el sistema
            //const URILOG = 'http://localhost:8000/log/';
            await axios.post(URILOG, {
                usuario: localStorage.getItem("usuario"),
                tema: "Modificar Computadora",
                descripcion:`El usuario ${localStorage.getItem("usuario")} modificó los datos de la computadora con serie: ${Serie}, del cliente con dpi: ${localStorage.getItem("Idcliente")}`
            },{ headers });
            //?------------------
            window.location.reload();
        } catch (error) {
            console.error('Error al agregar la computadora:', error);
            // Aquí puedes manejar errores de manera adecuada, como mostrar un mensaje de error al usuario
        }
    }

    useEffect(() => {
        getCompuById()
    },[])

    const getCompuById = async () => {
        const res = await axios.get(URI+id,{ headers })
        setTipo(res.data.tipo)
        setMarca(res.data.marca)
        setModelo(res.data.modelo)
        setSerie(res.data.serie)
        setColor(res.data.color)
        setCapacidad(res.data.capacidadDisco)
        setSerieDisco(res.data.serieDisco)
        setSistema(res.data.sistemaOperativo)
        setContraseña(res.data.contraseñaDispositivo)
        setDescripcion(res.data.descripcion)
        setSolicitud(res.data.solicitud)
        setFotografia1(res.data.foto1)
        setFotografia2(res.data.foto2)
        setFotografia3(res.data.foto3)
        setFotografia4(res.data.foto4)
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [isModalOpen4, setIsModalOpen4] = useState(false);
    const [capturedImages, setCapturedImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    });

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
        }if(numFoto==4){
            setFotografia4(imageSrc)
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
        } else if (num === 4) {
        setIsModalOpen4(true);
        }
    };

    const closeModal = (num) => {
        if (num === 1) {
        setIsModalOpen1(false);
        } else if (num === 2) {
        setIsModalOpen2(false);
        } else if (num === 3) {
        setIsModalOpen3(false);
        } else if (num === 4) {
        setIsModalOpen4(false);
        }
    };

    //? funcion para recargar la pagina
    const handleReload = () => {
        window.location.reload(); // Recargar la página actual
      };

    return (
        <div id='divEditCompu'>
            <h3>Editar dispositivo Almacenamiento</h3>
            <form onSubmit={update}>
            <div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <input 
                        value={Tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input1EDC'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Marca</label>
                    <input 
                        value={Marca}
                        onChange={(e) => setMarca(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input1EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input 
                        value={Modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input2EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Serie</label>
                    <input 
                        value={Serie}
                        onChange={(e) => setSerie(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input3EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Color</label>
                    <input 
                        value={Color}
                        onChange={(e) => setColor(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input4EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Capacidad</label>
                    <input 
                        value={Capacidad}
                        onChange={(e) => setCapacidad(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input5EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Serie del disco</label>
                    <input 
                        value={SerieDisco}
                        onChange={(e) => setSerieDisco(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input6EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Sistema operativo</label>
                    <input 
                        value={Sistema}
                        onChange={(e) => setSistema(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input7EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña dispositivo</label>
                    <input 
                        value={Contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input8EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Observaciones</label>
                    <textarea 
                        value={Descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input9EDC'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Solicitud</label>
                    <textarea 
                        value={Solicitud}
                        onChange={(e) => setSolicitud(e.target.value)}
                        type="text"
                        className="form-control"
                        id='input10EDC'
                        required
                    />
                </div>
                <div className="mb-3">
                    {/*{imageBase64 ? (<img src={imageBase64} alt=""/>) :
                    (<img src={Fotografia1} alt=""/>)}
                    <input 
                        type="file" 
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload1}
                    />*/}
                    <div>
                        <h2>Foto Frontal</h2>
                        <div>
                            {Fotografia1 ? (<img src={Fotografia1} alt="" width='200px' height='170px'/>) :
                            (<img src={'https://cdn-icons-png.flaticon.com/512/492/492705.png'} alt="" width='200px' height='170px'/>)}
                        </div>
                        <button type="button" onClick={() => { startCamera(1); openModal(1); }} className="pulse" id='pulse'>Cámara frontal</button>
                        <button type="button" onClick={()=>{ startCamera(2); openModal(1); }} className="pulse" id='pulse'>Cámara trasera</button>
                        <Modal
                            isOpen={isModalOpen1}
                            //onRequestClose={closeModal}
                            //contentLabel='Ejemplo de Menú Emergente'
                        >
                            <div>
                                <video ref={videoRef} autoPlay />
                            </div>
                            <button type="button" onClick={() => captureImage(1)} className="pulse" id='pulse'>Tomar Foto Frontal</button>
                        </Modal>
                    </div>
                </div>
                <div className="mb-3">
                    <div>
                        <h2>Foto Posterior</h2>
                        <div>
                            {Fotografia2 ? (<img src={Fotografia2} alt="" width='200px' height='170px'/>) :
                            (<img src={'https://cdn-icons-png.flaticon.com/512/492/492705.png'} alt="" width='200px' height='170px'/>)}
                        </div>
                        <button type="button" onClick={() => { startCamera(1); openModal(2); }} className="pulse" id='pulse'>Cámara frontal</button>
                        <button type="button" onClick={()=>{ startCamera(2); openModal(2); }} className="pulse" id='pulse'>Cámara trasera</button>
                        <Modal
                            isOpen={isModalOpen2}
                        >
                            <div>
                                <video ref={videoRef} autoPlay />
                            </div>
                            <button type="button" onClick={() => captureImage(2)} className="pulse" id='pulse'>Tomar Foto Posterior</button>
                        </Modal>
                    </div>
                </div>
                <div className="mb-3">
                    <div>
                        <h2>Foto Lateral Izq</h2>
                        <div>
                            {Fotografia3 ? (<img src={Fotografia3} alt="" width='200px' height='170px'/>) :
                            (<img src={'https://cdn-icons-png.flaticon.com/512/492/492705.png'} alt="" width='200px' height='170px'/>)}
                        </div>
                        <button type="button" onClick={() => { startCamera(1); openModal(3); }} className="pulse" id='pulse'>Cámara frontal</button>
                        <button type="button" onClick={()=>{ startCamera(2); openModal(3); }} className="pulse" id='pulse'>Cámara trasera</button>
                        <Modal
                            isOpen={isModalOpen3}
                        >
                            <div>
                                <video ref={videoRef} autoPlay />
                            </div>
                            <button type="button" onClick={() => captureImage(3)} className="pulse" id='pulse'>Foto Lateral Izq</button>
                        </Modal>
                    </div>
                </div>
                <div className="mb-3">
                    <div>
                        <h2>Foto Lateral Der</h2>
                        <div>
                            {Fotografia4 ? (<img src={Fotografia4} alt="" width='200px' height='170px'/>) :
                            (<img src={'https://cdn-icons-png.flaticon.com/512/492/492705.png'} alt="" width='200px' height='170px'/>)}
                        </div>
                        <button type="button" onClick={() => { startCamera(1); openModal(4); }} className="pulse" id='pulse'>Cámara frontal</button>
                        <button type="button" onClick={()=>{ startCamera(2); openModal(4); }} className="pulse" id='pulse'>Cámara trasera</button>
                        <Modal
                            isOpen={isModalOpen4}
                        >
                            <div>
                                <video ref={videoRef} autoPlay />
                            </div>
                            <button type="button" onClick={() => captureImage(4)} className="pulse" id='pulse'>Foto Lateral Der</button>
                        </Modal>
                    </div>
                </div>
                <button type='submit' className="btn btn-primary">Actualizar</button>
                <button type="button" className="btn btn-primary" onClick={handleReload}>Cancelar</button>
            </form>
        </div>
    )


}

export default CompEditCompu