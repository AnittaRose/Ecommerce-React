import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Myaccount() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = new URLSearchParams(window.location.search);
  console.log("params", params);

  // Fetch token and user id directly from URL params
  let token_key = params.get('login');
  let token = localStorage.getItem(token_key);
  console.log("Token:", token);

  let userId = params.get('id');
  console.log("User ID:", userId);

  let id = params.get('id'); // Adjust this if needed based on your logic
  console.log(id);

  const navigate = useNavigate();
  
  // Fetch user data with Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example API call to fetch user data (you can replace this with your actual API)
        // const response = await axios.get("https://api.example.com/userdata");
        // setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const SellerProducts = (id) => {
    // Ensure that the id is correctly passed as a parameter
    navigate(`/SellerProducts?login=${token_key}&id=${id}`);
  };

  return (
    <>
<div className="boxsection">
  <div className="d-flex flex-wrap justify-content-evenly pt-2">
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=108296&format=png&color=000000"
          className="user"
          alt="Profile Icon"
        />
      </div>
      <div className="card-info">
        <span>{userData?.profileName || "My Profile"}</span>
      </div>
      <div className="pt-4">
        <a href="./Profile.html" className="button">Profile</a>
      </div>
    </div>
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=ftv3foQkv3DY&format=png&color=000000"
          className="user"
          alt="Orders Icon"
        />
      </div>
      <div className="card-info">
        <span>My Orders</span>
      </div>
      <div className="pt-4">
        <a href="#" className="button">Orders</a>
      </div>
    </div>
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=rMdkAyHngv7o&format=png&color=000000"
          className="user"
          alt="Wishlist Icon"
        />
      </div>
      <div className="card-info">
        <span>My Wishlist</span>
      </div>
      <div className="pt-4">
        <a href="#" className="button">Wishlist</a>
      </div>
    </div>
  </div>
  <div className="d-flex flex-wrap justify-content-evenly pt-2">
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=pyoKGGx6HHIU&format=png&color=000000"
          className="user"
          alt="Settings Icon"
        />
      </div>
      <div className="card-info">
        <span>Settings</span>
      </div>
      <div className="pt-4">
        <a href="./Settings.html" className="button">Settings</a>
      </div>
    </div>
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=aPAHTIQEcgiq&format=png&color=000000"
          className="user"
          alt="Gift Card Icon"
        />
      </div>
      <div className="card-info">
        <span>Gift Cards</span>
      </div>
      <div className="pt-4">
        <a href="./Giftcard.html" className="button">Gift Cards</a>
      </div>
    </div>
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=biTgjhfJT5Ej&format=png&color=000000"
          alt="Seller Account Icon"
        />
      </div>
      <div className="card-info">
        <span>Seller Account</span>
      </div>
      <div className="pt-4">
        <button className="button" onClick={() => SellerProducts(id)}>Seller Account</button>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default Myaccount;
