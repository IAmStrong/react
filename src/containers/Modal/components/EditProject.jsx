import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { editProjectMiddleWare } from '../../../actions/landings.js';


import host from '../../../utils/host.js';

import './addProject.less';

class EditProject extends Component {
    constructor (props) {
        super(props);

        const { name, link, description } = props.currentProject;

        this.state = {
            name,
            description,
            link
        };

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleFolderChange = this.handleFolderChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.saveProject = this.saveProject.bind(this);
    }

    handleNameChange (e) {
        // const link = e.target.value.replace(/\s+/g, '-').toLowerCase();
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

        const newProj = {
            ...this.props.currentProject,
            ...this.state
        }

        console.log("-> editComponent", newProj)
        this.props.onProjectEdit( newProj );

        this.props.closeModal();
    }

    render () {
        const isName = this.state.name;

        return (
            <form className="project-edit" onSubmit={this.saveProject}>
                <h2 className="project-title">
                    Edit project
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
                        value = { this.state.name }
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
                        value = { this.state.link }

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
                        value = { this.state.description }

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

EditProject.propTypes = {
    closeModal: PropTypes.func.isRequired,
    onProjectEdit: PropTypes.func.isRequired,
    currentProject : PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        link: PropTypes.link,
        is_active: PropTypes.number
    })
};

export default connect(
    state => ({
        currentProject : state.currentProject
    }),
    dispatch => ({
        onProjectEdit : project => {
            dispatch ( editProjectMiddleWare( project ) )
        }
    })
)(EditProject);

