const express = require('express');
require('dotenv').config();
const cors = require('cors')
require('./src/config/conn');
const http = require('http');
const socket = require('socket.io');

const { corsOptions } = require('./src/utils/utils.cors');


const userRoute = require('./src/routers/user.route');
const productRoute = require('./src/routers/product.route');
const socketConfig = require('./src/socket/socket')

const PORT = 8080;

const app = express();
const server = http.createServer(app);

const io = socket(server, { cors: { origin: "*" } });


app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next()
})

app.use('/auth/users', userRoute);
app.use('/api-3.0/product', productRoute);


socketConfig(io);


app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

server.listen(PORT, () => {
  console.log('http://localhost:8080');
});