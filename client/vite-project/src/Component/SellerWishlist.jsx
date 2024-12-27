import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        console.log("Fetching product list...");

        let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);
        let userId = params.get('userId');
        let productId = params.get('id');

        console.log("Token Key:", token_key);
        console.log("Token:", token);

        // Params object for the GET request
        let paramsData = {
          userId,
          productId
        };

        const response = await axios.get('http://localhost:3000/wishlistproducts', { params: paramsData });

        console.log('Response received:', response);

        const data = response.data?.data;
        console.log('Wishlist data:', data);

        const wishlistData = data.map(item => item.wishlist || []);
        console.log("wishlistData", wishlistData);

        setWishlist(wishlistData);

      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const deleteWishlistProduct = async (itemId) => {
    try {
      console.log(`Deleting product with ID: ${itemId}`);

      let params = new URLSearchParams(window.location.search);
      let token_key = params.get('login');
      let token = localStorage.getItem(token_key);

      await axios.delete(`http://localhost:3000/wishlistproducts/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(`Product with ID: ${itemId} deleted successfully.`);

      // Filter out the deleted product from the wishlist
      setWishlist((prevWishlist) => prevWishlist.filter(item => item._id !== itemId));

    } catch (error) {
      console.error(`Error deleting product with ID ${itemId}:`, error);
      alert('Failed to delete the product. Please try again later.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className='p-3'>
        <div className="navtopp">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between">
              <div className="Onsko p-2 pt-3">Onsko</div>
              <div className="home p-2 pt-3">Home</div>
              <div className="home p-2 pt-3">Store</div>
              <div className="home p-2 pt-3">
                <a href="./About.html" className="login">
                  About
                </a>
              </div>
              <div className="home p-2 pt-3">Contact</div>
            </div>
            <div className="d-flex">
              <div className="p-2 home pt-3">
                <a href="./login.html" className="login">
                  Login
                </a>
              </div>
              <div className="p-2 home pt-3">
                <a href="./signup.html" className="login">
                  Signup
                </a>
              </div>
              <div className="p-2 home">
                <img
                  src="https://img.icons8.com/?size=100&id=15893&format=png&color=000000"
                  alt=""
                  className="cartimgsmall"
                />
              </div>
              <div className="p-2 home">
                <img
                  src="https://img.icons8.com/?size=100&id=87&format=png&color=000000"
                  alt=""
                  className="wishlistimgsmall"
                />
              </div>
              <div className="p-2 home">
                <img
                  src="https://img.icons8.com/?size=100&id=132&format=png&color=000000"
                  alt=""
                  className="searchh"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="datacontainer" className="wishlist-container pt-5">
        {wishlist.length === 0 ? (
  <p>Your wishlist is empty.</p>
) : (
  wishlist.map((item) => {
    const imageUrl = item.Images?.[0] || 'placeholder.jpg';
    const title = item.Title || "No title available";
    const price = item.Price || "N/A";
    const itemId = item._id || `${item.productId}-${Math.random()}`; // fallback to a combination of productId and random value

    return (
      <div key={itemId} className="shadow-lg p-3 mb-5 bg-body rounded container">
        <div>
          <div onClick={() => console.log(`View details for item ID: ${itemId}`)}>
            <img
              src={imageUrl}
              alt={title}
              className="product-image"
              style={{ width: "100%", height: "auto", maxWidth: "200px" }}
            />
          </div>
          <div className="px-5">
            <p className="titlepara px-2">{title}</p>
            <div className="priceh2 px-2">Rs.{price}</div>
          </div>
        </div>
        <div>
          <div className="trashh">
            <img
              src="https://img.icons8.com/?size=100&id=14237&format=png&color=FA5252"
              className="trash"
              onClick={() => deleteWishlistProduct(itemId)}
            />
          </div>
        </div>
      </div>
    );
  })
)}

        </div>
      </div>
      <div id="datacontainer" />
      <div className="pt-5">
        <div className="green">
          <div className="row p-5">
            <div className="col-2">
              <div>
                <div className="one px-3">Shop</div>
                <ul className="pt-4">
                  <li className="list">home</li>
                  <li className="list">about</li>
                  <li className="list">shop</li>
                  <li className="list">Contact</li>
                </ul>
              </div>
            </div>
            <div className="col-2">
              <div>
                <div className="one px-3">Policy</div>
                <ul className="pt-4">
                  <li className="list">terms &amp; conditions</li>
                  <li className="list">privacy policy</li>
                  <li className="list">refund policy</li>
                  <li className="list">shipping policy</li>
                  <li className="list">accessibility statement</li>
                </ul>
              </div>
            </div>
            <div className="col-2">
              <div>
                <div className="one px-3">contact</div>
                <ul className="pt-4">
                  <li className="list">500 terry francine street</li>
                  <li className="list">san francisco, ca 94158</li>
                  <li className="list">info@mysite.com</li>
                  <li className="list">123-456-7890</li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <div className="sub">subscribe to our newsletter</div>
              <div className="be pt-3">
                be the first to know about our hottest discounts
              </div>
              <div className="pt-3">
                <label htmlFor="pt-2" className="label">
                  Email
                </label>
                <div className="pt-2">
                  <div className="pt-1">
                    <input type="email" className="input" />
                  </div>
                  <div className="pt-1">
                    <input type="checkbox" />
                    <span className="px-3 span">
                      Yes, subscribe me to your newsletter.
                    </span>
                  </div>
                </div>
                <div className="pt-3">
                  <button className="subb">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 pt-5">
            <div className="Onsko1 fw-bold">#Onsko</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
