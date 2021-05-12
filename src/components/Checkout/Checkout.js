import React from 'react';
import './Checkout.css';
import Subtotal from '../Subtotal/Subtotal';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { useStateValue } from '../../StateProvider';

function Checkout() {
    const [{cart}] = useStateValue()
    return (
        <div className="checkout">
            <div className="checkout__left">
                {/* <img className="checkout__ad" src={image} alt="" /> */}
                <div>
                    <h2 className="checkout__title">Shopping Cart</h2>
                    {cart.length===0 ? <h2 className="checkout__header">No Items in the Cart</h2>: 
                    cart.map(item =>(
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
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
