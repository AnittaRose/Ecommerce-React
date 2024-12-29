
const users = require('../db/models/users');
// const usertypes = require('../db/models/users_type');
const { successfunction, errorfunction } = require('../utils/responsehandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Categories = require('../db/models/Categories');
const Addproduct = require('../db/models/Addpage');
const usertypes = require('../db/models/users_type');
const mongoose = require('mongoose');


// const fileUpload = require('../utils/upload').fileUpload;


exports.Createusers = async function (req, res) {
    try {
        const body = req.body;
        console.log('Request body:', body);

        const user_type = await usertypes.findOne({ user_type: body.user_type });
        if (!user_type) {
            return res.status(400).send({
                success: false,
                message: "User type not found."
            });
        }
        body.user_type = user_type._id;

        const userExists = await users.exists({ email: body.email });
        if (userExists) {
            return res.status(400).send(errorfunction({
                statuscode: 400,
                message: "User already exists",
            }));
        }

        body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
        const newUser = await users.create(body);

        return res.status(200).send(successfunction({
            success: true,
            statuscode: 200,
            message: "User added successfully",
            data: newUser
        }));
    } catch (error) {
        console.error('Error in Createusers:', error);
        return res.status(500).send(errorfunction({
            statuscode: 500,
            message: "An error occurred while creating the user.",
            error: error.message
        }));
    }
};
exports.view = async function (req, res) {
    try {
        const userTypes = await usertypes.find();
        return res.status(200).send(successfunction({
            success: true,
            statuscode: 200,
            message: "User types retrieved successfully",
            data: userTypes
        }));
    } catch (error) {
        console.error("Error in view function:", error);
        return res.status(500).send(errorfunction({
            success: false,
            statuscode: 500,
            message: "An error occurred while retrieving user types.",
            error: error.message
        }));
    }
};
exports.viewall = async function (req, res) {
    try {
        let section = await users.find();
        console.log('section', section);

        if (section) {
            res.status(200).json(section);
        } else {
            res.status(404).send('server error');
        }
    } catch (error) {
        console.log('error', error);

    }
}
exports.singleuser = async function (req, res) {

    try {
        let single_id = req.params.id;
        console.log('id from single', single_id);

        let one_data = await users.findOne({ _id: single_id })
        console.log('one_data', one_data);

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "single view success",
            data: one_data

        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {
        console.log("error", error);

        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"

        })
        res.status(response.statuscode).send(response)
        return;

    }
};
// In userController.js (or the file where deleteuser is defined)
exports.deleteuser = async function (req, res) {
    try {
        let delete_id = req.params.id;
        console.log('delete_id', delete_id);

        let delete_onedata = await users.deleteOne({ _id: delete_id });
        res.status(200).send(delete_onedata);
    } catch (error) {
        console.log('error', error);
        res.status(500).send({ error: 'Failed to delete user' });
    }
};
exports.edituser = async function (req, res) {
    try {
        let body = req.body;
        console.log('body', body);


        let data = {
            name: body.name,
            email: body.email,
            password: body.password,
            phoneno: body.phoneno,
            user_type: body.user_type
        }


        let id = req.params.id;

        let updatedata = await users.updateOne({ _id: id }, { $set: data });
        console.log('updatedata', updatedata);

        let strupdatedata = JSON.stringify(updatedata);
        console.log('strupdatedata', strupdatedata)

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: " updated Successfully",
            data: updatedata

        })
        res.status(response.statuscode).send(response)
        return;



    } catch (error) {

        console.log("error : ", error);
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"

        })
        res.status(response.statuscode).send(response)
        return;
    }
};
exports.addproduct = async function (req, res) {
    try {
        const body = req.body;

        console.log('Received Body:', body);

        // Validate and find the category
        const category = await Categories.findOne({ Category: body.Category });

        if (!category) {
            return res.status(400).send({
                success: false,
                message: "Invalid Category.",
            });
        }

        body.Category = category._id; // Set category ID for the product

        // Check if files are uploaded
        if (req.files && req.files.length > 0) {
            // Handle image uploads
            const imagePaths = req.files.map(file => {
                return file.path; // Use the relative file path stored by multer
            });
            body.Images = imagePaths; // Save the paths of uploaded images
        } else {
            return res.status(400).send({
                success: false,
                message: "No images uploaded.",
            });
        }

        // Add the product
        const newProduct = await Addproduct.create(body);
        console.log('New Product:', newProduct);

        return res.status(200).send({
            success: true,
            statusCode: 200,
            message: "Product Added Successfully",
            data: newProduct
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            success: false,
            statusCode: 500,
            message: "An error occurred while adding the product.",
            error: error.message
        });
    }
};
exports.fetchCategory = async function (req, res) {
    try {

        let Category = await Categories.find();
        console.log("category", Category);



        let response = successfunction({
            success: true,
            statusCode: 200,
            data: Category,
            message: "Category Added Successfully"

        });
        res.status(response.statuscode).send(response);
        return;


    } catch (error) {
        console.log(error);
    }
}
exports.viewallproducts = async function (req, res) {
    try {
        let section = await Addproduct.find().populate('Category')
        console.log('section', section);

        if(section){
            let response = successfunction({
                success : true,
                message : "data fetched",
                statuscode : 200,
                data : section
            })
            return res.status(response.statuscode).send(response);
        }else{
            let response =errorfunction({
                success : false,
                statuscode : 400,
                message : "sinethibg went wrong"
            });
            return res.status(response.statuscode).send(response)
        }
    } catch (error) {
        console.log('error', error);

    }
};
exports.singleproductview = async function (req,res){
    try {
        let single_id = req.params.id;
        console.log('id from single',single_id);
    
        let singledata = await Addproduct.findOne({_id: single_id}).populate('Category')
        console.log('singledata',singledata);
    
        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "singleProduct view success",
            data: singledata
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       } catch (error) {
        console.log("error",error);
    
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       }  

};
exports.soloUser = async function (req, res) {

    try {

        Singleid = req.params.id
        console.log("Singleid", Singleid);

        SingleData = await users.findOne({ _id: Singleid });
        console.log("SingleUser", SingleData);

        let response = successfunction({
            success: true,
            statuscode: 200,
            data: SingleData,
            message: "successfully get the single data.."
        });
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = errorfunction({
            success: false,
            statuscode: 400,

            message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    }

}
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate quantity
        if (!quantity || quantity < 1) {
            let response = errorfunction({
                success: false,
                statuscode: 400,
                message: "Quantity must be at least 1"
            });
            return res.status(response.statuscode).send(response);
        }

        // Fetch user
        const user = await users.findById(userId);
        if (!user) {
            let response = errorfunction({
                success: false,
                statuscode: 404,
                message: "User not found!"
            });
            return res.status(response.statuscode).send(response);
        }

        // Fetch product
        const product = await Addproduct.findById(productId);
        if (!product) {
            let response = errorfunction({
                success: false,
                statuscode: 404,
                message: "Product not found!"
            });
            return res.status(response.statuscode).send(response);
        }

        const price = product.Price; // Get the price from the product

        // Check if the user already has a cart
        let cart = user.addCart[0]; // Assuming there's only one cart per user

        if (!cart) {
            // Create a new cart if none exists
            cart = { items: [], totalPrice: 0 };
            user.addCart.push(cart);
        }

        // Check if the product already exists in the cart
        const existingProductIndex = cart.items.findIndex(item => item.productId?.toString() === productId);

        if (existingProductIndex !== -1) {
            // Update quantity and price if product exists
            cart.items[existingProductIndex].quantity += quantity;
        } else {
            // Add the new product to the cart
            cart.items.push({ productId, quantity, price });
        }
        console.log(existingProductIndex)

        // Recalculate the cart's total price
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        // Save updated user data
        await user.save();

        let response = successfunction({
            success: true,
            statuscode: 200,
            data: user,
            message: "Item successfully added to the cart."
        });
        res.status(response.statuscode).send(response);
    } catch (error) {
        console.error("Error: ", error);
        let response = errorfunction({
            success: false,
            statuscode: 500,
            message: "Internal server error"
        });
        res.status(response.statuscode).send(response);
    }
};
exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId, Title, Price } = req.body;

        // Fetch user
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).send(
                errorfunction({
                    success: false,
                    statuscode: 404,
                    message: "User not found!"
                })
            );
        }

        // Fetch product
        const product = await Addproduct.findById(productId).lean();
        if (!product) {
            return res.status(404).send(
                errorfunction({
                    success: false,
                    statuscode: 404,
                    message: "Product not found!"
                })
            );
        }

        // Check if the product is already in the wishlist
        const isProductInWishlist = user.wishlist.some(
            (item) => item.productId.toString() === productId
        );
        if (isProductInWishlist) {
            return res.status(400).send(
                errorfunction({
                    success: false,
                    statuscode: 400,
                    message: "Product already in wishlist!"
                })
            );
        }

        // Add product to wishlist
        user.wishlist.push({
            productId,
            Title: product.Title || Price,
            Price: product.Price || Price,
        });

        // Save updated user data
        await user.save();

        return res.status(200).send(
            successfunction({
                success: true,
                statuscode: 200,
                data: { productId, Title: product.Title || Title, Price: product.Price || Price },
                message: "Item successfully added to the wishlist."
                
            })
        );
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).send(
            errorfunction({
                success: false,
                statuscode: 500,
                message: "Internal server error"
            })
        );
    }
};
exports.ViewallSellerproducts = async function (req, res) {
    try {
        let section = await Addproduct.find()
        console.log('section', section);

        if(section){
            let response = successfunction({
                success : true,
                message : "data fetched",
                statuscode : 200,
                data : section
            })
            return res.status(response.statuscode).send(response);
        }else{
            let response =errorfunction({
                success : false,
                statuscode : 400,
                message : "sinethibg went wrong"
            });
            return res.status(response.statuscode).send(response)
        }
    } catch (error) {
        console.log('error', error);

    }
};
// exports.wishlistaddedproducts = async function (req, res) {
//     try {
//         let section = await users.wishlist.find()
//         console.log('section', section);

//         if(section){
//             let response = successfunction({
//                 success : true,
//                 message : "data fetched",
//                 statuscode : 200,
//                 data : section
//             })
//             return res.status(response.statuscode).send(response);
//         }else{
//             let response =errorfunction({
//                 success : false,
//                 statuscode : 400,
//                 message : "sinethibg went wrong"
//             });
//             return res.status(response.statuscode).send(response)
//         }
//     } catch (error) {
//         console.log('error', error);

//     }
// };

exports.wishlistaddedproducts = async function (req, res) {
    try {
        const { id } = req.params;  // Extract the 'id' from the request parameters

        // Ensure that 'users' model is properly defined
        if (!users) {
            let response = errorfunction({
                success: false,
                statuscode: 500,
                message: "Users model not defined"
            });
            return res.status(response.statuscode).send(response);
        }

        // Fetch wishlist data for the specific user from the 'users' model
        let section = await users.findOne({ _id: id }, { wishlist: 1 });  // Assuming '_id' is the unique identifier

        if (section && section.wishlist && section.wishlist.length > 0) {
            // Successfully fetched data, send response
            let response = successfunction({
                success: true,
                message: "Data fetched successfully",
                statuscode: 200,
                data: section.wishlist
            });
            return res.status(response.statuscode).send(response);
        } else {
            // No data found, send error response
            let response = errorfunction({
                success: false,
                statuscode: 404,  // No wishlist data for the user
                message: "No items found in the wishlist"
            });
            return res.status(response.statuscode).send(response);
        }
    } catch (error) {
        console.log('error', error);
        // Send internal server error in case of unexpected failure
        let response = errorfunction({
            success: false,
            statuscode: 500,
            message: "Something went wrong while fetching the wishlist data"
        });
        return res.status(response.statuscode).send(response);
    }
};









