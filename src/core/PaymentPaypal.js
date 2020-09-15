// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
// import DropIn from 'braintree-web-drop-in-react';

// import { loadCart, emptyCart } from './helper/cartHelper'
// import { getTokenFrontEnd, processPaymentFrontEnd } from './helper/paymentPaypalHelper';
// import { createOrder } from './helper/orderHelper';
// import { isAuthenticated } from './../auth/helper/index';


// const PaymentPaypal = ({
//     products,
//     setReload = f => { return f }, 
//     reload = undefined
// }) => {

//     const [info, setInfo] = useState({
//         loading: false,
//         success: false,
//         clientToken: null,
//         error: '',
//         instance: {}
//     })

//     const userID = isAuthenticated() && isAuthenticated().user._id;
//     const token = isAuthenticated() && isAuthenticated().token;

//     const getToken = (userID, token) => {
//         getTokenFrontEnd(userID, token)
//         .then( (info) => {
//             console.log(`Information : ${JSON.stringify(info)}`);
//             if(info.error) {
//                 setInfo({ ...info, error: info.error });
//             }
//             else {
//                 const clientToken = info.clientToken;
//                 setInfo({ clientToken })
//             }
//         } )
//         .catch( (error) => {
//             console.log(`Error in PaymentPaypal \n ${error}`);
//         } )
//     }

//     useEffect(() => {
//         getToken(userID, token)
//     }, [])

//     const showDropInUI = () => (
//         <div>
//             {
//                 info.clientToken !== null && Products.length > 0 ? (
//                     <div>
//                         <DropIn
//                             options={ { authorization: info.clientToken } }
//                             onInstance={ instance => ( info.instance = instance ) }
//                             />
//                             <button onClick={ onPurchase  }  className="btn btn-block btn-primary"> Buy </button>
//                     </div>                    
//                 ) : (
//                     <div>
//                         <h3> Please Login to Checkout or Add Product to Cart </h3>
//                     </div>
//                 )
//             }
//         </div>
//     )

//     const onPurchase = () => {
//         setInfo({ loading: true });
//         let nonce;
//         let getNonce = info.instance.requestPaymentMethod()
//         .then( (data) => {
//             nonce = data.nonce;
//             const paymentData = {
//                 paymentMethodNonce: nonce,
//                 amount: getAmount()
//             };
//             processPaymentFrontEnd(userID, token, paymentData)
//             .then( (response) => {
//                 setInfo({ ...info, success: response.success, loading: false })
//                 console.log('Payment Success');
//                 // TODO: Empty Cart
//                 // TODO: Force Reload
//             } )
//             .catch( (error) => {
//                 setInfo({ loading: false, success: false });
//                 console.log("PAYMENT FAILED"); 
//             } )
//         } )
//     }

//     const getAmount = () => {
//         let amount = 0;
//         products.map(p => {
//           amount = amount + p.price;
//         });
//         return amount;
//     };

//     return (
//         <div>
//             <h3> Your Billing Amount is { getAmount() } </h3>
//             { showDropInUI() }
//         </div>
//     )
// }

// export default PaymentPaypal



import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import { getTokenFrontEnd, processPaymentFrontEnd } from "./helper/paymentPaypalHelper";
import DropIn from 'braintree-web-drop-in-react';

const PaymentPaypal = ({ 
  products, 
  setReload = f => { return f }, 
  reload = undefined 
}) => {

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getTokenFrontEnd(userId, token).then(info => {
      
      console.log(info);
      
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const ShowDropInUI = () => {
    return (
      // <div>
      //   {info.clientToken !== null && products.length > 0 ? (
      //     <div>
      //       <DropIn
      //         options={{ authorization: info.clientToken }}
      //         onInstance={ instance => { info.instance = instance } }
      //       />
      //       <button className="btn btn-block btn-success" onClick={onPurchase}>
      //         Buy
      //       </button>
      //     </div>
      //   ) : (
      //     <h3> Please Login or Add Product to Cart </h3>
      //   )}
      // </div>
      <div>
        <DropIn/>
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPaymentFrontEnd(userId, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          //TODO: empty the cart
          //TODO: force reload
        })
        .catch(error => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3 className="text-center">Your Billing Amount is {getAmount()} <span> &#8377; </span> </h3>
      { ShowDropInUI() }
    </div>
  );
};

export default PaymentPaypal;
