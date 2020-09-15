import React, { useState } from 'react'

import Base from './../core/Base';
import { isAuthenticated } from './../auth/helper/index';
import { createCategory } from './helper/adminapicall';


const AddCategory = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = (event) => {
        setError('');
        setName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        console.log(user);
        console.log(user._id);
        console.log(token);

        setError('');
        setSuccess(false);
        createCategory(user._id, token, { name })
        .then( (data) => {
            if(data.error) {
                setError(true);
            }
            else {
                setError('');
                setSuccess(true);
                setName('');
            }
        } )
        .catch( (error) => {
            console.log(`Error in Add Category \n ${error}`);
        } )
    }

    const successMessage = () => (
        <div className="container alert alert-success alert-dismissible fade show"
            style={ { display: success ? '' : 'none' } }
            role="alert"
        >
            Category Created Successfully
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

    const CategoryForm = () => (
        <div className="container mt-5">
            <div className="card">
                <h4 className="card-header text-center"> Welcome To Create Category Section </h4>
            
                <form className="mt-5 mb-5">
                    <div className="form-group">
                        <input type="text" placeholder="Enter Category Name" onChange={ handleChange } value={ name } className="form-control w-50 mx-auto my-auto" />
                    </div>
                    <button className="btn btn-block btn-success w-50 mx-auto my-auto" onClick={ onSubmit } >Create Category</button>
                </form>
                
            </div>
        </div>
    )

    return (
        <Base title='Welcome to AdminDashboard' description='An Amazing Place to Buy Books'>
            { successMessage() }
            { errorMessage() }
            { CategoryForm() }
        </Base>
    )
}

export default AddCategory;
