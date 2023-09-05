import express from 'express';
import path from 'path'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
dotenv.config()

const PORT = process.env.PORT || 5000; // fronted running on 3000

connectDB(); // connecting to the database

const app = express();

//BODY Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//CookieParser middleware
app.use(cookieParser())

//so, any time we hit this route, express is going to handle everything from the productRoutes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req,res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve() //set __dirname to the current working directory
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if(process.env.NODE_ENV === 'production'){
        // set static folder
        app.use(express.static(path.join(__dirname,'/frontend/build')))

        //any route that is not api will be redirected to index.html
        app.get('*',(req,res) => {
            res.sendFile(path.resolve(__dirname,"frontend",'build','index.html'))
        })
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {console.log(`listening on ${PORT}...`)})