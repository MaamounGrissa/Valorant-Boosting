import React from 'react'

export default function ModalCommande(props) {
    const { product, qty } = props;

    if (!props.show) {
        return null;
    } else {
        return (
            <div className="modal-container">
                <div className="modal-box">
                    <div className="modal-content">
                        <div className="modal-header">
                            <img src={product.image} alt={product.name} />
                            <button id="close-modal" onClick={props.onClose} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            <h2>Order Details</h2>
                        </div>
                        <div className="modal-form">
                            <form>
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input type="text" value={product.name} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="text" value={qty} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" required />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" name="phone" required />
                                </div>
                                <div className="form-group">
                                    <label>Shipping Adress</label>
                                    <input type="text" name="adress" />
                                </div>
                                <div className="submit-section">
                                    <div id="feedback">
                                        <span>Command is Done</span> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Wait for our call </span>
                                    </div>
                                    <button className="view-all confirm-command">Confirm command</button>
                                </div>
    
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
