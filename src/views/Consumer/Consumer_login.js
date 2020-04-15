import React, { useContext } from 'react'
import { Context } from '../../store/appContext'

const ConsumerLogin = props => {
    const { actions } = useContext(Context)
    return (
        <>
                    <div className="form-group modal-body">
                        <div className="form-group">
                            <label htmlFor="username" className="form-label text-muted">Email:</label>
                            <input type="text"  name="email" onChange={e => actions.handleChange(e)} className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label text-muted">Password:</label>
                            <input type="password"  name="password" onChange={e => actions.handleChange(e)} className="form-control"></input>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-primary mr-1" onClick={() =>actions.loginConsumersPost(props.history)} data-dismiss="modal">Access</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                    </div>
        </>

    )
}
export default ConsumerLogin