exports.deleteproduct = async (req, res) => {
    try {
        const delete_id = req.params.id;
        console.log('delete_id:', delete_id);

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(delete_id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Attempt to delete the product
        const delete_onedata = await Addproduct.deleteOne({ _id: delete_id });
        console.log('Deleted Data:', delete_onedata);

        if (delete_onedata.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product deleted successfully", delete_onedata });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
// exports.deleteproductinwishlist = async (req, res) => {
//     try {
//         const userId = req.params.id; // Assuming the user's ID is available in the request (e.g., via middleware)
//         const productId = req.body // Product ID to be deleted
//         console.log('delete_id:', productId);

//         // Validate product ID format
//         if (!mongoose.Types.ObjectId.isValid(productId)) {
//             return res.status(400).json({ message: "Invalid Product ID format" });
//         }

//         // Validate user ID format (optional but good practice)
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid User ID format" });
//         }

//         // Attempt to remove the product from the wishlist
//         const result = await users.updateOne(
//             { _id: userId }, // Find the user by their ID
//             { $pull: { wishlist: productId } } // Remove the product ID from the wishlist
//         );

//         console.log('Update Result:', result);

//         if (result.modifiedCount === 0) {
//             return res.status(404).json({ message: "Product not found in wishlist." });
//         }

//         res.status(200).json({ message: "Product deleted from wishlist successfully" });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: "Internal Server Error", error });
//     }
// };
exports.singlecart = async function (req,res){
    try {
        let single_id = req.params.id;
        console.log('id from single',single_id);
    
        let singledata = await Addproduct.findOne({_id: single_id})
        console.log('singledata',singledata);
    
        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "singleProduct view success",
            data: singledata
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       } catch (error) {
        console.log("error",error);
    
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       }  

};
exports.wishlistSingledata = async function (req, res) {
    try {
        let productId = req.params.id;
        console.log('Product ID from request:', productId);
    
        // Find the product from the Addproduct collection
        let singledata = await Addproduct.findOne({ _id: productId });
        console.log('Product data:', singledata);

        if (!singledata) {
            let response = errorfunction({
                success: false,
                statuscode: 404,
                message: "Product not found"
            });
            res.status(response.statuscode).send(response);
            return;
        }

        // Assuming the user ID is in req.user.id or you need to fetch from a token/session
        let user = await users.findOne({ _id: req.body.id });  // Adjust to the actual way you're handling user IDs

        if (!user) {
            let response = errorfunction({
                success: false,
                statuscode: 404,
                message: "User not found"
            });
            res.status(response.statuscode).send(response);
            return;
        }

        // Check if the product is already in the user's collection
        if (user.wishlist.includes(productId)) {  // Assuming 'wishlist' stores product IDs
            let response = errorfunction({
                success: false,
                statuscode: 400,
                message: "Product already in user's collection"
            });
            res.status(response.statuscode).send(response);
            return;
        }

        // Add the product to the user's wishlist
        user.wishlist.push(productId);  // Correct the variable name to productId
        await user.save(); // Save the updated user document

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "Product added to user collection successfully",
            data: singledata
        });
        res.status(response.statuscode).send(response);
        return;
    
    } catch (error) {
        console.log("Error:", error);
    
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "Error occurred while processing your request"
        });
        res.status(response.statuscode).send(response);
        return;
    }
};
exports.deletewishlistproduct = async (req, res) => {
    try {
      const { id, productId } = req.params;
  
      // Use $pull to remove the product from the wishlist
      const updateResult = await users.findByIdAndUpdate(
        id,
        { $pull: { wishlist: { productId: productId } } },
        { new: true } // Return the updated document
      );
  
      // Check if the user exists
      if (!updateResult) {
        return res.status(404).json({
          success: false,
          statuscode: 404,
          data: null,
          message: "User not found",
        });
      }
  
      // Check if the product was removed (by comparing wishlist before and after)
      const productExists = updateResult.wishlist.some(
        (item) => item.productId.toString() === productId
      );
  
      if (productExists) {
        return res.status(400).json({
          success: false,
          statuscode: 400,
          data: null,
          message: "Product not found in wishlist",
        });
      }
  
      // Return the updated wishlist
      res.status(200).json({
        success: true,
        statuscode: 200,
        data: updateResult.wishlist,
        message: "Product removed from wishlist successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        statuscode: 500,
        data: null,
        message: "Internal Server Error",
      });
    }
};
exports.deleteaddtocarttproduct = async (req, res) => {
    try {
        const { id, productId } = req.params;

        // Use $pull with dot notation to target nested arrays in addCart.items
        const updateResult = await users.findOneAndUpdate(
            { _id: id },  // Match user by ID
            { $pull: { "addCart.items": { _id: productId } } },  // Remove the specific product by its _id
            { new: true }  // Return the updated document
        );

        // Check if the user or product exists
        if (!updateResult) {
            return res.status(404).json({
                success: false,
                statuscode: 404,
                message: "User or product not found",
            });
        }

        // Recalculate total price after removing the product
        const updatedAddCart = updateResult.addCart;
        if (updatedAddCart && updatedAddCart.items.length > 0) {
            updatedAddCart.totalPrice = updatedAddCart.items.reduce((sum, item) => sum + item.price, 0); // Adjust according to your schema
        } else {
            updatedAddCart.totalPrice = 0;
        }

        // Save the updated total price
        await users.updateOne(
            { _id: id },
            { $set: { "addCart.totalPrice": updatedAddCart.totalPrice } }
        );

        // Return the updated addCart
        res.status(200).json({
            success: true,
            statuscode: 200,
            data: updatedAddCart,
            message: "Product removed from addCart successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            statuscode: 500,
            data: null,
            message: "Internal Server Error",
        });
    }
};
// exports.getProductsByCategory = async (req, res) => {
//     try {
//         const { categoryId } = req.params;

