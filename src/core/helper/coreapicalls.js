import { API } from './../../backend';

export const getProductsFrontEnd = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}