import React from 'react'
import { API } from './../../backend';


const ImageHelper = ({ product }) => {
    const ImageURL = product ? `${API}/product/photo/${product._id}` : "https://images.pexels.com/photos/5054776/pexels-photo-5054776.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    return (
        <div>
            <img src= { ImageURL } alt="Product Card Image" style={ { borderRadius: '0px' } } className="card-img top"/>
        </div>
    )
}

export default ImageHelper;
