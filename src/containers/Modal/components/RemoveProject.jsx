import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeProjectMiddleWare } from '../../../actions/landings.js';


// import { editExistingProject } from '../../../utils/Api.js';
// import host from '../../../utils/host.js';

class RemoveProject extends Component {
    constructor () {
        super();

        this.remove = this.remove.bind(this);
    }

    remove (e) {
        e.preventDefault();

        this.props.onProjectRemove( this.props.currentProject.id );
        
        this.props.closeModal();
    }

    render () {
        const { name, description } = this.props.currentProject;

        return (
            <form className="project-remove" onSubmit={this.remove}>
                <h2 className="project-title">
                    Remove project
                </h2>
                <div className="text-container">
                    Are you sure to remove <span 
                        className="project-name">
                        {name}</span>?
                </div>
                <div className="description-container">
                    {description}
                </div>
                <div className="button-container">
                    <button 
                        className="button-remove button-primary buttom-red"
                    >
                        <i 
                            className="fa fa-times"
                            aria-hidden="true"
                        />
                        Remove
                    </button>
                </div>
            </form>
        );        
    }
}

RemoveProject.propTypes = {
    closeModal: PropTypes.func.isRequired,
    onProjectRemove: PropTypes.func.isRequired,
    currentProject: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        description: PropTypes.string
    })
};

export default connect(
    state => ({
        currentProject : state.currentProject
    }),
    dispatch => ({
        onProjectRemove : projectID => {
            dispatch ( removeProjectMiddleWare( projectID ) )
        }
    })
)(RemoveProject);
