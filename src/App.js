import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import Checkout from './components/Checkout/Checkout'; 
import Login from './components/Login/Login';
import {auth} from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './components/Payment/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, loadElements} from '@stripe/react-stripe-js';

const promise = loadStripe("pk_test_51Hqf3FCnUtwGr5XVXCYNhxXswkSsRxoXVmPcyU1VfvaDC75xi62CDdorDQKD6dIrR8ipLQkAIzPMb9EnCRCxoodx00DxWx07FK")

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser =>{
      console.log(authUser);
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      }
      else{
        dispatch({
          type: 'SET_USER',
          user: null,
          username: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
          <Switch>
          <Route path="/login">
              <Login />
            </Route>
            <Route path="/checkout">
              <Header />  
              <Checkout />
            </Route>
            <Route path="/payment">
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
