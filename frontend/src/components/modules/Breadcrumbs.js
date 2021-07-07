import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumbs(props) {
    const { bdcrumbs } = props;
    return (
        <div className="breadcrumbs">
            {
                bdcrumbs.home ? <Link to="/"><i className="fas fa-house-damage"></i></Link> : ''
            }
            {
                bdcrumbs.cat ?  <Link to={bdcrumbs.cat.link}>{bdcrumbs.cat.text}</Link> : ''
            }
            {
                bdcrumbs.current ? <span>{bdcrumbs.current.text}</span> : ''
            }
            {
                bdcrumbs.error ? <span>{bdcrumbs.error.text}</span> : ''
            }
        </div>
    )
}
