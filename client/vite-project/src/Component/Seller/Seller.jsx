



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SellerProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     // Fetch products and user details once the component mounts
//     const fetchData = async () => {
//       try {
//         // Get token from URL params
//         const params = new URLSearchParams(window.location.search);
//         const token_key = params.get('login');
//         const token = localStorage.getItem(token_key);

//         // Fetch products
//         const productsResponse = await axios.get('http://localhost:3000/Viewselleraddedproducts', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         console.log("productsResponse",productsResponse)
//         let data  =productsResponse.data.data;
//         console.log(data)
//         setProducts(data);

//         console.log("responssss",productsResponse)
//         // Fetch user data
//         const userId = params.get('id');
//         const userResponse = await axios.get(`http://localhost:3000/singleuser/${userId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         setUser(userResponse.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Failed to fetch products or user data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <div className="d-flex justify-content-evenly navbar">
//         <div className="d-flex">
//           <div className="Onsko p-2">Onsko</div>
//           <div className="home p-2">
//             <a href="./index.html" className="login">Home</a>
//           </div>
//           <div className="home p-2">
//             <a href="./Bestsellers.html" className="login">Store</a>
//           </div>
//           <div className="home p-2">
//             <a href="./About.html" className="login">About</a>
//           </div>
//           <div className="home p-2">
//             <a href="./Contact.html" className="login">Contact</a>
//           </div>
//         </div>
//         <div className="d-flex">
//           <div className="profile">
//             {user && (
//               <div className="text-center dropdown">
//                 <button className="dropbtn px-3">
//                   <span><strong>Hello,</strong> {user.name}</span><br />
//                   <span><strong>Account & Details</strong></span>
//                 </button>
//                 <div className="dropdown-content pt-3">
//                   <div><button onClick={() => alert('Add product')} className="bttn">Add product</button></div>
//                   <div><button onClick={() => alert('My Account')} className="bttn">My Account</button></div>
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="p-2 home">
//             <a href="./login.html" className="login">Login</a>
//           </div>
//           <div className="p-2 home">
//             <a href="./signup.html" className="login">Signup</a>
//           </div>
//           <div className="p-2 home">
//             <a href="./Add-to-cart.html">
//               <img src="https://img.icons8.com/?size=100&id=15893&format=png&color=000000" alt="" className="cart" />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div id="datacontainer">
//         {products.map((item) => (
//           <div className="container" key={item._id}>
//             <div className="products-container">
//               <div className="product">
//                 <div className="img-box" onClick={() => alert(`Viewing ${item._id}`)}>
//                   <img src={item.Images[0]} alt="" className="imgs" />
//                 </div>
//                 <h3>{item.Title}</h3>
//                 <div className="des">{item.Description.slice(0, 40)}</div>
//                 <div className="d-flex orangebox pt-3">
//                   <div className="rating">{item.Rating}<img src="https://img.icons8.com/?size=100&id=tf9WJOzzs4Wo&format=png&color=FFFFFF" className="star" /></div>
//                 </div>
//                 <div className="price pt-2">Rs.{item.Price}</div>
//                 <div className="d-flex justify-content-center pt-3">
//                   <div className="pt-2 p-2"><button onClick={() => alert('Add to cart')} className="addbttn px-3"><img src="https://img.icons8.com/?size=100&id=2qhaGYWA3JF4&format=png&color=000000" className="carticon" /><span className="px-2">Add To Cart</span></button></div>
//                 </div>
//                 <div>
//                   <div className="pt-2 p-2"><button onClick={() => alert('Add to wishlist')} className="addbttn"><img src="https://img.icons8.com/?size=100&id=85339&format=png&color=FA5252" className="heart" alt="" /><span className="px-2">Add To Wishlist</span></button></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="pt-5">
//         <div className="green">
//           <div className="row p-5">
//             <div className="col-2">
//               <div>
//                 <div className="one px-3">Shop</div>
//                 <ul className="pt-4">
//                   <li className="list">Home</li>
//                   <li className="list">About</li>
//                   <li className="list">Shop</li>
//                   <li className="list">Contact</li>
//                 </ul>
//               </div>
//             </div>
//             <div className="col-2">
//               <div>
//                 <div className="one px-3">Shop</div>
//                 <ul className="pt-4">
//                   <li className="list">Home</li>
//                   <li className="list">About</li>
//                   <li className="list">Shop</li>
//                   <li className="list">Contact</li>
//                 </ul>
//               </div>
//             </div>
//             <div className="col-2">
//               <div>
//                 <div className="one px-3">Shop</div>
//                 <ul className="pt-4">
//                   <li className="list">Home</li>
//                   <li className="list">About</li>
//                   <li className="list">Shop</li>
//                   <li className="list">Contact</li>
//                 </ul>
//               </div>
//             </div>
//             <div className="col-6">
//               <div className="sub">Subscribe to our newsletter</div>
//               <div className="be pt-3">Be the first to know about our hottest discounts</div>
//               <div className="pt-3">
//                 <label htmlFor="email" className="label">Email</label>
//                 <div className="pt-2">
//                   <input type="email" className="input" id="email" />
//                   <div className="pt-1">
//                     <input type="checkbox" />
//                     <span className="px-3 span">Yes, subscribe me to your newsletter.</span>
//                   </div>
//                 </div>
//                 <div className="pt-3">
//                   <button className="subb">Subscribe</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerProducts;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token_key = params.get('login');
        const token = localStorage.getItem(token_key);

        if (!token) {
          throw new Error("Authorization token not found.");
        }

        // Fetch products
        const productsResponse = await axios.get('http://localhost:3000/Viewselleraddedproducts', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const productsData = productsResponse.data?.data;
        if (!Array.isArray(productsData)) {
          throw new Error("Invalid products data format from server.");
        }
        console.log(productsData)

        setProducts(productsData);

        // Fetch user
        const userId = params.get('id');
        const userResponse = await axios.get(`http://localhost:3000/singleuser/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userResponse.data?.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch products or user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-evenly navbar">
        <div className="d-flex">
          <div className="Onsko p-2">Onsko</div>
          <div className="home p-2">
            <a href="./index.html" className="login">Home</a>
          </div>
          <div className="home p-2">
            <a href="./Bestsellers.html" className="login">Store</a>
          </div>
          <div className="home p-2">
            <a href="./About.html" className="login">About</a>
          </div>
          <div className="home p-2">
            <a href="./Contact.html" className="login">Contact</a>
          </div>
        </div>
        <div className="d-flex">
          <div className="profile">
            {user && (
              <div className="text-center dropdown">
                <button className="dropbtn px-3">
                  <span><strong>Hello,</strong> {user.name}</span><br />
                  <span><strong>Account & Details</strong></span>
                </button>
                <div className="dropdown-content pt-3">
                  <div>
                    <button onClick={() => alert('Add product')} className="bttn">Add product</button>
                  </div>
                  <div>
                    <button onClick={() => alert('My Account')} className="bttn">My Account</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-2 home">
            <a href="./login.html" className="login">Login</a>
          </div>
          <div className="p-2 home">
            <a href="./signup.html" className="login">Signup</a>
          </div>
          <div className="p-2 home">
            <a href="./Add-to-cart.html">
              <img src="https://img.icons8.com/?size=100&id=15893&format=png&color=000000" alt="" className="cart" />
            </a>
          </div>
        </div>
      </div>

      <div id="datacontainer">
        {products.length > 0 ? (
          products.map((item) => (
            <div className="container" key={item._id}>
              <div className="products-container">
                <div className="product">
                  <div className="img-box" onClick={() => alert(`Viewing ${item._id}`)}>
                    <img src={item.Images?.[0] || "placeholder.jpg"} alt="" className="imgs" />
                  </div>
                  <h3>{item.Title}</h3>
                  <div className="des">{item.Description.slice(0, 40)}</div>
                  <div className="d-flex orangebox pt-3">
                    <div className="rating">
                      {item.Rating || 0}
                      <img src="https://img.icons8.com/?size=100&id=tf9WJOzzs4Wo&format=png&color=FFFFFF" className="star" />
                    </div>
                  </div>
                  <div className="price pt-2">Rs.{item.Price}</div>
                  <div className="d-flex justify-content-center pt-3">
                    <div className="pt-2 p-2">
                      <button onClick={() => alert('Add to cart')} className="addbttn px-3">
                        <img src="https://img.icons8.com/?size=100&id=2qhaGYWA3JF4&format=png&color=000000" className="carticon" />
                        <span className="px-2">Add To Cart</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="pt-2 p-2">
                      <button onClick={() => alert('Add to wishlist')} className="addbttn">
                        <img src="https://img.icons8.com/?size=100&id=85339&format=png&color=FA5252" className="heart" alt="" />
                        <span className="px-2">Add To Wishlist</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>

      <div className="pt-5">
        <div className="green">
          <div className="row p-5">
            <div className="col-2">
              <div>
                <div className="one px-3">Shop</div>
                <ul className="pt-4">
                  <li className="list">Home</li>
                  <li className="list">About</li>
                  <li className="list">Shop</li>
                  <li className="list">Contact</li>
                </ul>
              </div>
            </div>
            <div className="col-2">
              <div>
                <div className="one px-3">Shop</div>
                <ul className="pt-4">
                  <li className="list">Home</li>
                  <li className="list">About</li>
                  <li className="list">Shop</li>
                  <li className="list">Contact</li>
                </ul>
              </div>
            </div>
            <div className="col-2">
              <div>
                <div className="one px-3">Shop</div>
                <ul className="pt-4">
                  <li className="list">Home</li>
                  <li className="list">About</li>
                  <li className="list">Shop</li>
                  <li className="list">Contact</li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <div className="sub">Subscribe to our newsletter</div>
              <div className="be pt-3">Be the first to know about our hottest discounts</div>
              <div className="pt-3">
                <label htmlFor="email" className="label">Email</label>
                <div className="pt-2">
                  <input type="email" className="input" id="email" />
                  <div className="pt-1">
                    <input type="checkbox" />
                    <span className="px-3 span">Yes, subscribe me to your newsletter.</span>
                  </div>
                </div>
                <div className="pt-3">
                  <button className="subb">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;

