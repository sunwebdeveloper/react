import React, { Component } from 'react';

import './modal.css';

class Modal extends Component {
  static defaultProps = {
    estaAberta: false
  }

  render() {
    const { children, estaAberta, fechaModal } = this.props;

    return (
      <div
        className={`modal ${estaAberta && 'modal--active'}`}
        onClick={fechaModal}
      >
        {estaAberta && (
          <div className="modal__wrap">
            {children}
          </div>
        )}
      </div>
    );
  }
}

export default Modal;
