export const addItemToCart = (item, next) => {
    let cart = [];
    if(typeof window !== undefined) { // We Have Access to Window Object
        if(localStorage.getItem('cart')) { // If Cart is Present in LocalStorage Then Will Fetch That and add Into Cart
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({ // Push Incoming Product or Item into Cart Array
            ...item,
            count: 1
        })
        localStorage.setItem('cart', JSON.stringify(cart)); // Add Cart Array to LocalStorage
        next();
    }
}

export const loadCart = () => {
    if(typeof window !== undefined) { // We Have Access to Window Object
        if(localStorage.getItem('cart')) { // If Cart is Present in LocalStorage Then Will Fetch That and add Into Cart
            return JSON.parse(localStorage.getItem('cart'));
        }
    } 
}

export const removeItemFromCart = (productID) => {
    console.log(productID);
    let cart = [];
    if(typeof window !== undefined) { // We Have Access to Window Object
        if(localStorage.getItem('cart')) { // If Cart is Present in LocalStorage Then Will Fetch That and add Into Cart
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        console.log(cart);
        cart.map((product, index) => {
            console.log(`Product from RemoveItemFromCart : ${JSON.stringify(product)}`)
            if(product._id === productID) {
                console.log(`Product ID from RemoveItemFromCart : ${product._id}`);
                cart.splice(index, 1);
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));    
    }    
    console.log(cart);
    return cart;
}

export const emptyCart = (next) => { // Function to Empty Cart after Successful Placing Order
    if(typeof window !== undefined) {
        localStorage.removeItem('cart');
        next();
    }
}