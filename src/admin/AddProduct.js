import React, { useState, useEffect } from 'react'

import Base from './../core/Base';
import { getCategories, createProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

function AddProduct() {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        photo: '',
        category: '',
        categories: [],
        loading: false,
        error: '',
        createdProduct: '',
        getRedirect: false,
        formData: ''
    })

    const { user, token } = isAuthenticated();

    const { name, description, price, stock, photo, category, categories, loading, error, createdProduct, getRedirect, formData } = values;

    const preLoad = () => {
        getCategories()
        .then( (data) => {
            if(data.error) {
                setValues({...values, error: data.error})
            }
            else {
                setValues({...values, categories: data, formData: new FormData()})
            }
        } )
        .catch( (error) => {
            console.log(`Error in PreLoad Method of Add-Product \n ${error}`);
        } )
    }

    useEffect(() => {
        preLoad()
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value; /* 
            Checking Here That When Our HandleChange Method Encounter Type File Then on ob Base of It Which value to Be Handled,
            as We are Not Maintaining State for Photo
        */
       formData.set(name, value); // Setting Value in FormData Object
       setValues({...values, [name]: value}); // Setting State For Values
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: '', loading: true, getRedirect: true});
        createProduct(user._id, token, formData)
        .then( (data) => {
            if(data.error) {
                setValues({...values, error: data.error});
            }
            else {
                setValues({ 
                    ...values,
                    name: '',
                    description: '',
                    price: '',
                    photo: '',
                    stock: '',
                    loading: false,
                    createdProduct: data.name 
                })
            }
        } )
        .catch( (error) => {
            console.log(`Error in Add Product \n ${error}`);
        } )
    }

    // TODO: Redirect Admin to Dashboard using Loading and getRedirect but after Completing Whole Project

    const successMessage = () => (
        <div className="container alert alert-success alert-dismissible fade show"
            style={ { display: createdProduct ? '' : 'none' } }
            role="alert"
        >
            Product Created Successfully
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )

    const errorMessage = () => (
        <div className="container alert alert-warning alert-dismissible fade show"
            style={ { display: error ? '' : 'none' } }
            role="alert"
        >
            { error }
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )

    const ProductForm = () => (
        <div>
            <div className="container mt-5 mb-5">
                <div className="card">
                    <h4 className="card-header text-center"> Welcome To Create Product Section </h4>

                    <form className="mt-5 mb-5">
                        <div className="form-group">
                            <input type="text" onChange={ handleChange('name') } value={ name } placeholder="Enter Product Name" className="form-control w-50 mx-auto my-auto" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={ handleChange('description') } value={ description } placeholder="Enter Product Description" className="form-control w-50 mx-auto my-auto" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={ handleChange('price') } value={ price } placeholder="Enter Product Price" className="form-control w-50 mx-auto my-auto" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={ handleChange('stock') } value={ stock } placeholder="Enter Product Stock" className="form-control w-50 mx-auto my-auto" />
                        </div>
                        <div className="form-group">
                            <select onChange={handleChange("category")} value={ category } className="form-control w-50 mx-auto my-auto" >
                                <option> Select Category in Which Product Belong </option>
                                { 
                                    categories && categories.map( (category, index) => (
                                        <option key={ index } value={ category._id } > { category.name } </option>
                                    ) )
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="file" onChange={ handleChange('photo') } className="form-control w-50 mx-auto my-auto" />
                        </div>
                        <button className="btn btn-block btn-success w-50 mx-auto my-auto" onClick={ onSubmit } >Create Product</button>
                    </form>

                </div>
            </div>
        </div>
    )

    return (
        <Base title='Welcome to AdminDashboard' description='An Amazing Place to Buy Books'>
            { successMessage() }
            { errorMessage() }
            { ProductForm() }
        </Base>
    )
}

export default AddProduct;
