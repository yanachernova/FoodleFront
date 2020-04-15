import React, { useContext } from 'react'
import { Context } from '../../store/appContext'

const ModalChangeNameCategory = props => {
    const { actions, store } = useContext(Context)
    return (
        <div className="modal fade" id="modalChangeNameCategory" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Update your category name
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="form-group modal-body">
                    <label htmlFor="">Name</label>
                    <input className="form-control" name="name" defaultValue={store.name === '' ? store.nameCurrentCategory : store.name} onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => actions.putCategoryName()} >Save changes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalChangeNameCategory

