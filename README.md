# 💳 Razorpay Integration - MERN Stack

A simple full-stack payment gateway integration using **Razorpay**, **React**, and **Node.js**. Users can make payments for products, and all orders are securely verified using Razorpay’s signature system.

---

## 🔗 Live Demo

👉 [Live Link](https://razor-pay-intergration-1jss.onrender.com/) 

---

## 📁 Folder Structure

<pre>
  ```
razorpay-integration/
├── backend/
│   ├── index.js              # Express server with Razorpay order & verification API
│   ├── .env                  # Razorpay keys and port
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Razorpay Checkout Integration
│   │   ├── main.jsx
│   │   └── index.css         # Styled React component
│   ├── index.html
│   ├── .env                  # Frontend env vars
│   ├── vite.config.js
│   └── package.json

```
</pre>
---

## ⚙️ Tech Stack

- **Frontend:** React + Vite + Razorpay.js
- **Backend:** Node.js + Express + Razorpay SDK
- **Others:** Axios, dotenv, crypto, Tailwind/Custom CSS

---

## 🚀 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/razorpay-integration.git
cd razorpay-integration
````

### 2. Backend Setup


cd backend
npm install


Create a `.env` file in the `backend` folder:

.env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
PORT=8080


Start the backend server:


node index.js


---

### 3. Frontend Setup


cd frontend
npm install


Create a `.env` file in the `frontend` folder:

.env
VITE_LOCAL_BACKEND_URL=http://localhost:8080/api/payment
VITE_RAZORPAY_KEY=your_key_id


Start the frontend:


npm run dev


---

## 💡 Features

* Razorpay Checkout Integration
* Secure Payment Verification (HMAC SHA256)
* Dynamic Order Creation
* Simple Book Product UI
* Stylish frontend with custom CSS

---

## 🧠 How it works

1. Backend creates a Razorpay order.
2. React frontend triggers Razorpay checkout using that order ID.
3. On successful payment, a verification API ensures integrity using `crypto`.
