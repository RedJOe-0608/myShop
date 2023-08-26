import express from 'express';

import productRoutes from './routes/productRoutes.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
dotenv.config()

const PORT = process.env.PORT || 5000; // fronted running on 3000

connectDB(); // connecting to the database

const app = express();

//so, any time we hit this route, express is going to handle everything from the productRoutes
app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {console.log(`listening on ${PORT}...`)})