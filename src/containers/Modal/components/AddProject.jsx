import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProjectMiddleWare } from '../../../actions/landings.js';


import { addNewProject } from '../../../utils/Api.js';
import host from '../../../utils/host.js';

import './addProject.less';

class AddProject extends Component {
    constructor () {
        super();

        this.state = {
            name: '',
            link: '',
            description: ''
        };

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleFolderChange = this.handleFolderChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.saveProject = this.saveProject.bind(this);
    }

    handleNameChange (e) {
        const name = e.target.value;

        this.setState({ name: name });
    }

    handleFolderChange (e) {
        const link = e.target.value.replace(/\s+/g, '-').toLowerCase();

        this.setState({ link: link });
    }

    handleDescriptionChange (e) {
        const description = e.target.value;

        this.setState({ description: description });
    }

    saveProject (e) {
        e.preventDefault();

        const newProject = {
            name : this.state.name,
            link : this.state.link,
            description : this.state.description
        };

        this.props.onAddProject( newProject )
        this.props.closeModal();
    }

    render () {
        const isName = this.state.name;

        return (
            <form className="project-add" onSubmit={this.saveProject}>
                <h2 className="project-title">
                    New project
                    <span className={`${!isName && "hidden"}`}> / </span>
                    <span className="project-name">{this.state.name}</span>
                </h2>
                <div className="input-container">
                    <input
                        className="custom-input" 
                        type="text" 
                        maxLength="36"
                        placeholder="Name"
                        onChange={this.handleNameChange}
                        required="required"
                    />
                    <span className="focus-border">{}</span>
                </div>
                <div className="input-container">
                    <input
                        className="custom-input" 
                        type="text" 
                        maxLength="36"
                        placeholder="Link"
                        onChange={this.handleFolderChange}
                        required="required"
                    />
                    <span className="focus-border">{}</span>
                </div>
                <div className="input-container">
                    <input
                        className="custom-input" 
                        type="text" 
                        maxLength="80"
                        placeholder="Description"
                        onChange={this.handleDescriptionChange}
                        required="required"
                    />
                    <span className="focus-border">{}</span>
                </div>
                <div className="link-container">
                    <p className="project-link">
                        { host }
                        <span className="link-highlight">
                            {this.state.link}
                        </span>
                    </p>
                </div>
                <div className="button-container">
                    <button 
                        className="button-save button-primary buttom-green"
                    >
                        <i 
                            className="fa fa-check"
                            aria-hidden="true"
                        />
                        Save
                    </button>
                </div>
            </form>
        );        
    }
}

AddProject.propTypes = {
    closeModal: PropTypes.func.isRequired,
    onAddProject: PropTypes.func.isRequired
};

export default connect(
    state => ({}),
    dispatch => ({
        onAddProject : ( newProject ) => {
            dispatch( addProjectMiddleWare( newProject ) )
        }
    })
)(AddProject);
