import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnsokHomePage from "./Component/OnsokHomePage/OnsokHomePage";
import './Component/OnsokHomePage/OnsokHomePage.css'
import Login from "./Component/Login/Login";
import './Component/Login/Login.css'
import Signup from "./Component/Signup/Signup";
import './Component/Signup/Signup.css'
import View from "./Component/View/View";
import './Component/View/View.css'
import Single from "./Component/SellerSingle/SellerSingle";
import './Component/SellerSingle/SellerSingle.css'
import Cart from "./Component/Add-to-cart/Add-to-cart";
import './Component/Add-to-cart/Add-to-cart.css'
import Wishlist from "./Component/SellerWishlist";
import './Component/SellerWishlist.css'
import Add from "./Component/Add/Add";
import './Component/Add/Add.css'
import Myaccount from "./Component/Myaccount/Myaccount";
import './Component/Myaccount/Myaccount.css'
import SellerProducts from "./Component/Seller/Seller";
import './Component/Seller/Seller.css'
import Buyer from "./Component/Buyer/Buyer";
import './Component/Buyer/Buyer.css'
// import Single from "./Component/SellerSingle/SellerSingle";
// import './Component/SellerSingle/SellerSingle.css'
// import ProductinAddtoCart from "./Component/Add-to-cart/Add-to-cart";
// import './Component/Add-to-cart/Add-to-cart.css'



function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Correct way to specify the component */}
          <Route path="/" element={<OnsokHomePage />} />
          <Route path="/Login" element={<Login />}/>
          <Route path="/Signup" element={<Signup />}/>
          <Route path="/View" element={<View />} />
          <Route path="/Single" element={<Single />}/>
          <Route path="/Cart" element={<Cart />}/>
          <Route path="/Wishlist" element={<Wishlist />}/>
          <Route path="/Add" element={<Add />}/>
          <Route path="/Myaccount" element={<Myaccount />}/>
          <Route path="/SellerProducts" element={< SellerProducts/>}/>
          {/* <Route path="/Single" element={<Single />}/> */}
          {/* <Route path="/Product" element={<ProductinAddtoCart />}/> */}
          <Route path="/Buyer" element={<Buyer />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
