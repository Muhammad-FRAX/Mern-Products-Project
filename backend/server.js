import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'

import productRoutes from './routes/product.route.js';

import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config(); // to be able to use dotenv 

const app = express();

app.use(express.json()); // this middldeware allows us to accept json data in the request body

app.use("/api/products",productRoutes );

app.listen(5000, () => {
  connectDB();
  console.log('server started at http://localhost:5000');
});



// 
