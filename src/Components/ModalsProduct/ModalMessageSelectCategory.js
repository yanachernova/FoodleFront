import React from 'react'

const ModalMessageSelectCategory = props => {
    return (
        <div className="modal fade" id="ModalMessageSelectCategory" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Message
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                        <div className="modal-body">
                            <label className='text-muted display-6'>Select a category</label>
                        </div>
                    <div className="modal-footer">
                        <button type="button" data-dismiss="modal" className="btn btn-primary form-control">Ok</button> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalMessageSelectCategory