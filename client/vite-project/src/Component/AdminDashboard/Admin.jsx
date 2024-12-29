
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from "axios";

// function AdminDashboard() {
//   const params = new URLSearchParams(window.location.search);
//   console.log("params", params);

//     // Fetch token and user id directly from URL params
//   let token_key = params.get('login');
//   console.log(token_key);

//   let token = localStorage.getItem(token_key);
//   console.log("Token:", token);

//   let userId = params.get('id');
//   console.log("User ID:", userId)

//   const [totalBuyers, setTotalBuyers] = useState(null);
//   const [totalSellers, setTotalSellers] = useState(null);
//   const [errorBuyers, setErrorBuyers] = useState(null);
//   const [errorSellers, setErrorSellers] = useState(null);
//   const navigate = useNavigate(); // For navigation

//   useEffect(() => {
//     const fetchTotalBuyers = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/totalBuyers");
//         setTotalBuyers(response.data.totalBuyers);
//       } catch (err) {
//         setErrorBuyers("Failed to fetch total buyers");
//       }
//     };

//     const fetchTotalSellers = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/totalseller");
//         setTotalSellers(response.data.totalSeller);
//       } catch (err) {
//         setErrorSellers("Failed to fetch total sellers");
//       }
//     };

//     fetchTotalBuyers();
//     fetchTotalSellers();
//   }, []);

//   const sellerdetail = (id) => {
//     // navigate("/Totalsellerdetailspage");
//     navigate(`/Totalsellerdetailspage?login=${token_key}&id=${id}&userId=${userId}`);

//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           {/* Sidebar */}
//           <nav className="col-md-2 d-none d-md-block sidebar">
//             <div className="position-sticky pt-3">
//               <h4 className="text-center py-3">Admin Dashboard</h4>
//               <ul className="nav flex-column">
//                 <li className="nav-item">
//                   <a className="nav-link active" href="#">
//                     Dashboard
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#">
//                     Users
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#">
//                     Settings
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#">
//                     Logout
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </nav>
//           {/* Main Content */}
//           <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
//             <div className="content">
//               <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 ">
//                 <h1 className="h2">Dashboard</h1>
//               </div>
//               <div className="row">
//                 <div className="col-md-4">
//                   <div
//                     className="card11 text-white bg-primary mb-3"
//                     onClick={()=>sellerdetail(userId)} // Navigate on click
//                     style={{ cursor: "pointer" }}
//                   >
//                     <div className="card-body">
//                       <h5 className="card-title">Total Seller</h5>
//                       <p className="card-text">
//                         {errorSellers ? (
//                           <span className="text-danger">{errorSellers}</span>
//                         ) : totalSellers !== null ? (
//                           totalSellers
//                         ) : (
//                           "Loading..."
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <div className="card11 text-white bg-success mb-3">
//                     <div className="card-body">
//                       <h5 className="card-title">Total Buyer</h5>
//                       <p className="card-text">
//                         {errorBuyers ? (
//                           <span className="text-danger">{errorBuyers}</span>
//                         ) : totalBuyers !== null ? (
//                           totalBuyers
//                         ) : (
//                           "Loading..."
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <div className="card11 text-white bg-warning mb-3">
//                     <div className="card-body">
//                       <h5 className="card-title">Pending Approvals</h5>
//                       <p className="card-text"></p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="card12 shadow-sm p-3 mb-5 bg-body rounded">
//                 <div className="card-header">Recent Activity</div>
//                 <div className="card-body">
//                   <table className="table table-striped">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Employee Name</th>
//                         <th>Action</th>
//                         <th>Timestamp</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>1</td>
//                         <td>John Doe</td>
//                         <td>Logged In</td>
//                         <td>2024-12-29 08:00 AM</td>
//                       </tr>
//                       <tr>
//                         <td>2</td>
//                         <td>Jane Smith</td>
//                         <td>Logged Out</td>
//                         <td>2024-12-29 06:00 PM</td>
//                       </tr>
//                       <tr>
//                         <td>3</td>
//                         <td>Mark Wilson</td>
//                         <td>Requested Leave</td>
//                         <td>2024-12-28 09:30 AM</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function AdminDashboard() {
  const params = new URLSearchParams(window.location.search);
  console.log("params", params); // Debugging log for parameters in the URL

  // Fetch token and user id directly from URL params
  let token_key = params.get('login');
  console.log("Token Key from URL:", token_key);

  // If token_key exists, fetch the token from localStorage
  let token = localStorage.getItem(token_key);
  console.log("Token from localStorage:", token);

  let userId = params.get('id');
  console.log("User ID from URL:", userId);

  const [totalBuyers, setTotalBuyers] = useState(null);
  const [totalSellers, setTotalSellers] = useState(null);
  const [errorBuyers, setErrorBuyers] = useState(null);
  const [errorSellers, setErrorSellers] = useState(null);
  const navigate = useNavigate(); // For navigation

  // Fetch the total buyers and sellers
  useEffect(() => {
    const fetchTotalBuyers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/totalBuyers");
        setTotalBuyers(response.data.totalBuyers);
      } catch (err) {
        setErrorBuyers("Failed to fetch total buyers");
      }
    };

    const fetchTotalSellers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/totalseller");
        setTotalSellers(response.data.totalSeller);
      } catch (err) {
        setErrorSellers("Failed to fetch total sellers");
      }
    };

    fetchTotalBuyers();
    fetchTotalSellers();
  }, []);

  // Navigate to the seller details page
  const sellerdetail = (id) => {
    console.log(`Navigating to /Totalsellerdetailspage?login=${token_key}&id=${id}&userId=${userId}`);
    navigate(`/Totalsellerdetailspage?login=${token_key}&id=${id}&userId=${userId}`);
  };

  const Buyerdetail = (id) => {
    console.log(`Navigating to /Totalsellerdetailspage?login=${token_key}&id=${id}&userId=${userId}`);
    navigate(`/TotalBuyerpage?login=${token_key}&id=${id}&userId=${userId}`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block sidebar">
          <div className="position-sticky pt-3">
            <h4 className="text-center py-3">Admin Dashboard</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Users</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Settings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Logout</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="content">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
              <h1 className="h2">Dashboard</h1>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div
                  className="card11 text-white bg-primary mb-3"
                  onClick={() => sellerdetail(userId)} // Navigate on click
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Total Seller</h5>
                    <p className="card-text">
                      {errorSellers ? (
                        <span className="text-danger">{errorSellers}</span>
                      ) : totalSellers !== null ? (
                        totalSellers
                      ) : (
                        "Loading..."
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card11 text-white bg-success mb-3 "onClick={() => Buyerdetail(userId)}>
                  <div className="card-body">
                    <h5 className="card-title">Total Buyer</h5>
                    <p className="card-text">
                      {errorBuyers ? (
                        <span className="text-danger">{errorBuyers}</span>
                      ) : totalBuyers !== null ? (
                        totalBuyers
                      ) : (
                        "Loading..."
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card11 text-white bg-warning mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Pending Approvals</h5>
                    <p className="card-text"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card12 shadow-sm p-3 mb-5 bg-body rounded">
              <div className="card-header">Recent Activity</div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Employee Name</th>
                      <th>Action</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>John Doe</td>
                      <td>Logged In</td>
                      <td>2024-12-29 08:00 AM</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jane Smith</td>
                      <td>Logged Out</td>
                      <td>2024-12-29 06:00 PM</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Mark Wilson</td>
                      <td>Requested Leave</td>
                      <td>2024-12-28 09:30 AM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
