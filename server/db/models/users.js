
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
            name: { 
                type: String 
            },
            email: { 
                type: String
            },
            phoneno: { 
                type: String,
            },
            password :{
                type:String
            },
            user_type:{

                type :mongoose.Schema.Types.ObjectId,
                ref : "usertypes"
            },
            addCart: [
                {
                 items : [
        
                    {
                        productId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'products', // Reference to the Product collection
                            // required: true,
                        },
                        quantity: {
                            type: Number,
                            // required: true,
                            min: 0,
                        },
                        price: {
                            type: Number,
                            // required: true,
                        },
                    }
                 ],
                    totalPrice: {
                        type: Number,
                        default: 0,
                    }
        
                }
            ],
            wishlist: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'products', // Reference to the Product collection
                        // required: true,
                    },
                    Title: {
                        type: String, // Optional product name for display
                        // required: true,
                    },
                    Price: {
                        type: Number, // Optional product price for display
                        // required: true,
                    }
                }
            ],
});

module.exports = mongoose.model('users', userSchema);
