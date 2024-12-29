

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import Myaccount from '../Myaccount/Myaccount';

function View() {
    const params = new URLSearchParams(window.location.search);
    console.log("params", params);

    // Fetch token and user id directly from URL params
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);
    console.log("Token:", token);

    let userId = params.get('id');
    console.log("User ID:", userId);

    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/View', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log("responsedatfufufyu",response.data.data)

                if (response.data && response.data.data) {
                    setProducts(response.data.data);
                }

                console.log(response.data);

                // Fetch user details
                const userResponse = await axios.get(`http://localhost:3000/singleuser/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("userResponse",userResponse)

                setUser(userResponse.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load products or user data');
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [token, userId]);

    if (loading) {
        // return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const Single = (id) => {
        navigate(`/Single?login=${token_key}&id=${id}`);
    };

    const Cart = (id) => {
      navigate(`/Cart?login=${token_key}&id=${id}&userId=${userId}`);
    };

    const Wishlist = (id) => {
        navigate(`/Wishlist?login=${token_key}&id=${id}&userId=${userId}`);
    };

    const Add = (id) => {
        navigate(`/Add?login=${token_key}&id=${id}&userId=${userId}`);
    };

    const Myaccount = (id) =>{
        navigate(`/Myaccount?login=${token_key}&id=${id}`);
    }
    

    return (
        <>
        <div className='pt-4 p-3'>
            <div className='d-flex justify-content-evenly viewnavbar'>
              <div className='d-flex'>
                <div className='px-2 pt-2'><strong>Onsko</strong></div>
                <div className='px-2 pt-2'>Home</div>
                <div className='px-2 pt-2'>Store</div>
                <div className='px-2 pt-2'>About</div>
                <div className='px-2 pt-2'>Contact</div>
                
              </div>

              <div className='d-flex'>
                  <div className="px-2 ">
                      {user && (
                          <div className="text-center dropdown">
                              <button className="drop"><strong>Hello,</strong> {user.name || 'Guest'}</button>
                              <div className="dropdown-content pt-3">
                                  <div><button onClick={()=>Add(userId)} className="dropaddbtn">Add product</button></div>
                                  <div className='pt-3'>
                                      <button onClick={() => Myaccount(userId)} className="dropmybtn">My Accounts</button>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
                  <div className='px-2 pt-2'>Login</div>
                  <div className='px-2 pt-2'>Sign up</div>
                </div>
             </div>
          </div>




          {/* <div className='container'> */}
          <div id="datacontainer" className="product-container">
    {products.length > 0 ? (
        products.map((item) => (
            <div className="product-card" key={item._id}>
                <div className="product">
                    <div
                        className="img-box"
                        onClick={() => alert(`View ${item.Title}`)}
                    >
                        <img
                            src={`http://localhost:3000/${item.Images[0]}`}
                            alt={item.Title}
                            className="proimage"
                            onClick={() => Single(item._id)}
                        />
                    </div>
                    <h3>{item.Title}</h3>
                    <p>{item.Description.slice(0, 40)}</p>
                    <p>Rs.{item.Price}</p>
                    <div className="button-container">
                        <button onClick={() => Cart(item._id)}>
                            Add To Cart
                        </button>
                        <button onClick={() => Wishlist(item._id)}>
                            Add To Wishlist
                        </button>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <p>No products available.</p>
    )}
</div>

        {/* </div> */}


      
 


</>


    );
}

export default View;

