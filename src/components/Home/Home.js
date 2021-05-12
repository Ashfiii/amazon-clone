import React from 'react';
import headerImage from '../../images/header-logo.jpg';
import './Home.css';
import Product from '../Product/Product';
import product2 from '../../images/tv.jpg';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
               <img className="home__image" src={headerImage} alt=""/>
            </div>
            <div className="home__row">
                <Product 
                id='2'
                title='LG 126 cms (50 inches) 4K Ultra HD Smart LED TV 50UM7700PTA | with Built-in Alexa (Ceramic Black)'
                price= '60000'
                image={product2}
                rating={5}/>
                <Product 
                id='2'
                title='LG 126 cms (50 inches) 4K Ultra HD Smart LED TV 50UM7700PTA | with Built-in Alexa (Ceramic Black)'
                price= '60000'
                image={product2}
                rating={5}/>
                <Product 
                id='2'
                title='LG 126 cms (50 inches) 4K Ultra HD Smart LED TV 50UM7700PTA | with Built-in Alexa (Ceramic Black)'
                price= '60000'
                image={product2}
                rating={5}/>
            </div>
        </div>
    )
}

export default Home
