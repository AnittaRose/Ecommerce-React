import React, { useEffect, useState } from 'react';

const OrderPage = () => {
    const [useExistingAddress, setUseExistingAddress] = useState(false);

    const existingAddress = {
        fullName: 'John Doe',
        address: '123 Main Street, City, State, ZIP',
        phone: '123-456-7890',
        city: 'City',
        zip: '12345',
    };
    const proceedToBuy = async () => {
        if (!selectedAddress) {
            alert('Please select a delivery address before proceeding.');
            return;
        }
    
        if (!checkoutData || checkoutData.length === 0) {
            alert('Missing checkout data. Please try again.');
            return;
        }
    
        const products = checkoutData.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
        }));
        console.log("products", products);
    
        try {
            // Fetch all products from the 'AllProducts' endpoint
            const allProductsResponse = await axios.get('http://localhost:3000/View');
            console.log('API response:', allProductsResponse);
    
            let allProducts = allProductsResponse.data;
            console.log("allProducts", allProducts);
    
            // Access the product list from the response
            let data = allProducts.data;
            console.log("Product list from API:", data);
    
            // Validate the format of the response
            if (!Array.isArray(data)) {
                if (data.products && Array.isArray(data.products)) {
                    data = data.products; // Adjust for nested structure if needed
                } else {
                    throw new Error('Invalid response format: Unable to extract products array');
                }
            }
    
            // Match the product IDs in the cart with the API data
            const invalidProducts = products.filter(item =>
                !data.some(product => product._id === item.productId)
            );
    
            if (invalidProducts.length > 0) {
                console.error('Invalid products:', invalidProducts);
                alert('Some products are invalid or no longer available.');
                return;
            }
    
            // Proceed with the order if all products are valid
            const response = await axios.post(`http://localhost:3000/orderCart/${id}`, { products: products });
    
            console.log('Order result:', response.data);
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error proceeding to buy:', error.message || error);
            alert('Error while placing the order. Please try again.');
        }
    };
    
    
    

    // Load checkout data from the URL
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let checkoutDataParam = params.get('checkoutData');

        if (checkoutDataParam) {
            try {
                const data = JSON.parse(decodeURIComponent(checkoutDataParam));
                setCheckoutData(data);
            } catch (error) {
                console.error('Error parsing checkout data:', error);
            }
        }

       
    }, []);

    return (
        <div className="mt-5">
            <div className="position-absolute top-50 start-50 translate-middle cardd shadow w-50 h-100">
                <div className="card-bodyy pt-4">
                    <h1 className="card-title mb-4 text-center">Proceed to Pay</h1>

                    {/* Address Section */}
                    <div className="mb-4">
                        <h2 className="h5 mb-3 px-4">Shipping Address</h2>
                        <div className="form-check px-4">
                            <input
                                type="checkbox"
                                id="useExistingAddress"
                                className="form-check-input"
                                checked={useExistingAddress}
                                onChange={() => setUseExistingAddress(!useExistingAddress)}
                            />
                            <label htmlFor="useExistingAddress" className="form-check-label">
                                Use existing address
                            </label>
                        </div>

                        {useExistingAddress && (
                            <div className="mt-4 px-4">
                                <p><strong>Name:</strong> {existingAddress.fullName}</p>
                                <p><strong>Address:</strong> {existingAddress.address}</p>
                                <p><strong>Phone:</strong> {existingAddress.phone}</p>
                                <p><strong>City:</strong> {existingAddress.city}</p>
                                <p><strong>ZIP Code:</strong> {existingAddress.zip}</p>
                            </div>
                        )}
                    </div>

                    {/* Payment Section */}
                    <div className="text-center">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={proceedToBuy}
                        >
                            Proceed to Pay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
