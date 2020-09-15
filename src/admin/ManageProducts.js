import React, { useState, useEffect } from 'react'

import Base from './../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './../auth/helper/index';
import { getProducts, deleteProduct } from './helper/adminapicall';

function ManageProducts() {

    const SharpCorner = {
        borderRadius: '0px',
        width: '100px'
    }

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const preLoad = () => {
        getProducts()
        .then( (data) => {
            console.log(data);
            if(data.error) {
                console.log(data.error);
            }
            else {
                setProducts(data); // We are Not Setting value using State because Value is Coming in Form of Array not Object
            }
        } )
    }

    useEffect(() => {
        preLoad()
    }, []);

    const deleteThisProduct = (productID) => {
        deleteProduct(user._id, token, productID)
        .then( (data) => {
            if(data.error) {
                console.log(data.error);
            }
            else {
                preLoad();
            }
        } )
        .catch( (error) => {    
            // TODO: Left To Handle Error
            console.log(`Failed to Delete Product \n ${error}`);
        } )
    }

    const ProductInfo = () => (
        <div className="container">
            <div className="card mt-5 mb-3">
                <h4 className="card-header text-center"> Welcome To Manage Product Section </h4>
            </div>
            <div>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col"> # </th>
                            <th scope="col"> Product Name </th>
                            <th scope="col"> Product Category </th>
                            <th scope="col"> EDIT Product </th>
                            <th scope="col"> DELETE Product </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        products.map( (product, index) => (
                            <tr key={ index }>
                                <th scope="row"> { index + 1 } </th>
                                    <td> { product.name } </td>
                                    <td> { product.category.name } </td>
                                    <td> <Link to= {`/admin/product/update/${product._id}`} className="btn btn-warning" style={ SharpCorner }> EDIT </Link> </td>
                                    <td> <button className="btn btn-danger" style={ SharpCorner } onClick={ () => { deleteThisProduct(product._id) } } > DELETE </button> 
                                </td>
                            </tr>
                        ) )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )

    return (
        <Base title='Welcome to AdminDashboard' description='An Amazing Place to Buy Books'>
            { ProductInfo() }
        </Base>
    )
}

export default ManageProducts
