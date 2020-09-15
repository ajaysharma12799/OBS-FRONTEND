import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import Base from './../core/Base';
import { SignupFrontEnd } from './../auth/helper/index';

const Signup = () => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {firstName, lastName, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const successMessage = () => (
        <div className="container alert alert-success alert-dismissible fade show"
            style={ { display: success ? '' : 'none' } }
            role="alert"
        >
            Account Created Successfully, Please <Link to='/signin'> Login Here </Link>
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

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        SignupFrontEnd({firstName, lastName, email, password})
        .then( (data) => {
            if(data.error) {
                setValues({...values, error: data.error, success: false});
            }
            else {
                setValues({
                    ...values,
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        } )
        .catch( (error) => {
            console.log(`Error in Signup \n ${error}`);
        } )
    }

    const SignupForm = () => (
        <div className="mt-5">
            <form>
                <div>
                        <div className="form-group">
                            <input type="text" onChange={ handleChange('firstName') } placeholder="FirstName" value={ firstName } className="form-control w-50 mx-auto my-auto" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={ handleChange('lastName') } placeholder="LastName" value={ lastName } className="form-control w-50 mx-auto my-auto" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={ handleChange('email') } placeholder="Email" value={ email } className="form-control w-50 mx-auto my-auto" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={ handleChange('password') } placeholder="Password" value={ password } className="form-control w-50 mx-auto my-auto" />
                        </div>
                </div>
                <button className="btn btn-block btn-success w-50 mx-auto my-auto" onClick={ onSubmit }>Signup</button>
            </form>
        </div>
    )

    return (
        <Base title="SIGNUP PAGE" description="A PAGE FOR USER REGISTRATION">
            { successMessage() }
            { errorMessage() }
            { SignupForm() }
            { JSON.stringify(values) }
        </Base>
    )
}

export default Signup;