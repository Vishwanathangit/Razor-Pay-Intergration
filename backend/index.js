const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  response.status(200).send('App is Running...');
});

app.post('/api/payment/order', (request, response) => {
  try {
    const RazorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    const options = {
      amount: request.body.amount * 100, 
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    RazorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error('Razorpay order creation error:', error);
        return response.status(500).json({ error: error.message });
      }
      response.status(200).json(order);
    });
  } catch (error) {
    console.error('Order creation error:', error);
    response.status(500).json({ error: error.message });
  }
});

app.post('/api/payment/verify', (request, response) => {
  try {
    console.log('Received verification request:', request.body);
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = request.body;

    // Check if all required fields are present
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return response.status(400).json({ 
        success: false, 
        message: 'Missing required payment verification data' 
      });
    }

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    console.log('Generated signature:', generated_signature);
    console.log('Received signature:', razorpay_signature);

    if (generated_signature === razorpay_signature) {
      response.status(200).json({ 
        success: true, 
        message: 'Payment verified successfully' 
      });
    } else {
      response.status(400).json({ 
        success: false, 
        message: 'Payment verification failed' 
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    response.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));