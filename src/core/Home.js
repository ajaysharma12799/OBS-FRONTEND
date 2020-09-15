import React, { useState, useEffect } from 'react'
// Custom Imports
import Base from './Base';
import Card from './Card';

import { getProductsFrontEnd } from './helper/coreapicalls';

export default function Home() {
  
  const [Products, setProducts] = useState([])
  const [error, setError] = useState(false)

  const loadProducts = () => {
    getProductsFrontEnd()
    .then( (data) => {
      if(data.error) {
        setError(data.error);
      }
      else {
        setProducts(data);
      }
    } )
    .catch( (error) => {
      console.log(`Error from LoadProducts \n ${error}`);
    } )
  }

  useEffect(() => {
    loadProducts();
  }, [])

  return (
    <Base title="ONLINE BOOK STORE" description="AN AMAZING PLACE TO BUY BOOKS" className="container-fluid text-center">
      <div className="row">
        {
          Products.map( (product, index) => (
            <div key={ index }>
              <Card product={ product } />
            </div>
          ) )
        }
      </div>
    </Base>
  )
}
