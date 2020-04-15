import React, { useContext } from 'react'
import { Context } from '../../store/appContext'
import Facebook from './../FacebookLoginRegister/facebook_login'

const ModalLogin = props => {
    const { actions, store } = useContext(Context)
    return (
        <div className="modal fade" id="modal_login" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Login
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="form-group modal-body">
                        <div>{store.errorLoginConsumer.msg}</div>
                        <div className="form-group">
                        <Facebook />
                        <hr/>
                            <label htmlFor="username" className="form-label text-muted">Email:</label>
                            <input type="text"  name="email" id="LoginConsumerEmail" onChange={e => actions.handleChange(e)} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label text-muted">Password:</label>
                            <input type="password"  name="password" id="LoginConsumerPassword" onChange={e => actions.handleChange(e)} className="form-control"></input>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-primary mr-1" data-dismiss="modal" onClick={() =>actions.loginConsumersPost()}>Access</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalLogin