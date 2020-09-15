import { API } from './../../backend';

export const SignupFrontEnd = (user) => { // Function for Using Signup API from Backend
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then( response => {
        return response.json();
    } )
    .catch( error => {
        console.log(error);
    } )
} 

export const SigninFrontEnd = (user) => { // Function for Using Signin API from Backend
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then( response => {
        return response.json();
    } )
    .catch( error => {
        console.log(error);
    } )
}

export const Authenticate = (data, next) => { /* 
        Function for Checking Whether User is Authenticated
    */
    if(typeof Window !== 'undefined') { /* 
            If User has access to Windows Object, then Set JWT Token to Local-Storage
        */
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const SignoutFrontEnd = (next) => {
    if(typeof Window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
        .then( response => {
            console.log('User Signout SuccessFully');
        })
        .catch( error => {
            console.log(error);
        } )
    }
}

export const isAuthenticated = () => { // Function for Checking Whether User is Authenticated
    if(typeof Window == 'undefined') { /* 
            If User does't has access to windows object then we return false
        */
        return false;
    }
    if(localStorage.getItem('jwt')) { /* 
            If User Browser Local-Storage has JWT Token Present, then we return true by Checking that Both Token Value are Same
        */
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else {
        return false;
    }
}