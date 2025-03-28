import Product from "../models/product.model.js";
import mongoose from "mongoose";

// Get Products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // fetches all products from the database
        res.status(200).json({success: true, data: products});
    } catch (error) {
        res.status(500).json({success: false, message: "Products not found or server error"});
        console.error("Error in fetching products", error.message);
    }
};

// Create Product
export const createProduct = async (req, res) => { // add new product
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
};

// Update Product
export const updateProduct = async (req, res) => {
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
};


// Delete Product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deletd successfully"});
    } catch (error) {
        res.status(404).json({success: false, message: "Product not found"});
        //console.error("Error in product deletion", error.message);
    }


};



