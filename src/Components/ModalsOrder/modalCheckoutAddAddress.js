import React, { useContext } from 'react'
import { Context } from '../../store/appContext'
import Map from '../Map/Map'

const ModalCheckoutAddAddress = props => {
    const { actions } = useContext(Context)
    return (
        <div className="modal fade" id="modalCheckoutAddAddress" tabIndex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    Select yout address
                </div>
                    <div className="form-group modal-body">
                        <Map />
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>actions.postAddressMap(sessionStorage.getItem('mapAddress'))}>Save address</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default ModalCheckoutAddAddress;

