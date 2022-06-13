import React from 'react'

const compareTemplate = ({prdDetails}) => {
    return (
        <div>
            <div className="center-everything">
                <img className="img-fluid d-block m-auto" width="30%" src={prdDetails.image} alt="product" />
            </div>
            <p>{prdDetails.title}</p>
            <p>{prdDetails.category}</p>
            <span className="current-price">&#8377; {prdDetails.price}</span>
        </div>
    )
}

export default compareTemplate
