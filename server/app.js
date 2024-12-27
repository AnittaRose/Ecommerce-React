const express = require('express');
const mongoConnect = require('./db/connect.js');
const userRouters = require('./routers/userRouter.js');
const authrouter = require('./routers/authRouter');
const uploads = require('../server/utils/upload.js');
const path = require('path');
const cors = require('cors');

const app = express();  // Declare app here before use

require('dotenv').config();

// Middleware setup
app.use(cors());
app.use(express.static('../client'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads/products' directory
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads/products')));

// Connect to MongoDB
mongoConnect();

// Set up routes
app.use(userRouters);
app.use(authrouter);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
