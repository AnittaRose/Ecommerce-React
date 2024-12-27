const express = require ('express');
const router = express.Router();
const usercontroller = require ('../controllers/usercontroller');
const multer = require('multer');
const upload = require('../utils/upload')

router.post('/user',usercontroller.Createusers);
router.get('/user',usercontroller.view)
router.get('/userall',usercontroller.viewall)
router.get('/user/:id',usercontroller.singleuser)
router.delete('/user/:id', usercontroller.deleteuser);
router.put('/user',usercontroller.edituser);

router.post('/Add', upload.array('Images', 10), usercontroller.addproduct);  // 'Images' is the field name, max 10 files
router.get('/Fetchcategories',usercontroller.fetchCategory);
router.get('/View',usercontroller.viewallproducts);
router.get('/Single/:id',usercontroller.singleproductview);
router.get('/singleuser/:id',usercontroller.soloUser);
router.post('/Addtocart',usercontroller.addToCart)
router.post('/addtowishlist',usercontroller.addToWishlist);
router.get('/wishlistproducts',usercontroller.wishlistaddedproducts);
router.delete('/delete/:id', usercontroller.deleteproduct);
router.get('/singlecartimg/:id',usercontroller.singlecart);
// router.get('/wishsingle/:id',usercontroller.wishlistSingledata)
router.post('/UpdateCart/:userId', usercontroller.updateCart);
router.put('/edit/:id',usercontroller.editsellerproduct);
router.delete('/deleteproduct/:id/:productId',usercontroller.deletewishlistproduct);
router.delete('/deleteproductcart/:id/:productId',usercontroller.deleteaddtocarttproduct);

// router.get('/categories/:categoryId/:productId', usercontroller.getProductsByCategory);






router.get('/Viewselleraddedproducts',usercontroller.ViewallSellerproducts);

module.exports = router