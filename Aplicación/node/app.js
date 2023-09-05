//* importamos la libreria express
import express from "express";
//* importamos la libreria cors
import cors from 'cors'
//* importamos la conexión a la db
import db from "./database/db.js"
//*importamos nuestro enrutador
import router from "./routes/routes.js";
import MovilRouter from "./routes/MovilRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use('/compu', router)
app.use('/movil', MovilRouter)

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