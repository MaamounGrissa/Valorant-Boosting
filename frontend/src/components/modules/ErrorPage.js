import React from 'react'

export default function ErrorPage(props) {
    const { msg } = props;
   
    return (
        <div className="product-page eroor-page">
            <div className="head-page">
                <img src="/images/banner_error_404.jpg" alt="Category" />
            </div>
            <div className="not-found">
                <p className ="not-found-message">{ msg }</p>
            </div>
        </div>
    )
}
