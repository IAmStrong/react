import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import './modal.less';

class Modal extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modalIsOpen: props.isOpen
        };

        this.setNode = this.setNode.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModalEsc = this.closeModalEsc.bind(this);
        this.addEventHandler = this.addEventHandler.bind(this);
        this.removeEventHandler = this.removeEventHandler.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const isOpen = nextProps.isOpen;

        this.setState({modalIsOpen: nextProps.isOpen});

        isOpen ? this.addEventHandler() : this.removeEventHandler();
    }

    addEventHandler () {
        document.addEventListener('click', this.closeModal);
        document.addEventListener('keydown', this.closeModalEsc);
    }

    removeEventHandler () {
        document.removeEventListener('click', this.closeModal);
        document.removeEventListener('keydown', this.closeModalEsc);
    }

    closeModal (e) {
        console.log('i\'ve been called by: ', e.target.classList);
        if (e.target.classList.contains('modal-overlay')) {
            const closeModal = this.props.close;

            this.setState({modalIsOpen: false});

            closeModal();
        }
    }

    closeModalEsc (e) {
        const esc = e.which === 27;

        if (esc) {
            const closeModal = this.props.close;

            this.setState({modalIsOpen: false});

            closeModal();
        }
    }

    setNode (node) {
        this.node = node;
    }
    render () {
        const isOpen = this.state.modalIsOpen;

        return (
            <div className={`modal-overlay ${!isOpen && "hidden"}`}>
                {isOpen &&
                    <div
                        className="modal-wrapper" 
                        ref={this.setNode}
                    >
                        {this.props.children}
                    </div>}
            </div>
        );
    }
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func,
    children: PropTypes.node
};

export default Modal;
