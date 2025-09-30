const express = require('express');
require('dotenv').config();
const cors = require('cors')
require('./src/config/conn');

const { corsOptions } = require('./src/utils/utils.cors');

const PORT = 8080;

const app = express();
app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});
app.use(cors(corsOptions));

app.use(express.json());

const userRoute = require('./src/routers/user.route');
const productRoute = require('./src/routers/product.route');
app.use('/auth/users', userRoute);
app.use('/api-3.0/product', productRoute);

app.listen(PORT, () => {
    console.log('http://localhost:8080');
});