import React from 'react'
import Breadcrumbs from './Breadcrumbs';

export default function ErrorPage(props) {
    const { msg } = props;
    const bdcrumbs = {
        homeLink: {
            link: '/',
            text: 'home'
        },
        current: {
            link: "/",
            text: "Error"
        },
    }
    return (
        <div className="product-page eroor-page">
            <div className="head-page">
                <img src="/images/banner_error_404.jpg" alt="Category" />
                <Breadcrumbs bdcrumbs={bdcrumbs} />
            </div>
            <div className="not-found">
                <p className ="not-found-message">{ msg }</p>
            </div>
        </div>
    )
}
