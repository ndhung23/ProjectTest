import express, { request, response } from 'express';
import tasksRouters from './routers/tasksRouters.js'; 
import { connectDB } from './src/config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';//cn backend
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001

//middlewares
app.use(express.json());
//cn backend (2)
app.use(cors({origin: ["http://localhost:5173",
                       "http://abc.com"
]}))


app.use("/api/tasks",tasksRouters);
//Ket noi databe xong moi chay o cong 5001
connectDB().then(() => {
    app.listen(PORT,() =>{
        console.log("Server start with port ${PORT}");
    });
});

