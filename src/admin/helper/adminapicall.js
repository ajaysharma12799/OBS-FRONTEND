import { API } from './../../backend';

// Create Category API Call
export const createCategory = (userID, token, category) => {
    return fetch(`${API}/category/create/${userID}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}

// Get All Category API Call
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}

// Get Single Category API Call
export const getSingleCategory = (categoryID) => {
    return fetch(`${API}/category/${categoryID}`, {
        method: 'GET'
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}

// Update Category API Call
export const updateCategory = (userID, token, categoryID, updatedcategory) => {
    return fetch(`${API}/category/${categoryID}/${userID}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedcategory)
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}

// Delete Category API Call
export const deleteCategory = (userID, token, categoryID) => {
    return fetch(`${API}/category/${categoryID}/${userID}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}

// Create Product API Call
export const createProduct = (userID, token, product) => {
    return fetch(`${API}/product/create/${userID}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}

// Get All Products API Call
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    })
    .then( (response) => {
        console.log(response);
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}

// Get Single Product API Call
export const getSingleProduct = (productID) => {
    return fetch(`${API}/product/${productID}`, {
        method: 'GET'
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}

// Update Product API Call
export const updateProduct = (userID, token, productID, updatedproduct) => {
    return fetch(`${API}/product/${productID}/${userID}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: updatedproduct
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}

// Delete Product API Call
export const deleteProduct = (userID, token, productID) => {
    return fetch(`${API}/product/${productID}/${userID}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then( (response) => {
        return response.json();
    } )
    .catch( (error) => {
        console.log(error);
    } )
}