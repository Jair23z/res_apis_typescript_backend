import express, { request } from "express";
import router from "./router";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
import db from "./config/db";
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'

//Conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue.bold('Conexion exitosa a la base de datos'));
    } catch (error) {
        //   console.log(error);
        console.log(colors.red.bold('Hubo un error en la conexión a la base de datos'));
    }
}

connectDB()

//Instancia de express
const server = express();

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de Cors'))
        }
    }
}

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

//DOcs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUIOptions))

export default server