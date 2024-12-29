import React from "react";
import './Buynow.css'; // Ensure the correct path to your CSS file

function Buy() {
  return (
    <div className="container">
      <div className="header">
        <h1>Checkout</h1>
      </div>
      <div className="checkout-form">
        <div className="billing-details">
          <h2 className="text-black">Select Address</h2>
          <div className="address-selection">
            <label>
              <input name="address" type="checkbox" value="address1" />
              123 Main St, Springfield, IL 62701, USA
            </label>
            <label>
              <input name="address" type="checkbox" value="address2" />
              456 Elm St, Springfield, IL 62702, USA
            </label>
            <label>
              <input name="address" type="checkbox" value="address3" />
              789 Oak St, Springfield, IL 62703, USA
            </label>
          </div>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary">
            <div className="item">
              <img
                alt="Black Leather Jacket"
                height={50}
                src="https://storage.googleapis.com/a1aa/image/QnpbwHTwzNbKCVlhgHKkwiSMy0xeeZrlfkxQOlw5AkkKC7ePB.jpg"
                width={50}
              />
              <div className="details">
                <h3>Black Leather Jacket</h3>
                <p>Quantity: 1</p>
              </div>
              <p>$120.00</p>
            </div>
            <div className="item">
              <img
                alt="Blue Denim Jeans"
                height={50}
                src="https://storage.googleapis.com/a1aa/image/CfzHERDsfYgQ6EJmrA2L4Q9ap58wqpm0dOGmCcHmvTFChdfnA.jpg"
                width={50}
              />
              <div className="details">
                <h3>Blue Denim Jeans</h3>
                <p>Quantity: 2</p>
              </div>
              <p>$80.00</p>
            </div>
            <div className="item">
              <img
                alt="White Cotton T-Shirt"
                height={50}
                src="https://storage.googleapis.com/a1aa/image/bRWi8otgGf07ZKGMbTXYkecLiMLS75arLnv7LVdQRAsEhdfnA.jpg"
                width={50}
              />
              <div className="details">
                <h3>White Cotton T-Shirt</h3>
                <p>Quantity: 3</p>
              </div>
              <p>$45.00</p>
            </div>
            <div className="total">
              <p>Total</p>
              <p>$245.00</p>
            </div>
            <button className="checkout-btn">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;

