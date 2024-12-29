
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Cart() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  // const token_key = localStorage.getItem('token_key');
  const userId = params.get('userId');
  const price = parseFloat(params.get('price')) || 0;
  const quantity = parseInt(params.get('quantity'), 10) || 1;
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);


    // Fetch token and user id directly from URL params
    let token_key = params.get('login');
    let id = params.get('userId');

    let token = localStorage.getItem(token_key);
    console.log("Token:", token);

  
 
    const Checkout = (checkoutData, totalPrice) => {
      const params = new URLSearchParams(location.search);
      const id = params.get('userId');
      const token_key = params.get('login');
      const token = localStorage.getItem(token_key);
    
      // Encode the data
      const encodedCheckoutData = encodeURIComponent(JSON.stringify(checkoutData));
      const encodedTotalPrice = encodeURIComponent(totalPrice);
    
      // Proceed with navigation
      navigate(`/OrderPage?id=${encodeURIComponent(id)}&checkoutData=${encodedCheckoutData}&totalPrice=${encodedTotalPrice}`);
    };

  // Helper function to calculate totals
  const calculateTotals = (items) => {
    let totalQty = 0;
    let totalCost = 0;
    items.forEach((item) => {
      totalQty += item.quantity;
      totalCost += item.price * item.quantity;
    });
    setTotalQuantity(totalQty);
    setTotalPrice(totalCost);
  };

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (!productId || !userId) {
          console.error('Missing productId or userId');
          return;
        }

        const data = { productId, userId, price, quantity };
        const cartResponse = await axios.post('http://localhost:3000/Addtocart', data);

        if (cartResponse.status !== 200) {
          throw new Error(`Failed to add to cart: ${cartResponse.status}`);
        }

        const productResponse = await axios.get('http://localhost:3000/View');

        if (productResponse.status !== 200) {
          throw new Error(`Failed to fetch product list: ${productResponse.status}`);
        }

        const productList = productResponse.data.data || [];
        const updatedCartItems = cartResponse.data.data.addCart?.flatMap(cart => cart.items) || [];

        // Match cart items with product list
        const matchedCartItems = updatedCartItems.map(cartItem => {
          const matchingProduct = productList.find(product => product._id === cartItem.productId);
          if (matchingProduct) {
            return { ...cartItem, ...matchingProduct };
          }
          return null;
        }).filter(item => item !== null);

        setCartItems(matchedCartItems);
        calculateTotals(matchedCartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    loadCart();
  }, [productId, userId, price, quantity]);

  const handleQuantityChange = async (item, increment) => {
    const newQuantity = item.quantity + increment;

    if (newQuantity < 1) return; // Prevent zero or negative quantities

    // Optimistic UI update
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.productId === item.productId
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );

    setCartItems(updatedCartItems);

    // Calculate new total
    calculateTotals(updatedCartItems);

    try {
      const response = await axios.post(`http://localhost:3000/updateCarts/${userId}`, {
        productId: item.productId,
        newQuantity,
      });

      if (response.status !== 200) {
        console.error('Failed to update quantity on the server:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const updatedItems = cartItems.filter(item => item.productId !== productId);
      await axios.post('http://localhost:3000/RemoveCartItem', { productId });

      setCartItems(updatedItems);
      calculateTotals(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-wrapper">
      {cartItems.map((item) => {
        const imageUrl = item.Images?.[0]
          ? `http://localhost:3000/${item.Images[0]}`
          : 'http://localhost:3000/path/to/placeholder-image.jpg'; // Fallback image

        return (
          <div key={item.productId} className="cart-item-container">
            <div className="cart-item-content">
              <div className="cart-item-image">
                <img src={imageUrl} alt={item.Title || 'Product'} className="cart-img" />
              </div>
              <div className="cart-item-details">
                <h1 className="cart-item-title">{item.Title}</h1>
                <p className="cart-item-description">{item.Description}</p>
                <h2 className="cart-item-price">${item.price}</h2>
                <h3 className="cart-item-remove" onClick={() => removeCartItem(item.productId)}>Remove</h3>
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-wrapper">
                  <div className="quantity-display">{item.quantity}</div>
                  <div className="quantity-controls d-flex">
                    <button className="quantity-increase" onClick={() => handleQuantityChange(item, 1)}>+</button>
                    <button className="quantity-decrease" onClick={() => handleQuantityChange(item, -1)}>-</button>
                  </div>
                </div>
              </div>
              <div className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        );
      })}

      <div className="cart-summary px-5">
        <h1 className="summary-title">Subtotal</h1>
        <h2 className="summary-items">{totalQuantity} Items</h2>
        <h3 className="summary-total">${totalPrice.toFixed(2)}</h3>
        <h4 className="summary-note">Shipping + Tax Included</h4>
        {/* <button className="checkout-button">Purchase</button> */}
        <button className="checkout-button" onClick={() => Checkout(cartItems,totalPrice)}>
        Purchase
      </button>
      </div>
    </div>
  );
}

export default Cart;
