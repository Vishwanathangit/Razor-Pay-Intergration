import './index.css';
import axios from 'axios';

function App() {
  const book = {
    name: "The Fault in Our Stars",
    author: "John Green",
    img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
    price: 250,
  };

  const backendUrl = import.meta.env.VITE_LOCAL_BACKEND_URL;
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  const handleBuyNow = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/order`, { amount: book.price });
      initpayment(data);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    }
  };

  const initpayment = (data) => {
    const options = {
      key: razorpayKey,
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };

          const verifyResponse = await axios.post(`${backendUrl}/verify`, verificationData);

          if (verifyResponse.data.success) {
            alert("Payment Successful!");
          } else {
            alert("Payment verification failed!");
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          alert("Payment verification failed!");
        }
      },
      theme: {
        color: "#3399cc",
      },
      prefill: {
        name: "Customer Name",
        email: "",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="App">
      <h3>Payment Integration in MERN Application</h3>
      <div className="book_container">
        <img src={book.img} alt="book_img" className="book_img" />
        <p className="book_name">{book.name}</p>
        <p className="book_author">by {book.author}</p>
        <p className="book_price">
          Price : <span>&#x20B9; {book.price}</span>
        </p>
        <button onClick={handleBuyNow} className="buy_btn">
          buy now
        </button>
      </div>
    </div>
  );
}

export default App;
