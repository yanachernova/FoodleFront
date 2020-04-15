import React from 'react'

const ModalCheckoutPaymentMethod = props => {
    return (
        <div className="modal fade" id="modalCheckoutPaymentMethod" tabIndex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    Add card
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="form-group modal-body">
                <label htmlFor="">Card info:</label>
                <input className="form-control" name="name" />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Save changes</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default ModalCheckoutPaymentMethod