//         // Validate category existence
//         const category = await Categories.findById(categoryId);
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }

//         // Fetch products associated with the category
//         const products = await Addproduct.find({ category: categoryId }).populate('category');
//         return res.status(200).json({
//             category: Categories.Category, // Send category name
//             products
//         });
//     } catch (error) {
//         console.error('Error fetching products by category:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };
exports.editsellerproduct = async function (req, res) {
    try {
        const body = req.body;

        // Validate Request Body
        if (!body.Title || !body.Description || !body.Price || !body.Stock || !body.Brand || !body.Category || !body.Images) {
            return res.status(400).send({
                success: false,
                statuscode: 400,
                message: "Missing required fields in the request body",
            });
        }

        const id = req.params.id;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                statuscode: 400,
                message: "Invalid ID",
            });
        }

        const data = {
            Title: body.Title,
            Description: body.Description,
            Price: body.Price,
            Stock: body.Stock,
            Brand: body.Brand,
            Category: body.Category,
            Images: body.Images,
        };

        console.log('Update Data:', data);

        const updatedata = await Addproduct.updateOne(
            { _id: id },
            { $set: data }
        );

        console.log('Update Response:', updatedata);

        if (updatedata.modifiedCount === 0) {
            return res.status(404).send({
                success: false,
                statuscode: 404,
                message: "No matching document found or no fields updated",
            });
        }

        res.status(200).send({
            success: true,
            statuscode: 200,
            message: "Updated Successfully",
            data: updatedata,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            success: false,
            statuscode: 500,
            message: "An error occurred",
        });
    }
};


