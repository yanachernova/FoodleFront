import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../store/appContext'
import ModalLoginBusiness from '../../Components/ModalsBusinessConsumer/modal_login_business'
import ModalRegisterBusiness from '../../Components/ModalsBusinessConsumer/modal_register_business'
import ModalChangeNameBusiness from '../../Components/ModalsBusiness/ModalChangeNameBusiness'
import ModalCreateNewBusiness from '../../Components/ModalsBusiness/ModalCreateNewBusiness'
import ModalCreateNewCategory from '../../Components/ModalCategory/ModalCreateNewCategory'
import ModalChangeNameCategory from '../../Components/ModalCategory/ModalChangeNameCategory'
import ModalCreateNewProduct from '../../Components/ModalsProduct/ModalCreateNewProduct'
import ModalChangueProduct from '../../Components/ModalsProduct/ModalChangueProduct'
import ModalMessageSelectCategory from '../../Components/ModalsProduct/ModalMessageSelectCategory'
import img from '../../statics/Images/img.png'
import OrderButtons from '../../Components/OrderButtons'

const Business = props => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.isAuthenticatedConsumerBusiness()
        actions.isAuthenticatedBusiness()
        if (store.isAuthenticatedBusiness) {
            actions.cleanBusinessLogin()
            if (store.specBusiness.length > 0) {
                actions.getSpecificBusinesses()
                actions.isAuthenticatedOrder()
            }
        }
    }, [actions, store.isAuthenticatedBusiness, store.specBusiness.length])
    return (
        <>
            {
                store.isAuthenticatedBusiness === false ?
                    ( /* conditional rendering for show the consumers buttons of login and register */
                        <div className="container">
                            <div className="row pt-3">
                                <div className="col-md-9">
                                    <Link to='/'><h1>FOODLE</h1></Link>
                                </div>
                                <div className="col-md-3 d-flex justify-content-end">
                                    <button className='btn btn-primary form-control mr-2' data-toggle="modal" data-target="#modal_login">login</button>
                                    <button className='btn btn-primary form-control' data-toggle="modal" data-target="#modal_register">register</button>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <div className="col-md-12 p-3">
                                    <p>
                                        What is Lorem Ipsum?
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </p>
                                </div>
                            </div>
                            <ModalLoginBusiness />
                            <ModalRegisterBusiness />
                        </div>
                    )
                    :
                    (
                        <div className="container">
                            <div className="row pt-3">
                                <div className="col-md-9">
                                    <Link to='/'><h1>FOODLE</h1></Link>
                                </div>
                                {/* store.selection === "Usario" ? true : condition2 ? true2 : condition3 ? true3 : false */}
                                <div className="col-md-3 d-flex justify-content-end">
                                    <select className="form-control" id='bus' onChange={(e) => actions.Logout(e)}>
                                        <option value='Get orders'>Get orders</option>
                                        <option value='Business settings'>Business settings</option>
                                        <option value='logout'>Logout</option>
                                    </select>
                                </div>
                            </div>
                            {store.selection === "Business settings" ?

                                (
                                    <div className="container">
                                        <div className="row pt-3">
                                            <div className="col-md-12 p-3">
                                                <hr></hr>
                                                <p>Business</p>
                                                <hr></hr>
                                                {store.specBusiness.length < 1 ? (
                                                    <div className='d-flex'>
                                                        <i className='fas fa-plus pr-3' data-toggle="modal" data-target="#modalCreateNewBusiness"></i>
                                                        <p className=''>Add business</p>
                                                    </div>
                                                )
                                                    :
                                                    (<p>Your Business:</p>)}
                                                {
                                                    store.specBusiness.length > 0 &&
                                                    store.specBusiness.map((item, i) => {
                                                        return (
                                                            <div className='d-flex justify-content-between'>
                                                                {item.name}
                                                                <i className='fas fa-pencil-alt' id={item.id} data-toggle="modal" data-target="#modalChangeNameBusiness" onClick={(e) => actions.getBusinessData(e.target.id, item.name, item.phone_number, item.delivery_price, item.address)}></i>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-md-12 p-3">
                                                <hr></hr>
                                                <p>Categories</p>
                                                <hr></hr>
                                                <div className='d-flex'>
                                                    {
                                                        store.specBusiness < 1 ?
                                                            (
                                                                <></>
                                                            )
                                                            :
                                                            (
                                                                <i className='fas fa-plus pr-3' data-toggle="modal" data-target="#modalCreateNewCategory"></i>
                                                            )
                                                    }
                                                    <p className=''>Add category</p>
                                                </div>
                                                <p>Your Categories:</p>
                                                {
                                                    store.specCategory.length > 0 &&
                                                    store.specCategory.map((item, i) => {
                                                        return (
                                                            <div className='d-flex justify-content-between'>
                                                                {item.name}
                                                                <div>
                                                                    <i className='fas fa-pencil-alt pr-3' id={item.id} data-toggle="modal" data-target="#modalChangeNameCategory" onClick={(e) => actions.getCategoryId(e.target.id)}></i>
                                                                    <i className='fas fa-trash' id={item.id} onClick={(e) => actions.deleteBusinessCategories(e.target.id)}></i>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>

                                        <div className='row pb-5'>
                                            <div className="col-md-12 p-3 tb-5">
                                                <hr />
                                                <p className='pr-2'>Products</p>
                                                <hr />
                                                <select id='prod' onChange={(e) => actions.selectCategoriesForFilterProductsinBusinessLogin(e)} className='form-control mb-3'>
                                                    <option>Select a category</option>
                                                    {
                                                        store.specCategory.length > 0 &&
                                                        store.specCategory.map((item, i) => {
                                                            return (
                                                                <option id={item.id}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                                <div className='d-flex'>
                                                    <i className='fas fa-plus pr-3' data-toggle="modal" data-target={store.nameCategoryProductBusinessLogin === '' || store.nameCategoryProductBusinessLogin === 'Select a category' ? "#ModalMessageSelectCategory" : "#ModalCreateNewProduct"}></i>
                                                    <p className=''>Add product</p>
                                                </div>
                                                <p>Your products:</p>


                                                <div className="row">
                                                    {

                                                        store.specProducts.length > 0 &&
                                                        store.specProducts.map((item, i) => {
                                                            return (
                                                                <div className='col-md-2'>
                                                                    <div className='card'>
                                                                        <div className='card-header d-flex justify-content-between'>
                                                                            {item.thing_name}
                                                                            <div>
                                                                                <i className='fas fa-pencil-alt pr-3' onClick={() => actions.getProductId(item.id, item.thing_name, item.price, item.not_available, item.description)} data-toggle="modal" data-target="#ModalChangueProduct"></i>
                                                                                <i className='fas fa-trash' onClick={() => actions.deleteBusinessProducts(item.id)}></i>
                                                                            </div>
                                                                        </div>
                                                                        <ul className="list-group list-group-flush">
                                                                            <li className="list-group-item pl-3 pt-1 pb-1"><small className='font-weight-bold'>Price</small><br />$ {item.price}</li>
                                                                            <li className="list-group-item pl-3 pt-1 pb-1"><small className='font-weight-bold'>State</small><br />{item.not_available === true ? 'Available' : 'No Available'}</li>
                                                                            <li className="list-group-item pl-3 pt-1 pb-1"><small className='font-weight-bold'>Description</small><br />{item.description}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })


                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <ModalChangeNameBusiness />
                                        <ModalCreateNewCategory />
                                        <ModalChangeNameCategory />
                                        <ModalCreateNewBusiness />
                                        <ModalCreateNewProduct />
                                        <ModalChangueProduct />
                                        <ModalMessageSelectCategory />
                                    </div>
                                )
                                :
                                (
                                    <div className="row">
                                        <br />
                                        {store.ordersBusinessPanel.length > 0 ?
                                            (
                                                store.ordersBusinessPanel.map((item, i) => {

                                                    return (
                                                        item.product_details.length > 0 &&
                                                        item.product_details.map((item2, i2) => {
                                                            return (
                                                                <OrderButtons 
                                                                times={item.times} 
                                                                comment={item.comment} 
                                                                thing_name={item2.thing_name} 
                                                                quantity={item2.quantity}
                                                                deleteOrderById={()=>actions.deleteOrderById(item.id)}
                                                                i={i}
                                                                />
                                                            )
                                                        }))
                                                })

                                            )
                                            :
                                            (
                                                <>
                                                    <h1>Sorry you dont have any orders yet</h1>
                                                    <img src={img} alt='.' width='500' />
                                                </>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
            }
        </>
    )
}

export default Business;