import React, { useContext } from 'react'
import { Context } from '../../store/appContext'

const ModalChangeNameBusiness = props => {
    const { actions, store } = useContext(Context)
    return (
        <div className="modal fade" id="modalChangeNameBusiness" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Update Business
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="form-group modal-body">
                    <label htmlFor="">Name</label>
                    <input className="form-control" name="name" defaultValue={ store.name === '' ? store.nameCurrentBusiness:store.name } onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="form-group modal-body">
                    <label htmlFor="">Address</label>
                    <input className="form-control" name="address" defaultValue={store.address === '' ? store.addressCurrentBusiness : store.address} onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="form-group modal-body">
                    <label htmlFor="">Phone Number</label>
                    <input className="form-control" name="phone_number" defaultValue={store.phone_number === '' ? store.phoneNumberCurrentBusiness : store.phone_number} onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="form-group modal-body">
                    <label htmlFor="">Delivery Price</label>
                    <input className="form-control" name="delivery_price" defaultValue={store.delivery_price === ''  ? store.deliveryPriceCurrentBusiness : store.delivery_price} onChange={e => actions.handleChange(e)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => actions.putBusinessName()} >Save changes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalChangeNameBusiness

