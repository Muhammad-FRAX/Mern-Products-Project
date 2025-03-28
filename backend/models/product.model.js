import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}); // we create the model that will be the blueprint for the data that we are storing 

const Product = mongoose.model('Product', productschema);

export default Product;
// in javascript we have to declare the stuff that can be used by other file when they
// import this file , otherwise they won't be able to use any of these functions
// there is default and const , for default we can import it with any name we want
// but for const we have to import it with the same name as it is exported {product}