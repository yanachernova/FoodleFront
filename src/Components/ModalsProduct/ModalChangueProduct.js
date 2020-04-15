import React, { useContext } from 'react'
import { Context } from '../../store/appContext'

const ModalChangueProduct = props => {
    const { actions, store } = useContext(Context)
    return (
        <div className="modal fade" id="ModalChangueProduct" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Update product
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="form-group modal-body">
                    <div className="form-group">    
                            <label htmlFor="name" className="form-label text-muted">Name:</label>
                            <input type='text' className="form-control" name="name" defaultValue={store.name === '' ? store.nameCurrentProduct : store.name} onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="form-group">    
                            <label htmlFor="price" className="form-label text-muted">Price:</label>
                            <input type='number' className="form-control" name="price" defaultValue={store.price === '' ? store.priceCurrentProduct : store.price} onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="form-group">    
                            <label htmlFor="password" className="form-label text-muted">Available:</label>
                            <input type='checkbox' className="form-control" name="not_available" defaultValue={store.not_available === '' ? store.not_availableCurrentProduct : store.not_available} onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="form-group">    
                            <label htmlFor="password" className="form-label text-muted">Description:</label>
                            <textarea name="description" className="form-control" defaultValue={store.description === '' ? store.descriptionCurrentProduct : store.description} rows="5" cols="50" onChange={e => actions.handleChange(e)}></ textarea>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={() => actions.putProductData()} data-dismiss="modal" className="btn btn-primary">Update</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalChangueProduct

