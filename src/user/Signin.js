import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

import Base from './../core/Base';
import { SigninFrontEnd, Authenticate, isAuthenticated } from '../auth/helper/index';

const Signin = () => {

    const [values, setValues] = useState({
        email: 'motu@gmail.com',
        password: '12345',
        error: '',
        loading: false,
        didRedirect: false
    })

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        SigninFrontEnd({ email, password })
        .then( data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false});   
            }
            else {
                Authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    });   
                });
            }
        } )
        .catch( error => {
            console.log(`Error in Signin \n ${error}`);
        } )
    }

    const performRedirect = () => {
        if(didRedirect) {
            console.log(`User: ${user} \n User Role: ${user.role}`);
            if(user && user.role === 1) {
                console.log('Admin Entered')
                return <Redirect to='/admin/dashboard' />
            }
            else {
                console.log('User Entered')
                return <Redirect to='/user/dashboard' />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to='/' />
        }
    }

    const loadingMessage = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
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

    const SigninForm = () => (
        <div className="mt-5">
            <form>
                <div className="form-group">
                    <input type="text" placeholder="Email" onChange={ handleChange('email') } value={ email } className="form-control w-50 mx-auto my-auto" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Password" onChange={ handleChange('password') } value={ password } className="form-control w-50 mx-auto my-auto" />
                </div>
                <button className="btn btn-block btn-success w-50 mx-auto my-auto" onClick={ onSubmit }>Signin</button>
            </form>
        </div>
    )

    return (
        <Base title="SIGNIN PAGE" description="A PAGE FOR USER LOGIN"> 
            { loadingMessage() }
            { errorMessage() }
            { SigninForm() }
            { performRedirect() }
            { JSON.stringify(values) }
        </Base>
    )
}

export default Signin
