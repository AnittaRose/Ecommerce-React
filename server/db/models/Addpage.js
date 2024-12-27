const mongoose = require('mongoose');

const AddProductsSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true,
    },
    Price: {
        type: String,
    },
    Rating: {
        type: String,
    },
    Brand: {
        type: String,
    },
    Images: {
        type: [String], // Array of strings for multiple image paths
    },
   
});

const AddProduct = mongoose.model('AddProduct', AddProductsSchema);
module.exports = AddProduct;
