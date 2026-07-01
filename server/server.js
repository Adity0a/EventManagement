import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';
import adminRouter from './routes/adminRoutes.js';
import eventRouter from './routes/eventRoutes.js';

const app = express();

await connectDB();

// Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req,res)=>res.send("API is Working"))
app.use('/api/admin', adminRouter)
app.use('/api/event', eventRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT,  ()=>{
    console.log("Server is running on port " + PORT);
})

export default app;
