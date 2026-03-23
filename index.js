// Import Express (CommonJS style)
const express = require('express');
const {createPayment,capturePayment} = require('./src/controllers/paymentController');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

require('dotenv').config();


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/api', (req, res) => {
  res.json({ message: 'API is working' });
});


app.use(cors({ origin: 'http://localhost:5173' }));


app.use(express.json());

app.post('/payment',createPayment);
app.post("/capturePayment",capturePayment);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
console.log(process.env.TEST_KEY_ID);