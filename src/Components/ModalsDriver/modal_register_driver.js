import React, { useContext } from 'react'
import { Context } from '../../store/appContext'

const ModalRegisterDriver = props => {
    const { actions } = useContext(Context)
    return (
        <div className="modal fade" id="ModalRegisterDriver" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Register
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="form-group modal-body">
                    <div className="form-group">
                            <label htmlFor="username" className="form-label text-muted">Full Name:</label>
                            <input type="text" name="fullname" onChange={e => actions.handleChange(e)} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="form-label text-muted">Email:</label>
                            <input type="text" name="email" onChange={e => actions.handleChange(e)} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label text-muted">Password:</label>
                            <input type="password" name="password" onChange={e => actions.handleChange(e)} className="form-control"></input>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-primary mr-1" onClick={() =>actions.registerDriverPost()} data-dismiss="modal">Register</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalRegisterDriver