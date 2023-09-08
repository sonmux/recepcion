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

const app = express()
app.use(cors())
// Aumentar el límite de tamaño de carga para solicitudes JSON
app.use(express.json({ limit: '200mb' }));

// Aumentar el límite de tamaño de carga para solicitudes codificadas en URL
app.use(express.urlencoded({ extended: true, limit: '200mb' }));
app.use('/compu', CompuRouter)
app.use('/movil', MovilRouter)
app.use('/cliente', ClienteRouter)
app.use('/acuerdo', AcuerdoRouter)

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