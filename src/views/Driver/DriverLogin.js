import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../store/appContext'
import ModalLoginDriver from '../../Components/ModalsDriver/modal_login_driver'
import ModalRegisterDriver from '../../Components/ModalsDriver/modal_register_driver'


const Driver = props => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.isAuthenticatedDriver()
    }, [actions])
    return (
        <>
            {
                store.isAuthenticatedDriver === false ?

                    ( /* conditional rendering for show the consumers buttons of login and register */
                        <div className="container">
                            <div className="row pt-3">
                                <div className="col-md-9">
                                    <Link to='/'><h1>FOODLE</h1></Link>
                                </div>
                                <div className="col-md-3 d-flex justify-content-end">
                                    <button className='btn btn-primary form-control mr-2' data-toggle="modal" data-target="#ModalLoginDriver">login</button>
                                    <button className='btn btn-primary form-control' data-toggle="modal" data-target="#ModalRegisterDriver">register</button>
                                </div>
                            </div>                        
                        <ModalLoginDriver />
                        <ModalRegisterDriver />
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
                                    <select className="form-control" id='bus' onChange={(e) => actions.Logout(e)}>
                                        <option value='user'>Usuario2</option>
                                        <option value='user'>Usuario</option>
                                        <option value='logout'>Logout</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <div className="col-md-12 p-3">
                                    <p>
                                        This Driver is authenticated
                                        </p>
                                </div>
                            </div>

                        </div>


                    )
            }
            </>
)
}

export default Driver;