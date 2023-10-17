//* importamos la libreria express
import express from "express";
//* importamos la libreria cors
import cors from 'cors'
//* importamos la conexión a la db
import db from "./database/db.js"
//*importamos nuestro enrutador
import CompuRouter from "./routes/CompuRoutes.js";
import MovilRouter from "./routes/MovilRoutes.js";
import ClienteRouter from "./routes/ClienteRoutes.js";
import AcuerdoRouter from "./routes/AcuerdoRoutes.js";
import MailRouter from "./routes/MailRoutes.js";
import DispRouter from "./routes/DispositivoRoutes.js";
import UsuarioRouter from "./routes/UsuarioRoutes.js";
import RegistroRouter from "./routes/RegistroRoutes.js";
import InventarioRouter from "./routes/InventarioRoutes.js";
import TipoRouter from "./routes/TiposRoutes.js";
import RegistroTrabajoRouter from "./routes/RegistroTrabajoRoutes.js";
import TecnicoRouter from "./routes/TecnicoRoutes.js";
import ServicioRouter from "./routes/ServicioRoutes.js";

const app = express()
/*app.use(cors({
    origin: '*', // Cambia esto a la URL de tu aplicación React si es necesario
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: '*',
    credentials: false, // Habilitar el envío de cookies y encabezados de autenticación
  }));*/
  
app.use(cors());

// Aumentar el límite de tamaño de carga para solicitudes JSON
app.use(express.json({ limit: '200mb' }));

// Aumentar el límite de tamaño de carga para solicitudes codificadas en URL
app.use(express.urlencoded({ extended: true, limit: '200mb' }));

//? rutas para el modulo de resepcion
app.use('/compu', CompuRouter)
app.use('/movil', MovilRouter)
app.use('/cliente', ClienteRouter)
app.use('/acuerdo', AcuerdoRouter)
app.use('/mailAcuerdo', MailRouter)
app.use('/disp', DispRouter)
app.use('/usr', UsuarioRouter)
app.use('/log', RegistroRouter)

//! rutas para el modulo de inventario
app.use('/inv', InventarioRouter)
app.use('/tip', TipoRouter)

//? rutas para el modulo de tecnico
app.use('/tec',TecnicoRouter)

// rutas para los servicios dados
app.use('/serv/', ServicioRouter)

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

app.get("/", (req, res) => {
    res.send("HOLA MUNDO!")
})

app.listen(8000, ()=>{
    console.log("Server corriendo en http://localhost:8000/")
})