exports.updateCart = async (req, res) => {
    try {
        const { productId, newQuantity } = req.body;
        const {userId} = req.params;  // Extract userId from params

        // Log the userId to debug
        console.log("userId from request:", userId);

        // Check if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format." });
        }

        // Validate the quantity
        const quantity = parseInt(newQuantity, 10);
        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Quantity must be a positive number." });
        }

        // Find the user by userId
        const user = await users.findById(userId);
        if (!user) {
            console.log("User not found with ID:", userId); // Log for debugging
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Assuming the cart is stored in user.addCart[0]
        const cart = user.addCart && user.addCart[0];
        if (!cart) {
            return res.status(400).json({ success: false, message: "Cart is empty!" });
        }

        // Find the product index in the cart
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart!" });
        }

        // Update the quantity of the product
        cart.items[productIndex].quantity = quantity;

        // Recalculate the total price (ensure the price is stored for each product)
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        // Save the updated cart back to the user's addCart array
        await user.save();

        // Respond with the updated cart
        res.status(200).json({ success: true, message: "Cart updated successfully.", cart });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.totalBuyers = async (req, res) => {
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const buyerType = await usertypes.findOne({ user_type: 'Buyer' });
        console.log("buyerType :",buyerType)
        
        if (!buyerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const buyerCount = await users.countDocuments({ user_type: buyerType._id });
        console.log(buyerCount)
        
        res.json({ totalBuyers: buyerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
};


exports.totalseller = async (req, res) => {
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const sellerType = await usertypes.findOne({ user_type: 'Seller' });
        console.log("sellerType :",sellerType)
        
        if (!sellerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const sellerCount = await users.countDocuments({ user_type: sellerType._id });
        console.log(sellerCount)
        
        res.json({ totalSeller: sellerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
};

exports.sellerDetails = async (req, res) =>{
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const sellerType = await usertypes.findOne({ user_type: 'Seller' });
        console.log("sellerType :",sellerType)
        
        if (!sellerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const sellerCount = await users.find({ user_type: sellerType._id });
        console.log(sellerCount)
        
        res.json({ totalSeller: sellerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
}
  

exports.BuyerDetails = async (req, res) =>{
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const BuyerType = await usertypes.findOne({ user_type: 'Buyer' });
        console.log("BuyerType :",BuyerType)
        
        if (!BuyerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const BuyerCount = await users.find({ user_type: BuyerType._id });
        console.log(BuyerCount)
        
        res.json({ totalBuyer: BuyerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
}









  
exports.orderItems = async (req, res) => {
    try {
        // Assuming the user's ID is available in the request (e.g., from authentication middleware)
        const userId = req.params.userId;

        // Fetch the user's orders from the "buyNow" section
        const user = await users.findById(userId).select('buyNow'); // Select only the "buyNow" field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the orders in the response
        res.status(200).json({ orders: user.buyNow });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
  
  
    



