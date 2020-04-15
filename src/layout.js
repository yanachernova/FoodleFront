import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './views/Home'
import Product from './views/Consumer/ConsumerProduct'
import Checkout from './views/Consumer/ConsumerCheckout'
import Business from './views/Business/BusinessLogin'
import Waiting from './views/Consumer/ConsumerWaitingOrder'
import NotFound from './views/Notfound'
import injectContext from './store/appContext'
import Driver from './views/Driver/DriverLogin'

const Layout = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Product} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/business" component={Business} />
                <Route exact path="/driver" component={Driver} />
                <Route exact path="/waiting" component={Waiting} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default injectContext(Layout);