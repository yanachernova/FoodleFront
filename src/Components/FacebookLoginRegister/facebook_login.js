import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../store/appContext';
function Facebook() {
    const { actions, store } = useContext(Context)
    const [isLoggedIn] = useState(false)
    const responseFacebook = (response) => {
        if (store.isAuthenticatedConsumer === false) {
            actions.loginConsumersFacebook(response.name, response.email)
        }
    }
    let fbContent;
    if (isLoggedIn) {
        fbContent = null;
    }
    else {
        fbContent = (
            <FacebookLogin
                appId=""
                autoLoad={false}
                fields="name, email, picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
                textButton=' Facebook'
                
            >
            </FacebookLogin>
        );
    }
    return <div className="">{fbContent}</div>
}
export default Facebook
