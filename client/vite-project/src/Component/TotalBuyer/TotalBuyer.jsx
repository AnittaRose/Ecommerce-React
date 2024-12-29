
import React, { useEffect, useState } from "react";
import axios from "axios";

function TotalBuyerpage() {
  const [Buyers, setBuyers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyerDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/buyerDetails");
        setBuyers(response.data.totalBuyer);
        console.log("response.data.totalBuyer", response.data.totalBuyer);
      } catch (err) {
        setError("Failed to fetch Buyer details");
      }
    };

    fetchBuyerDetails();
  }, []);

  return (
<div className="dark">
    <div className="mainboxx" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="mt-5" style={{ width: '80%', maxWidth: '1000px' }}>
        <h1 className="mb-4" style={{ textAlign: 'center', color: '#4CAF50' }}>Total Buyer Details</h1>
        {error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <table className="table table-bordered" style={{ textAlign: 'center', backgroundColor: '#f4f4f9' }}>
            <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
              <tr>
                <th>No:</th>
                <th>Buyer Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>View</th>
                <th>Block/Unblock</th>
              </tr>
            </thead>
            <tbody>
              {Buyers.map((Buyer, index) => (
                <tr key={Buyer._id}>
                  <td>{index + 1}</td>
                  <td>{Buyer.name}</td>
                  <td>{Buyer.email}</td>
                  <td>{Buyer.phoneno}</td>
                  <td><button className="btn btn-info">See Details</button></td>
                  <td><button className="btn btn-danger">BVlock</button></td>
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

export default TotalBuyerpage;
