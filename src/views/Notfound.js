import React from 'react';
import {Link} from 'react-router-dom'

const NotFound = props => {
    return (
        <div className="container">
            <div className="row pt-3">
                <div className="col-md-12">
                    <Link to='/'><h1>Not Found</h1></Link>
                 
                </div>
            </div>
        </div>
    )
}

export default NotFound;