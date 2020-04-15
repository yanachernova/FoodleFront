import React, { useContext } from 'react'
import { Context } from '../../store/appContext'

const ModalCreateNewCategory = props => {
    const { actions } = useContext(Context)
    return (
        <div className="modal fade" id="modalCreateNewCategory" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Create new category
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="form-group modal-body">
                    <div className="form-group">    
                            <label htmlFor="password" className="form-label text-muted">Name:</label>
                            <input className="form-control" name="name" defaultValue='' onChange={e => actions.handleChange(e)} />
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={() => actions.POSTCreateNewCategory()} data-dismiss="modal" className="btn btn-primary">Add</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalCreateNewCategory

