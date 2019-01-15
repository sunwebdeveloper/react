import React, { Component } from 'react'
import './modal.css'

class Modal extends Component {
    render() {
        const { estaAberta, fechaModal } = this.props;

        return (
            <div className={`modal ${estaAberta && 'modal--active'}`}
                 onclick={fechaModal}
            >
            {estaAberta && (
                <div className="modal__wrap">
                    {this.props.children}
                </div>
            )}                
            </div>
        )
    }
}

export default Modal