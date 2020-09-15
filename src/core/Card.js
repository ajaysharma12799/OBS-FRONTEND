import React, { useState } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';

import { addItemToCart, removeItemFromCart } from './helper/cartHelper';


const Card = ({ 
    product,
    addtoCart = true,
    removefromCart = false,
    setReload = f => { return f },
    reload = undefined
}) => {

    const ProductName = product ? product.name : 'A Default Name of Product';
    const ProductDescription = product ? product.description : 'A Default Description of Product';
    const ProducrPrice = product ? product.price : '0';

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    
    const cardStyle = {
        width: '18rem',
        borderRadius: '0px'
    }

    const ShowAddToCart = (addtoCart) => {
        return (
            addtoCart && (
                <button className="btn btn-block btn-success" onClick={ addProductToCart }  style={ { borderRadius: '0px', marginTop: '2px', marginBottom: '2px' } }> Add To Cart </button>
            )
        )
    }

    const RemoveFromCart = (removefromCart) => {
        return (
            removefromCart && (
                    <button className="btn btn-block btn-danger" onClick={ () => {  console.log(`Product ID : ${product._id}`); removeItemFromCart(product._id); setReload(!reload)  } } style={ { borderRadius: '0px', marginTop: '2px', marginBottom: '2px' } }> Remove From Cart </button>
            )
        )
    }

    const addProductToCart = () => {
        addItemToCart(product, () => {
            setRedirect(true);
        })
    }

    const getRedirect = () => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

    return (
        <div>
            <div className="card mt-2 mb-2 ml-4 mr-4" style={ cardStyle }>
                <ImageHelper product={ product } />
                <div className="card-body">

                    { getRedirect(redirect) }

                    <h5 className="card-title"> { ProductName } </h5>
                    <p className="card-text"> { ProductDescription } </p>
                    <h5> { ProducrPrice } <span> &#8377; </span>  </h5> 
                    <div className="row">
                        { ShowAddToCart(addtoCart) }
                    </div>
                    <div className="row">
                        { RemoveFromCart(removefromCart) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;