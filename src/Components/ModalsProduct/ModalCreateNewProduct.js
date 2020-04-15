import React, { useContext } from 'react'
import { Context } from '../../store/appContext'

const ModalCreateNewProduct = props => {
    const { actions, store } = useContext(Context)
    return (
        <div className="modal fade" id="ModalCreateNewProduct" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Create new product
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="form-group modal-body">
                    <div className="form-group">
                        <label className='text-muted display-6'>Category selected <strong>{store.nameCategoryProductBusinessLogin}</strong></label>
                    </div>
                    <div className="form-group">    
                            <label htmlFor="name" className="form-label text-muted">Name:</label>
                            <input className="form-control" name="name" defaultValue={store.name} onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="form-group">    
                            <label htmlFor="password" className="form-label text-muted">Price:</label>
                            <input type='number' className="form-control" name="price" defaultValue={store.price} onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="form-group">    
                            <label htmlFor="available" className="form-label text-muted">Available:</label>
                            <input type='checkbox' className="form-control" name="not_available" defaultValue={store.not_available} onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="form-group">    
                            <label htmlFor="description" className="form-label text-muted">Description:</label>
                            <textarea name="description" defaultValue={store.description} className="form-control" rows="5" cols="50" onChange={e => actions.handleChange(e)}></ textarea>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={() => actions.POSTCreateNewProduct()} data-dismiss="modal" className="btn btn-primary">Add</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalCreateNewProduct

