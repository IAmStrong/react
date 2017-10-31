import React, { Component } from 'react';

import { logoutRequest } from '../utils/Api.js';

import Scrollbar from './Scrollbar.jsx';

import './header.less';

class Header extends Component {
    constructor () {
        super();

        this.logout.bind(this);
    }

    logout () {
        logoutRequest();
    }

    render () {
        return (
            <header className="header">
                <div className="header-wrapper">
                    <div className="header-logo-container">
                        <i 
                            className="fa fa-eercast" 
                            aria-hidden="true" 
                        />
                        <div className="header-logo">MultiLanding</div>
                    </div>
                    <a className="header-logged_in">
                        <i 
                            className="fa fa-power-off"
                            aria-hidden="true" 
                            onClick={ this.logout }
                        />
                    </a>
                </div>
                <Scrollbar />
            </header>
        );    
    }
}

export default Header;
