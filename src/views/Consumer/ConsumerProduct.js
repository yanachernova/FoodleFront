import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../store/appContext'
import ModalLogin from '../../Components/ModalsConsumer/modal_login'
import ModalRegister from '../../Components/ModalsConsumer/modal_register'

const Product = props => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.isAuthenticatedCategory()
        actions.isCategoryforConsumerBusinessPage()
        actions.getCategoryByBusinessId()
        actions.isOrderAdd()
    }, [actions])
    return (
        <>
            {
                store.isAuthenticatedConsumer === false ?
                    (
                        <div className="container">
                            <div className="row pt-3">
                                <div className="col-md-9">
                                    <Link to='/'><h1>FOODLE</h1></Link>
                                </div>
                                {
                                    store.isAuthenticatedBusiness === false ?
                                        (
                                            <div className="col-md-3 d-flex justify-content-end">
                                                <button className='btn btn-primary form-control mr-2' data-toggle="modal" data-target="#modal_login">login</button>
                                                <button className='btn btn-primary form-control' data-toggle="modal" data-target="#modal_register">register</button>
                                            </div>
                                        )
                                        :
                                        (
                                            <></>
                                        )
                                }
                            </div>
                            <div className="row pt-3">
                                <div className="col-md-8 p-3">
                                    <div className="col-md-12">
                                        <h5>Categories</h5>
                                        <hr />
                                        <select id='prod' onChange={(e) => actions.selectCategoriesForFilterProducts(e)} className='form-control'>
                                            <option>Categories</option>
                                            {
                                                store.categories.length > 0 &&
                                                store.categories.map((item, i) => {

                                                    return (
                                                        <option id={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <hr></hr>
                                        <h5>Products</h5>
                                        <ul className='pl-3 pr-3 pt-2'>
                                            {
                                                store.products.length > 0 &&
                                                store.products.map((item, i) => {
                                                    return (
                                                        <div className='d-flex justify-content-between pb-3'>
                                                            <li className='p-2'>{item.thing_name}</li>
                                                            <i className="fas fa-plus">{item.name}</i>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4 p-3">
                                    {/* This container is the order of the business consumer view */}

                                    <h5 className='text-center'>Order</h5>
                                    <hr />
                                    <div id='msgOrder' className='text-center bg-light'> Login for access</div>

                                </div>
                            </div>
                            <ModalLogin />
                            <ModalRegister />
                        </div>
                    )
                    :
                    (
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
                                        <div className="dropdown-menu" /* aria-labelledby="dropdownMenuButton" */>
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
                                                            {/* <div className="input-group-append"> */}
                                                                <button className="btn btn-outline-secondary" onClick={() => actions.putConsumerInformation()}>Save</button>
                                                            {/* </div> */}
                                                        </div>
                                                    )
                                                }
                                            </div>






                                            <div className="dropdown-item pb-4" href="#">
                                                <small><strong>Address</strong></small>
                                                <div className="dropdown-divider"></div>
                                                <div className='d-flex justify-content-between text-muted pt-1'>
                                                    <div className="">Dirección actual #1220, {store.currentConsumer.consumer.address}</div>
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
                                    <div className="col-md-12">
                                        <h5>Categories</h5>
                                        <hr />
                                        <select id='prod' onChange={(e) => actions.selectCategoriesForFilterProducts(e)} className='form-control'>
                                            <option>Categories</option>
                                            {
                                                store.categories.length > 0 &&
                                                store.categories.map((item, i) => {

                                                    return (
                                                        <option id={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <hr></hr>
                                        <h5>Products</h5>
                                        <ul className='pl-3 pr-3 pt-2'>
                                            {
                                                store.products.length > 0 &&
                                                store.products.map((item, i) => {
                                                    /* console.log(item) */
                                                    return (
                                                        <div className='d-flex justify-content-between pb-3'>
                                                            <li className='p-2'>{item.thing_name}</li>
                                                            <i className="fas fa-plus" onClick={() => actions.PostAddToChart(item)}></i>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4 p-3">
                                    {/* This container is the order of the business consumer view */}
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

                                    <div className='d-flex justify-content-between pl-3 pr-3'>
                                        <label htmlFor="">$ Total:{store.add}</label>

                                    </div>
                                    <hr />
                                    <div>
                                        <button onClick={()=> actions.goCheckout(props.history)} className='btn btn-primary form-control'>Checkout</button>
                                    
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Product;