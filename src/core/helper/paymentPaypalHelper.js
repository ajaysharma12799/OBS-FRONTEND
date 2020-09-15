import { API } from './../../backend';

export const getTokenFrontEnd = (userID, token) => {
    return fetch(`${API}/payment/gettoken/${userID}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then( (response) => {
        console.log(`Response gettokenfront : ${JSON.stringify(response)}`)
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}

export const processPaymentFrontEnd = (userID, token, paymentInfo) => {
    return fetch(`${API}/payment/braintree/${userID}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    })
    .then( (response) => {
        console.log(`Response processpaymentfront : ${response}`)
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}