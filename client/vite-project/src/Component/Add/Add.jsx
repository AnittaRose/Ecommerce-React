// function Add(){
//     return(<>
//         <div className="form12 pt-5 p-5">
//   <div className="d-flex">
//     <div className="pt-4 ">
//       <form onsubmit="Addproducts(event)" className="form">
//         <div className="inputbackground p-3">
//           <div className="input-group">
//             <div className="">
//               <div className="p-2">
//                 <input placeholder="Title" className="input" id="title" />
//               </div>
//               <div className="p-2">
//                 <input
//                   placeholder="Description"
//                   className="input"
//                   id="description"
//                 />
//               </div>
//               <div className="p-2">
//                 <input placeholder="Price" className="input" id="price" />
//               </div>
//               <div className="p-2">
//                 <input placeholder="Stock" className="input" id="rating" />
//               </div>
//               <div className="p-2">
//                 <input placeholder="Brand" className="input" id="brand" />
//               </div>
//               {/* <div class="p-2"><input type="file" id="images"></div> */}
//             </div>
//           </div>
//           <div className="p-2">
//             <select id="SelectCategories" className=" SelectCategoriesinput">
//               <option value="" />
//             </select>
//           </div>
//         </div>
//         <div className="pt-2 p-4">
//           <input
//             type="file"
//             id="imagenput"
//             name="images"
//             multiple=""
//             className="footer"
//           />
//         </div>
//         <div className="">
//           <div className="text-center btttn">
//             <input type="submit" className="subbttn" />
//           </div>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>

//     </>)
// }
// export default Add;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Add() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    rating: '',
    brand: '',
    category: '',
    images: []
  });

  const navigate = useNavigate();

  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const Addproducts = async (event) => {
    event.preventDefault();
    console.log('Reached Add Product function.');

    // Retrieve URL parameters
    const params = new URLSearchParams(window.location.search);
    const token_key = params.get("login");
    const id = params.get("id");
    const userId = params.get("userId");
    console.log(userId);
    const token = localStorage.getItem(token_key);

    // Validate inputs
    if (!formData.title || !formData.description || !formData.price || !formData.rating || !formData.brand || !formData.category) {
      alert('Please fill in all the fields.');
      return;
    }

    if (!formData.images || formData.images.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    for (let file of formData.images) {
      if (!validTypes.includes(file.type)) {
        alert('Please upload only valid image files (JPEG, PNG, GIF).');
        return;
      }
      if (file.size > maxSize) {
        alert('Each image must be smaller than 2MB.');
        return;
      }
    }

    // Prepare FormData
    const data = new FormData();
    data.append('Title', formData.title);
    data.append('Description', formData.description);
    data.append('Price', formData.price);
    data.append('Rating', formData.rating);
    data.append('Brand', formData.brand);
    data.append('Category', formData.category);

    for (let i = 0; i < formData.images.length; i++) {
      data.append('Images', formData.images[i]);
    }

    try {
      const response = await axios.post('http://localhost:3000/Add', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Product added successfully:', response.data);
      alert('Product added successfully!');

      // Optionally redirect or clear the form
      // window.location.href = `Seller.html?login=${token_key}&id=${id}`;
      navigate(`/View?login=${token_key}&id=${id}`);

    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  // const View = (id) => {
  //   navigate(`/Add?login=${token_key}&id=${id}&userId=${userId}`);
  // };
  

  return (

  <div className="form12 pt-5 px-5 position-absolute top-50 start-50 translate-middle">
  <div className="d-flex flex-column flex-md-row">
    <div className="pt-4 w-100">
      <form onSubmit={Addproducts} className="form">
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="mb-3">
            <input
              placeholder="Title"
              className="form-control"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Description"
              className="form-control"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Price"
              className="form-control"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Stock"
              className="form-control"
              id="rating"
              value={formData.rating}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Brand"
              className="form-control"
              id="brand"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <select
              id="category"
              className="form-select"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Make up">Make up</option>
              <option value="Skin care">Skin care</option>
              <option value="Hair care">Hair care</option>
              <option value="Body care">Body care</option>
              <option value="Fragrance">Fragrance</option>
              <option value="Face care">Face care</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <input
            type="file"
            id="images"
            name="images"
            multiple
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


  );
}

export default Add;
