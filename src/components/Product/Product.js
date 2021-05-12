import React, { useEffect, useState } from 'react';
import './Product.css'
import { useStateValue } from '../../StateProvider';

function Product({id, title, price, image, rating}) {
    const [{cart}, dispatch] = useStateValue()

    const [data,setData]= useState([]);

    const addToCart = ()=>{
        dispatch({
            type: "ADD_TO_CART",
            item: {
                id: id,
                title: title,
                price: price,
                image: image,
                rating: rating
            }
        })
    }

    // const getData=()=>{
    //     fetch('product.json'
    //     {
    //       headers : { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //        }
    //     })
    //       .then(function(response){
    //         console.log(response)
    //         return response.json();
    //       })
    //       .then(function(myJson) {
    //         console.log(myJson);
    //         setData(myJson)
    //       }
    //     );
        
    //   }

    //   useEffect(()=>{
    //     getData()
    //   },[])
      
    return (
        <div className="product">
            <div className="product__info">
                
                {data.map((item)=>
                <>
                <p>{item.title}</p>
                <p className="product__price">
                        Rs <strong>{item.price}</strong>
                    </p>
                </>
                )}
               
               
                {/* <p>{title}</p>
                <p className="product__price">
                    Rs <strong>{price}</strong>
                </p> */}


                <div className="product__rating">
                    {Array(rating).fill().map((_, i) =>(
                        <span>⭐</span>
                    ))}
                </div>
            </div>
            <img src={image} alt=""/>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Product
