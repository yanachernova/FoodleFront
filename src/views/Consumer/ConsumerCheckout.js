import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../store/appContext'
import ModalCheckoutAddAddress from '../../Components/ModalsOrder/modalCheckoutAddAddress'
import ModalCheckoutPaymentMethod from '../../Components/ModalsOrder/ModalCheckoutPaymentMethod'
import PaypalCheckoutButton from '../../Components/PaypalCheckoutButton'

const Checkout = props => {
    const { store, actions } = useContext(Context)
    const order = {
        customer: store.currentConsumer.id,
        total: store.totalAdd,
        items: [
            {
                sku: "1",
                name: 'Products',
                price: store.totalAdd,
                quantity: 1,
                currency: 'MXN'
            }

        ]
    };
    useEffect(() => {
        if (store.isAuthenticatedConsumer === false) {
            actions.goHome(props.history)
        } else {
            actions.isOrderAdd()
            actions.isAuthenticatedCategory()
            actions.isResponsePaypal()
        }
    }, [actions, props.history, store.isAuthenticatedConsumer])
    return (
        store.isAuthenticatedConsumer === false ?
            (
                <div></div>
            ) : (
                <div className="container">
                    <div className="row pt-3">
                        <div className="col-md-9">
                            <Link to='/'><h1>FOODLE</h1></Link>
                        </div>
                        <div className="col-md-3 d-flex justify-content-end">
                            <div className="dropleft">
                                <button className="btn login" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div className="dropdown-item pb-4" href="#">
                                        <small><strong>Name</strong></small>
                                        <div className="dropdown-divider"></div>
                                        {store.mode === 'view' ?
                                            (
                                                <div className='d-flex justify-content-between text-muted pt-1'>
                                                    <div className="">{store.currentConsumer.consumer.fullname}</div>
                                                    <i className="fas fa-pencil-alt ml-3" onClick={() => actions.handleEdit()}></i>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="input-group mb-3 d-flex justify-content-between text-muted pt-1">
                                                    <input type="text" name='fullname' className="form-control" placeholder="Change name" value={store.fullname} onChange={e => actions.handleChange(e)} />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-secondary" onClick={() => actions.putConsumerInformation()}>Save</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="dropdown-item pb-4" href="#">
                                        <small><strong>Address</strong></small>
                                        <div className="dropdown-divider"></div>
                                        <div className='d-flex justify-content-between text-muted pt-1'>
                                            <div className="">Dirección actual: {store.currentConsumer.consumer.address ? store.currentConsumer.consumer.address[0] : ''}</div>
                                            <i className="fas fa-pencil-alt ml-3"></i>
                                        </div>
                                    </div>

                                    <div className="dropdown-item pb-4" href="#">
                                        <small><strong>Phone number</strong></small>
                                        <div className="dropdown-divider"></div>
                                        <div className='d-flex justify-content-between text-muted pt-1'>
                                            <div className="">+56987621312{store.currentConsumer.consumer.phone_number}</div>
                                            <i className="fas fa-pencil-alt ml-3"></i>
                                        </div>
                                    </div>
                                    <div className="dropdown-divider "></div>
                                    <div className="dropdown-item" href="#">
                                        <div className='d-flex justify-content-between text-muted pt-1 btn' onClick={() => actions.normalLogout()}>
                                            <div className="hand" onClick={() => actions.normalLogout()}>Logout</div>
                                            <i className="fas fa-sign-out-alt ml-3" onClick={() => actions.normalLogout()}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-md-8 p-3">

                            <div className='d-flex justify-content-between'>
                                <p>Delivery addres:</p>
                                <i className='fas fa-plus' data-toggle="modal" data-target="#modalCheckoutAddAddress"></i>
                            </div>
                            <div className="list-group">
                                {
                                    store.currentConsumer.consumer.address &&
                                    store.currentConsumer.consumer.address.map((item, i) => {
                                        return (
                                            <>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="addressChoise" id={`exampleRadios${i}`} value={item} checked={sessionStorage.getItem('addressChoise')===item?true:false} onChange={(e) => actions.handleChange(e)} />
                                                    <label className="form-check-label" htmlFor={`exampleRadios${i}`}>
                                                        <p>{item}</p>
                                                    </label>
                                                    <i className='fas fa-trash' onClick={() => actions.deleteAddressMap(item)}></i>

                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <br />
                            <p>Delivery time: 30 min</p>
                            <label htmlFor="exampleFormControlTextarea1">Leave a comment</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" name='comment' /* value={store.comment} */ onChange={e => actions.handleChange(e)}></textarea>
                            <br />
                            <div className='d-flex justify-content-between'>
                                <p>Add payment method:</p>
                                <i className='fas fa-pencil-alt' data-toggle="modal" data-target="#modalCheckoutPaymentMethod"></i>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentChoise" id="exampleRadios1" value="Cash" checked={sessionStorage.getItem('paymentChoise')==='Cash'?true:false} onChange={e => actions.handleChange(e)} />
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    Cash
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentChoise" id="exampleRadios2" value="Card" checked={sessionStorage.getItem('paymentChoise')==='Card'?true:false} onChange={(e) => actions.handleChange(e)} />
                                <label className="form-check-label" htmlFor="exampleRadios2">
                                    <p>Card</p>
                                </label>
                            </div>
                            {store.paymentChoise === "Card" ? 
                                (   
                                   <>
                                   { store.responsePaypal && store.responsePaypal !== ""?
                                   (
                                    <button onClick={() => actions.POSTCreateNewOrder(props.history)} className='btn btn-primary form-control'>Make order</button>
                                   )                                     
                                       :
                                       (
                                        <PaypalCheckoutButton order={order} />
                                       )
                                            
                                   }
                                   
                                   </>  
                                )
                                :
                                store.paymentChoise === "Cash" ? 
                                (
                                    <button onClick={() => actions.POSTCreateNewOrder(props.history)} className='btn btn-primary form-control'>Make order</button>
                                )
                                :
                                (
                                    <></>
                                )
                            }
                        </div>
                        <div className="col-md-4 border p-3">
                            <h5 className='text-center'>Order</h5>
                            <hr />
                            <ul className='pl-3 pr-3 pt-2'>
                                {
                                    store.ProdDet.length > 0 &&
                                    store.ProdDet.map((item, i) => {
                                        return (
                                            <>
                                                <div className="row pb-3">
                                                    <div className="col-md-3">
                                                        <label htmlFor="">{item.quantity}</label>
                                                    </div>
                                                    <div className='d-flex justify-content-between col-md-9'>
                                                        <li>{item.thing_name}</li>
                                                        <label htmlFor="">{item.price}</label>
                                                        <div>
                                                            <i className="fas fa-plus pr-2" onClick={() => actions.Addcounter(item)}></i>
                                                            <i className="fas fa-minus pl-2" onClick={() => actions.Descreasingcounter(item, i)}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                            </>
                                        )
                                    })
                                }
                            </ul>
                            <div className='d-flex justify-content-between pl-3 pr-3 pb-2'>
                                <small htmlFor="">Promocodes: 0</small>
                            </div>

                            <div className='d-flex justify-content-between pl-3 pr-3'>
                                <label htmlFor="">$ Delivery price: {store.delivery_price}</label>


                            </div>
                            <div className='d-flex justify-content-between pl-3 pr-3'>
                                <label htmlFor="">$ Total:{store.totalAdd}</label>

                            </div>
                        </div>
                    </div>
                    <ModalCheckoutAddAddress />
                    <ModalCheckoutPaymentMethod />
                </div>
            )
    )
}

export default Checkout;