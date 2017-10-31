import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { editProjectMiddleWare } from '../../actions/landings.js';
import { Link, hashHistory } from 'react-router';
import {
    chooseProject,
    setRules
} from '../../utils/actiontypes.js';

import host from '../../utils/host.js';

class Project extends Component {
    constructor () {
        super();

        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.toggleActivity = this.toggleActivity.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    toggleActivity () {
        const newProj = {
            ...this.props.data,
            is_active : !this.props.data.is_active
        }

        this.props.onProjectEdit( newProj );

    }

    remove () {
        const project = this.props.data;

        this.props.onRemove(project);
    }

    edit () {
        const project = this.props.data;

        this.props.onEdit(project);
    }

    navigate () {
        if (!this.props.data.is_active)
        {
            return;
        }
        this.props.onChooseProject(this.props.data);
        hashHistory.push(`/project/${this.props.data.id}`);
    }

    render () {
        const { id, name, description, link, is_active} = this.props.data;

        
        return (
            <div className={`project ${ !is_active && 'not_active' }`} >
                <div className="project-header" role="button" onClick={this.navigate}>
                    <span className="project-title" >{ name }</span>
                </div>
                <div className="project-description">{ description }</div>
                <div className="project-controls">
                    <i 
                        className="fa fa-eye" 
                        aria-hidden="true" 
                        onClick={this.toggleActivity}
                    />
                    {
                        is_active ?
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
                <span className="project-id">
                    {`LANDING_${id}`}
                </span>
                { 
                    is_active ?
                        <a 
                            className="project-link"
                            href={`${ host }${ link }`}
                            target="_blank">
                            {`${ host }${ link }`}
                        </a>
                        :
                        null
                }
            </div>
        );        
    }
};

Project.propTypes = {
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onProjectEdit: PropTypes.func.isRequired,
    data: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        link: PropTypes.link,
        is_active: PropTypes.number
    })
};

export default connect(
    state => ({}),
    dispatch => ({
        onProjectEdit : project => {
            dispatch ( editProjectMiddleWare( project ) )
        },
        onChooseProject : ( project ) => {
            dispatch ( chooseProject( project ) );
            dispatch ( setRules( project.rules ) );
        }
    })
)(Project);
