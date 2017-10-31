import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

import { connect } from 'react-redux';
import { editRuleMiddleware } from '../../actions/rules.js';
import { Link, hashHistory } from 'react-router';
import { chooserule } from '../../utils/actiontypes.js';

import './rule.less';

import host from '../../utils/host.js';

class Rule extends Component {
    constructor () {
        super();

        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.toggleActivity = this.toggleActivity.bind(this);
    }

    toggleActivity () {
        const newRule = {
            ...this.props.data,
            is_active : !this.props.data.is_active,
            projectID : this.props.projectID
        }

        this.props.onRuleEdit( newRule );

    }

    remove () {
        const rule = this.props.data;

        this.props.onRemove(rule);
    }

    edit () {
        const rule = this.props.data;
        this.props.onEdit( rule );
    }

    render () {
        const rule = this.props.data;

        // console.log("projectLink->", this.props.projectLink)

        return (
            <div className={`rule-item ${ !rule.is_active && 'not_active' }`} role="button">
                <div className="project-header">
                    <span className="project-title">{ rule.name }</span>
                </div>
                {
                    rule.is_active ?
                        <div className="rule-description description-standard">
                            { 
                                rule.params.map( item => {
                                    return <div key = {item.param} className={`chip ${item.priority && 'high-priority'}`}>{item.value} <sup className="param">{item.param}</sup></div>
                                } )
                            }
                        </div>
                        :
                        null
                }
                
                <div className="project-controls">
                    <i 
                        className="fa fa-eye" 
                        aria-hidden="true" 
                        onClick={this.toggleActivity}
                    />
                    {
                        rule.is_active ?
                            <i 
                                className="fa fa-pencil"
                                aria-hidden="true"
                                onClick={this.edit}
                            />
                            :
                            null
                    }
                    <i 
                        className="fa fa-times"
                        aria-hidden="true"
                        onClick={this.remove}
                    />
                </div>
                <div className="bottom-container">
                    <span className="project-id">
                        {`rule_${rule.id}`}
                    </span>
                    { 
                        rule.is_active ?
                            <a 
                                className="project-link"
                                href={`${ host }${this.props.projectLink}/${ rule.link }`}
                                target="_blank">
                                {`${ host }${this.props.projectLink}/${ rule.link }`}
                            </a>
                            :
                            null
                    }
                </div>
            </div>
        );        
    }
};

Rule.propTypes = {
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRuleEdit: PropTypes.func.isRequired,
    data: PropTypes.shape({
        id: PropTypes.boolean,
        name: PropTypes.string,
        description: PropTypes.string,
        link: PropTypes.link,
        is_active: PropTypes.bool
    })
};

export default connect(
    state => ({}),
    dispatch => ({
        onRuleEdit : rule => {
            dispatch ( editRuleMiddleware( rule ) )
        }
    })
)(Rule);


let priorityColor = {
    high : {
        "backgroundColor" : "#"
    }
}
