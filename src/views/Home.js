import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'
import ModalLogin from '../Components/ModalsConsumer/modal_login'
import ModalRegister from '../Components/ModalsConsumer/modal_register'

const Home = props => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.getAllBusiness()
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
                                                <button className='btn btn-primary form-control mr-2' data-toggle="modal" data-target="#modal_login">Login</button>
                                                <button className='btn btn-primary form-control' data-toggle="modal" data-target="#modal_register">Register</button>
                                            </div>
                                        )
                                        :
                                        (
                                            <></>
                                        )
                                }
                            </div>
                            <div className="row pt-3">
                                <div className="col-md-12 p-3">
                                    <h5>Lista de Rest</h5>
                                    <hr></hr>
                                    <ul className='pl-3 pr-3 pt-2'>
                                        {
                                            store.businesses.length > 0 &&
                                            store.businesses.map((item, i) => {
                                                return (
                                                    <li>
                                                        <Link id={item.id} onClick={(e) => actions.getBusinessId(e.target.id)} to='/products' >{item.name}</Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <div className="col-md-12 p-3">
                                    <h5>Want to be part of our team</h5>
                                    <hr></hr>
                                    <div className="col-md-3 d-flex justify-content-end">
                                        <Link to='/business' className='btn btn-primary form-control mr-2'>Business</Link>
                                        <Link to='/driver' className='btn btn-primary form-control mr-2'>Drivers</Link>
                                    </div>
                                </div>
                            </div>
                            <ModalLogin />
                            <ModalRegister />
                        </div>)
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
                                <div className="col-md-12 p-3">
                                    <h5>Lista de Restaurantes</h5>
                                    <hr></hr>
                                    <ul className='pl-3 pr-3 pt-2'>
                                        {
                                            store.businesses.length > 0 &&
                                            store.businesses.map((item, i) => {
                                                return (
                                                    <li>
                                                        <Link id={item.id} onClick={(e) => actions.getBusinessId(e.target.id, item.delivery_price)} to='/products' >{item.name}{item.id}</Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Home;