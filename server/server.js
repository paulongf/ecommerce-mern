const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-routes');
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require('./routes/shop/products-routes');
const shopCartRouter = require('./routes/shop/cart-routers');
const addressRouter = require('./routes/shop/address-routes');
const shopOrderRouter = require("./routes/shop/order-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

//create a database connection -> You can also 
// create a separate file for thids and then import/use that file

mongoose.connect("mongodb+srv://paulongf:tjbJ84YldiRy9Bj8@cluster0.ev0igvo.mongodb.net/"
).then(()=> console.log('MongoDB connected')).catch((error) => console.log(error));



const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT' ],
        allowedHeaders: [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', addressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/review", shopReviewRouter);

app.listen(PORT, ()=> console.log(`server is now running on port ${PORT}`));