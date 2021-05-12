const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')("sk_test_51Hqf3FCnUtwGr5XVaSI6gJVdecX6SWafpdWfWRNS8229pDd3IcIeBQAhDXEOD42cEqVCIoHTfvxzaYbLuiwgbpJY00IntNuFQX");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/", (request, response) => response.send("hello world"));

app.post("/payments/create", async (request, response) => {
  // const query = new URLSearchParams(window.location.search);
  // const total = query.get('total');
  const total = request.query.total;

  console.log(total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, 
  });
  
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

//http://localhost:5001/clone-4f1ea/us-central1/api