import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       console.log("Fetching product list...");

  //       let params = new URLSearchParams(window.location.search);
  //       let token_key = params.get('login');
  //       let token = localStorage.getItem(token_key);
  //       let userId = params.get('userId');
  //       let productId = params.get('id');

  //       console.log("Token Key:", token_key);
  //       console.log("Token:", token);

  //       // Params object for the GET request
  //       let paramsData = {
  //         userId,
  //         productId
  //       };

  //       const response = await axios.get('http://localhost:3000/wishlistproducts', { params: paramsData });

  //       console.log('Response received:', response);

  //       const data = response.data?.data;
  //       console.log('Wishlist data:', data);

  //       const wishlistData = data.map(item => item.wishlist || []);
  //       console.log("wishlistData...........................", wishlistData);

  //       setWishlist(wishlistData);

  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setError("Failed to load products. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWishlist();
  // }, []);
  useEffect(() => {
    async function fetchWishlist() {
        let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);
        let userId = params.get('userId');
        let productId = params.get('id');

        try {
            // Fetch all products
            const allProductsResponse = await fetch("http://localhost:3000/View", {
                method: "GET",
            });

            if (!allProductsResponse.ok) {
                throw new Error("Failed to fetch all products");
            }

            const allProductsData = await allProductsResponse.json();
            const products = allProductsData?.data || []; // Fallback to empty array if data is undefined
            setAllProducts(products);

      

            // Fetch wishlist
            const wishlistResponse = await fetch('http://localhost:3000/wishlistproducts', {
                method: "GET", // Assuming you need POST for sending parameters like `userId`, `productId`
              
            });

            if (!wishlistResponse.ok) {
                throw new Error(`Failed to fetch wishlist. Status: ${wishlistResponse.status}`);
            }

            const wishlistData = await wishlistResponse.json();
            // Ensure wishlistItems is an array, fallback to empty array if not
            const wishlistItems = (Array.isArray(wishlistData?.data) ? wishlistData?.data : []).map(item => item.productId || []);
            console.log("wishlistItems", wishlistItems);

            // Validate wishlist data
            if (!Array.isArray(wishlistItems) || wishlistItems.length === 0) {
                throw new Error("Invalid or empty wishlist data received.");
            }

            // Extract product IDs from the wishlist and match with all products
            const wishlistIds = wishlistItems.flatMap(item => item.productId ? [item.productId] : []);
            const matchedItems = products.filter((product) => wishlistIds.includes(product._id));
            console.log("matchedItems", matchedItems);

            if (matchedItems.length === 0) {
                setErrorMessage("No items in your wishlist match available products.");
            } else {
                setErrorMessage(""); // Clear error message if matches are found
            }

            setWishlist(matchedItems);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            setErrorMessage("Failed to load wishlist. Please try again later.");
            setWishlist([]); // Reset wishlist on error
        }
    }

    fetchWishlist();
}, []);


  // const deleteWishlistProduct = async (itemId) => {
  //   try {
  //     console.log(`Deleting product with ID: ${itemId}`);

  //     let params = new URLSearchParams(window.location.search);
  //     let token_key = params.get('login');
  //     let token = localStorage.getItem(token_key);

  //     await axios.delete(`http://localhost:3000/wishlistproducts/${itemId}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });

  //     console.log(`Product with ID: ${itemId} deleted successfully.`);

  //     // Filter out the deleted product from the wishlist
  //     setWishlist((prevWishlist) => prevWishlist.filter(item => item._id !== itemId));

  //   } catch (error) {
  //     console.error(`Error deleting product with ID ${itemId}:`, error);
  //     alert('Failed to delete the product. Please try again later.');
  //   }
  // };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

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
        {/* <div>
          <div className="trashh">
            <img
              src="https://img.icons8.com/?size=100&id=14237&format=png&color=FA5252"
              className="trash"
              onClick={() => deleteWishlistProduct(itemId)}
            />
          </div>
        </div> */}
      </div>
    );
  })
)}

      
        </div>
      </div>
    </>
  );
}

export default Wishlist;
