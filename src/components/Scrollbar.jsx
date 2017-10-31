import React, { Component } from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import './scrollbar.less';

const ScrollBar = (props) => {
    return (
        <div 
            className="scrollbar"
            style={{
                width: `${props.width}%`
            }} 
        />
    );
}

ScrollBar.defaultProps = {
    width: 0
};

ScrollBar.propTypes = {
    width: PropTypes.number.isRequired
};

export default connect(
    state => ({
        width : state.scrollbarwidth
    }),
    dispatch => ({})
)(ScrollBar);
