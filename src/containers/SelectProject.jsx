import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
    chooseProject,
    setScrollbarWidth
} from '../utils/actiontypes.js';

import fetchData from '../utils/fetchData.js';
import { deleteProject } from '../utils/Api.js';

import { getLandingsMiddleware } from '../actions/landings.js';

import Modal from './Modal/Modal.jsx';
import AddProject from './Modal/components/AddProject.jsx';
import EditProject from './Modal/components/EditProject.jsx';
import RemoveProject from './Modal/components/RemoveProject.jsx';

import Header from '../components/Header.jsx';
import Preloader from '../components/Preloader.jsx';

import Project from './components/Project.jsx';

import './selectProject.less';

class SelectProject extends Component {
    constructor () {
        super();

        this.state = {
            modalIsOpen: false,
            mode: null,
            beginIndex : 0,
            numberOfItemsShown: 4
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setAddMode = this.setAddMode.bind(this);
        this.setEditMode = this.setEditMode.bind(this);
        this.setRemoveMode = this.setRemoveMode.bind(this);
        this.doScroll = this.doScroll.bind(this);
    }

    componentDidMount () {
        this.props.onFetchProjects();
    }

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.isFetching) {
            let payload = {
                numberOfItemsShown: this.state.numberOfItemsShown,
                projectsLen: this.props.projects.length,
                beginIndex: this.state.beginIndex
            };

            this.props.onScroll(payload);
        }
    }

    doScroll (e) {
        if(this.state.modalIsOpen) {
            return;
        }

        let scrollDelta = e.deltaY;
        let scrollNum = scrollDelta / 100;

        if (this.state.beginIndex + scrollNum < 0 || 
            this.state.beginIndex + this.state.numberOfItemsShown + 
            scrollNum > this.props.projects.length) {

            return;
        }

        let newBeginIndex = this.state.beginIndex + scrollNum;

        this.setState((state, props) => {
            return { 
                beginIndex: newBeginIndex
            }
        });

        let payload = {
            numberOfItemsShown: this.state.numberOfItemsShown,
            projectsLen: this.props.projects.length,
            beginIndex: newBeginIndex
        };

        this.props.onScroll(payload);
    }

    openModal () {
        this.setState({modalIsOpen: true});
    }

    closeModal () {
        this.setState({modalIsOpen: false});
    }

    setAddMode () {
        this.setState({mode: 'add'});
        this.openModal();
    }

    setEditMode (project) {
        this.setState({mode: 'edit'});

        this.props.onChooseProject(project);

        this.openModal();
    }

    setRemoveMode (project) {
        this.setState({mode: 'remove'});

        this.props.onChooseProject(project);

        this.openModal();
    }

    render () {
        const projects = this.props.projects;

        const mode = this.state.mode;
        const modes = {
            'add': () => {
                return (
                    <AddProject
                        closeModal = {this.closeModal}
                    />
                );
            },
            'edit': () => {
                return (
                    <EditProject 
                        closeModal = {this.closeModal}
                    />
                );
            },
            'remove': () => {
                return (
                    <RemoveProject 
                        closeModal = {this.closeModal}
                    />
                );
            },
            'default': () => {
                return null;
            }
        };

        const modalElement = (modes[mode] || modes['default'])();

        return (
            <div 
                className="main-wrapper"
                onWheel = {this.doScroll}
            >
                <Header />
                <Modal
                    isOpen = {this.state.modalIsOpen}
                    close = {this.closeModal}>
                    { modalElement }
                </Modal>
                <div className="project_page">
                    <div className="page-wrapper">
                        <h1 className="title">Choose a project</h1>
                        <div className="project-container">
                            {this.props.projects.map( (project, index) => {
                                let ret = null;
                                if(index >= this.state.beginIndex &&
                                    index < this.state.beginIndex +
                                    this.state.numberOfItemsShown) {
                                    ret = <Project
                                        key = {project.id}
                                        data = {project}
                                        onEdit = {this.setEditMode}
                                        onRemove = {this.setRemoveMode}
                                    />
                                }
                                return ret;
                            }
                            )
                            }
                        </div>
                        <button 
                            className="button-add button-primary button-blue"
                            onClick={this.setAddMode}
                        >
                            <i className="fa fa-plus" aria-hidden="true" />
                            New Project
                        </button>
                    </div>
                    <div className="ribbon">WizardsDev</div>
                    {this.props.isFetching && <Preloader/>}
                </div>
            </div>
        );        
    }
}

SelectProject.propTypes = {
    onFetchProjects: PropTypes.func.isRequired,
    onChooseProject: PropTypes.func,
    isFetching: PropTypes.boolean,
    onScroll: PropTypes.func,
    projects: PropTypes.arrayOf(
        PropTypes.shape({})
    )
};

export default connect(
    state => ({
        projects : state.landings,
        isFetching : state.isFetching,
        currentProject : state.currentProject
    }),
    dispatch => ({
        onFetchProjects : () => {
            dispatch ( getLandingsMiddleware() );
        },
        onChooseProject : ( project ) => {
            dispatch ( chooseProject( project ) )
        },
        onScroll : ( payload ) => {
            dispatch ( setScrollbarWidth( payload ) )
        }
    })
)(SelectProject);
