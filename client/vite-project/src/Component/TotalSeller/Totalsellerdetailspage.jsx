
import React, { useEffect, useState } from "react";
import axios from "axios";

function TotalSellerDetailsPage() {
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sellerDetails");
        setSellers(response.data.totalSeller);
        console.log("response.data.totalSeller", response.data.totalSeller);
      } catch (err) {
        setError("Failed to fetch seller details");
      }
    };

    fetchSellerDetails();
  }, []);

  return (
<div className="dark">
    <div className="mainboxx" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="mt-5" style={{ width: '80%', maxWidth: '1000px' }}>
        <h1 className="mb-4" style={{ textAlign: 'center', color: '#4CAF50' }}>Total Seller Details</h1>
        {error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <table className="table table-bordered" style={{ textAlign: 'center', backgroundColor: '#f4f4f9' }}>
            <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
              <tr>
                <th>No:</th>
                <th>Seller Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>View</th>
                <th>Block/Unblock</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, index) => (
                <tr key={seller._id}>
                  <td>{index + 1}</td>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.phoneno}</td>
                  <td><button className="btn btn-info">See Details</button></td>
                  <td><button className="btn btn-danger">Block</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
</div>
  );
}

export default TotalSellerDetailsPage;
