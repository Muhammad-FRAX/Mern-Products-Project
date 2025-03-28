import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'
import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config(); // to be able to use dotenv 

const app = express();

app.use(express.json()); // this middldeware allows us to accept json data in the request body

app.get('/api/products' , async (req, res) => {
    try {
        const products = await Product.find({}); // fetches all products from the database
        res.status(200).json({success: true, data: products});
    } catch (error) {
        res.status(500).json({success: false, message: "Products not found or server error"});
        console.error("Error in fetching products", error.message);
    }
});

app.post('/api/products', async (req, res) => { // add new product
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false , message: 'Please provide all fields'});
    } // we check if any of the fields is empty

    const newproduct = new Product(product); // creating a new product according to the schema and adding the request data into it

    try {
        await newproduct.save();
        res.status(201).json({success: true, data: newproduct});
    } catch (error){
        console.error("Error in product creation", error.message);
        res.status(500).json({ success: false, message: 'Server Error'});
    }
})

app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deletd successfully"});
    } catch (error) {
        res.status(404).json({success: false, message: "Product not found"});
        //console.error("Error in product deletion", error.message);
    }


});

app.put('/api/products/:id' , async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    //to handle wrong id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product ID"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, message: "Product Updated successfully", data: updatedProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Errror"});
        console.error("Error is product Update", error.message);
    }
})

app.listen(5000, () => {
  connectDB();
  console.log('server started at http://localhost:5000');
});



// 
