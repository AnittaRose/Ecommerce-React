
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Single() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Extract parameters from the URL
        const params = new URLSearchParams(window.location.search);
        const token_key = params.get('login');
        const id = params.get('id');
        let token = localStorage.getItem(token_key);
        console.log("Token:", token);

        console.log("Token Key:", token_key); // Debugging
        console.log("ID:", id); // Debugging


        // Validate the ID parameter
        if (!id) {
          setError("ID parameter is missing in the URL.");
          setLoading(false);
          return;
        }

        // Make API request
        const response = await axios.get(`http://localhost:3000/Single/${encodeURIComponent(id)}`);
        if (response.data && response.data.data) {
          console.log("Fetched Data:", response.data.data);
          
          // Ensure that Images array exists and is not empty
          if (response.data.data.Images && Array.isArray(response.data.data.Images)) {
            setData(response.data.data);
          } else {
            setError("No images found for this product.");
          }
        } else {
          console.error("No data found.");
          setError("No data found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  const Cart = (id,token_key,userId) => {
    navigate(`/Cart?login=${token_key}&id=${id}&userId=${userId}`);
  };

  // Render the component UI
  return (
    <>
      {/* Navigation Bar */}
      <div className="on">
        <div className="d-flex justify-content-evenly navbar122">
          <div className="d-flex">
            <div className="Onsko p-2">
              <a href="./Seller.html" className="login">
                Onsko
              </a>
            </div>
            <div className="home p-2">
              <a href="" className="login">
                Home
              </a>
            </div>
            <div className="home p-2">
              <a href="" className="login">
                Store
              </a>
            </div>
            <div className="home p-2">
              <a href="./About.html" className="login">
                About
              </a>
            </div>
            <div className="home p-2">
              <a href="" className="login">
                Contact
              </a>
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 home">
              <a href="./login.html" className="login">
                Login
              </a>
            </div>
            <div className="p-2 home">
              <a href="./signup.html" className="login">
                Signup
              </a>
            </div>
            <div className="p-2 home">
              <img
                src="https://img.icons8.com/?size=100&id=15893&format=png&color=000000"
                alt="cart"
                className="cart"
              />
            </div>
            <div className="p-2 home">
              <img
                src="https://img.icons8.com/?size=100&id=87&format=png&color=000000"
                alt="wishlist"
                className="whishlist"
              />
            </div>
            <div className="p-2 home">
              <img
                src="https://img.icons8.com/?size=100&id=132&format=png&color=000000"
                alt="search"
                className="search"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Display */}
      {data && (
        <div className="d-flex justify-content-evenly">
          {/* Carousel */}
          <div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {data.Images.map((Images, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img 
                        src={`http://localhost:3000/${Images.replace(/\\/g, '/')}`} 
                        className="d-block w-100" 
                        alt={`Carousel Image ${index + 1}`} 
                      />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="pt-4">
              <div className="fw-bold fs-3">Title: {data.Title}</div>
              <div className="pt-3 fs-4">Description: {data.Description.slice(0, 40)}</div>
              <div className="pt-3 fs-4">Rating: {data.Rating}</div>
              <div className="pt-3 fs-4">Price: {data.Price}</div>
            </div>
            <div className='d-flex'>
              <div className="pt-3">
              <span className="" onClick={()=>Cart(data._id)}>Add To Cart</span>
              </div>
              <div className="pt-3 px-3">
                <button className="bttnadd12">Buy now</button>
              </div>
            </div>
          </div>
        </div>
        
      )}

      <div className=''>
        <div className=''>
          <div className='re'>Reviews</div>
          <div className='pro'>I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.</div>
        </div>
      </div>

      <div className='pt-3'>
        <div className=''>
          <div className='re'>Return & Refund Policy</div>
          <div className='pro'>I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.</div>
        </div>
      </div>

      <div className='pt-3'>
        <div className=''>
          <div className='re'>Shipping Info</div>
          <div className='pro'>

I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.</div>
        </div>
      </div>
      {/* Footer */}
      
    </>
  );
}

export default Single;
