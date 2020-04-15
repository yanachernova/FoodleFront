import React from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout'

const PaypalCheckoutButton = ({order}, props)=> {
const paypalConf = {
    currency: "MXN",
    env: 'sandbox',
    client: {
        sandbox: 'AZSAGMqzQ-tJPclzzhUhGSabkTkUy1KcWPo70Jx1K_MG6zTu-VdwZDWE0ThMPg_labcruQMlxEDyRCRv',
        production: '-- id --',
    },
    style: {
       label: 'pay',
       size: 'medium',
       shape: 'rect',
       color: 'gold' 
    }
};

const PayPalButton = paypal.Button.driver('react', {React, ReactDOM});

const payment = (data, actions) =>{
    const payment = {
        transactions: [
            {
                amount:{
                    total: order.total, //here we need to pass our props
                    currency: paypalConf.currency,
                },
                description: "Compra en Test App",
                custom: order.customer || '',
                item_list: {
                    items: order.items
                },
            }
        ],
         redirect_urls: {
            return_url: 'http://localhost:3000/checkout',
          }, 
        note_to_payer: 'Contactanos pare cualquier aclaracion'
    };
    return actions.payment.create({payment});
};
const onAuthorize = ( data, action ) =>{
    return action.payment.execute()
    .then(response => {
        console.log(response);
        alert(`El pago fue procesado correctamente, ID: ${response.id}`)
        sessionStorage.setItem('responsePaypal', response.id)
    })
     .then(function() {
        action.redirect();
        }) 
    .catch(error => {
        console.log(error);
        alert('Ocurrio un error al procesar el pago con PayPal')
    })
};
const onError = (error) => {
    console.log(error);
    alert('El pago no fue realizado, vuelva a intentario');
};
const onCancel = (data, actions) =>{
    alert('Pago no realizado, el usario cancelo el proceso');
};
return(
    <PayPalButton
    env={paypalConf.env}
    client={paypalConf.client}
    payment={(data, actions) => payment(data, actions)}
    onAuthorize={(data, action) => onAuthorize(data, action) }
    onCancel = {(data, actions) => onCancel(data, actions)}
    onError={(error) => onError(error)}
    style={paypalConf.style}
    commit
    locale="es_MX"
    //onClick={props.createOrder}
    />
)
};
export default PaypalCheckoutButton;