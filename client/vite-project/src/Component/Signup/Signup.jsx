// import React, { useState } from "react";
// import axios from "axios";

// function Signup() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phone, setPhone] = useState("");
//     const [userType, setUserType] = useState("");

//     // Form submission handler
//     const addUser = async (event) => {
//         event.preventDefault();

//         const data = {
//             name,
//             email,
//             password,
//             phone,
//             user_type: userType,
//         };

//         console.log("data:", data);

//         try {
//             const response = await axios.post('http://localhost:3000/user', data, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             console.log("response:", response);

//             if (response.status === 200) {
//                 alert("User successfully created");
//                 window.location = `login.html`; // Redirect to login page after successful creation
//             } else {
//                 alert("User creation failed");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     return (
//         <div class="card-container">
//     <div class="card11">
//         <form onSubmit={addUser}>
//             <div class="form-group">
//                 <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     class="form-input"
//                 />
//             </div>
//             <div class="form-group">
//                 <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     class="form-input"
//                 />
//             </div>
//             <div class="form-group">
//                 <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     class="form-input"
//                 />
//             </div>
//             <div class="form-group">
//                 <input
//                     type="text"
//                     id="phone"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     placeholder="Phone"
//                     class="form-input"
//                 />
//             </div>
//             <div class="form-group">
//                 <select
//                     id="selection_container"
//                     value={userType}
//                     onChange={(e) => setUserType(e.target.value)}
//                     class="form-input"
//                 >
//                     <option value="">Select User Type</option>
//                     <option value="admin">Admin</option>
//                     <option value="employee">Employee</option>
//                 </select>
//             </div>
//             <button type="submit" class="submit-btn">Create User</button>
//         </form>
//     </div>
//         </div>

//     );
// }

// export default Signup;
// import React, { useState } from "react";
// import axios from "axios";

// function Signup() {
//     let params = new URLSearchParams(window.location.search);
//      console.log("params", params);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phone, setPhone] = useState("");
//     const [user_type, setUserType] = useState("");

//     // Form submission handler
//     const addUser = async (event) => {
//         event.preventDefault();

//         // Frontend validation
//         if (!name || !email || !password || !phone || !user_type) {
//             alert("All fields are required.");
//             return;
//         }

//         if (!email.includes('@')) {
//             alert("Please enter a valid email address.");
//             return;
//         }

//         if (password.length < 6) {
//             alert("Password must be at least 6 characters.");
//             return;
//         }

//         const data = {
//             name,
//             email,
//             password,
//             phone,
//             user_type: user_type,  // Ensure this is correctly set
//         };

//         try {
//             const response = await axios.post('http://localhost:3000/user', data, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (response.status === 200) {
//                 alert("User successfully created");
//                 window.location = `/login`; // Redirect to login page after successful creation
//             } else {
//                 alert("User creation failed");
//             }
//         } catch (error) {
//             console.error("Error:", error.response ? error.response.data : error.message);
//             alert("An error occurred. Please try again.");
//         }
//     };

//     return (
//         <div className="card-container">
//             <div className="card11">
//                 <form onSubmit={addUser}>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             id="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder="Name"
//                             className="form-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Email"
//                             className="form-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Password"
//                             className="form-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             id="phone"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             placeholder="Phone"
//                             className="form-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <select
//                             id="selection_container"
//                             value={user_type}
//                             onChange={(e) => setUserType(e.target.value)}
//                             className="form-input"
//                         >
//                             <option value="">Select User Type</option>
//                             <option value="Admin">Admin</option>
//                             <option value="Buyer">Buyer</option>
//                             <option value="Seller">Seller</option>
//                         </select>
//                     </div>
//                     <button type="submit" className="submit-btn">Create User</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Signup;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function Signup() {
    const navigate = useNavigate(); // Initialize navigate function
    let params = new URLSearchParams(window.location.search);
    console.log("params", params);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [user_type, setUserType] = useState("");

    // Form submission handler
    const addUser = async (event) => {
        event.preventDefault();

        // Frontend validation
        if (!name || !email || !password || !phone || !user_type) {
            alert("All fields are required.");
            return;
        }

        if (!email.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        const data = {
            name,
            email,
            password,
            phone,
            user_type: user_type,  // Ensure this is correctly set
        };

        try {
            const response = await axios.post('http://localhost:3000/user', data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert("User successfully created");
                navigate('/login'); // Use navigate to go to the login page
            } else {
                alert("User creation failed");
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="card-container">
            <div className="card11">
                <form onSubmit={addUser}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <select
                            id="selection_container"
                            value={user_type}
                            onChange={(e) => setUserType(e.target.value)}
                            className="form-input"
                        >
                            <option value="">Select User Type</option>
                            <option value="Admin">Admin</option>
                            <option value="Buyer">Buyer</option>
                            <option value="Seller">Seller</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">Create User</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
