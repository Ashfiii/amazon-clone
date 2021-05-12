import React, {useEffect, useState} from 'react';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import './Payment.css';
import { useStateValue } from '../../StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getCartTotal } from '../../reducer';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';


function Payment() {

    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [{cart, user}, dispatch] = useStateValue();

    const [processing, setProcessing] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getCartTotal(cart) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [cart])

    console.log(clientSecret)

    const handleSubmit = async (event)=>{
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            history.replace('/orders')
        })
    }

    const handleChange = event=>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }

    return (
        <div className="payment">
            <h1><Link to="/checkout">Checkout ({cart?.length}) items</Link></h1>
            <div className="payment__container">
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.displayName}</p>
                        <p>Resaldar Nagar, Ranchi</p>
                        <p>Jharkhand, India</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {cart.map(item =>(
                            <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            price= {item.price}
                            image={item.image}
                            rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onClick={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__container">
                            <CurrencyFormat 
                                renderText={(value) =>(
                                <h3>OrderTotal: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getCartTotal(cart)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₹"}
                                />
                                 <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                            </button>
                            </div>
                                {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
