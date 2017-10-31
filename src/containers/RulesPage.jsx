import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
    chooseRule,
    setScrollbarWidth,
    setRules
} from '../utils/actiontypes.js';
import { getLandingsMiddleware } from '../actions/landings.js';

import Modal from './Modal/Modal.jsx';

import CreateRule from './Modal/components/rules/createRule.jsx';
import EditRule from './Modal/components/rules/editRule.jsx';
import RemoveRule from './Modal/components/rules/removeRule.jsx';

import Header from '../components/Header.jsx';
import Preloader from '../components/Preloader.jsx';

import Rule from './components/Rule.jsx';

class RulesPage extends Component {
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

    componentWillMount () {
        if(!this.props.currentProject) {
            this.props.onFetchProjects();
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.isFetching) {
            let payload = {
                numberOfItemsShown: this.state.numberOfItemsShown,
                projectsLen: this.props.rules.length,
                beginIndex: this.state.beginIndex
            };

            this.props.onScroll(payload);
        }

        if (nextProps.currentProject && !nextProps.rules.length) {
            this.props.onSetRules(nextProps.currentProject.rules);
        }
    }

    doScroll (e) {
        if(this.state.modalIsOpen) {
            return;
        }

        let scrollDelta = e.deltaY;
        let scrollNum = scrollDelta / 100;

        if (this.state.beginIndex + scrollNum < 0 ||
            this.state.beginIndex + this.state.numberOfItemsShown + scrollNum >
            this.props.rules.length) {

            return;
        }

        let newBeginIndex = this.state.beginIndex + scrollNum;

        this.setState((state, props) => {
            return {
                beginIndex: newBeginIndex
            };
        });

        let payload = {
            numberOfItemsShown: this.state.numberOfItemsShown,
            projectsLen: this.props.rules.length,
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

    setEditMode (rule) {
        this.setState({mode: 'edit'});

        this.props.onChooseRule({
            ...rule,
            projectID : this.props.currentProject.id
        });

        this.openModal();
    }

    setRemoveMode (rule) {
        this.setState({mode: 'remove'});

        this.props.onChooseRule({
            ...rule,
            projectID : this.props.currentProject.id
        });

        this.openModal();
    }

    render () {
        const mode = this.state.mode;
        const modes = {
            'add': () => {
                return (
                    <CreateRule
                        closeModal = {this.closeModal}
                        projectID = {this.props.currentProject.id}
                    />
                );
            },
            'edit': () => {
                return (
                    <EditRule 
                        closeModal = {this.closeModal}
                    />
                );
            },
            'remove': () => {
                return (
                    <RemoveRule 
                        closeModal = {this.closeModal}
                    />
                );
            },
            'default': () => {
                return null;
            }
        };

        const modalElement = (modes[mode] || modes['default'])();

        const rules = this.props.rules;

        const projectName = this.props.currentProject ?
            this.props.currentProject.name : '';
        const projectLink = this.props.currentProject ?
            this.props.currentProject.link : '';
        const projectID = this.props.currentProject ?
            this.props.currentProject.id : '';

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
                        <h1 
                            className="title"
                        >
                            Rules for project {`"${projectName}"`}
                        </h1>
                        <div className="project-container rules-container">
                            {
                                rules.map((rule, index) => {
                                    let ret = null;

                                    if (index >= this.state.beginIndex &&
                                        index < this.state.beginIndex +
                                        this.state.numberOfItemsShown) {
                                        ret = <Rule
                                            key = {rule.id}
                                            data = {rule}
                                            projectLink = {projectLink}
                                            projectID = {projectID}
                                            onEdit = {this.setEditMode}
                                            onRemove = {this.setRemoveMode}
                                        />
                                    }

                                    return ret;
                                })
                            }
                        </div>
                        <button 
                            className="button-add button-primary button-blue"
                            onClick={this.setAddMode}
                        >
                            <i className="fa fa-plus" aria-hidden="true" />
                            New Rule
                        </button>
                    </div>
                    <div className="ribbon">WizardsDev</div>
                    {this.props.isFetching && <Preloader/>}
                </div>
            </div>
        );        
    }
}

RulesPage.propTypes = {
    onFetchRules: PropTypes.func,
    onFetchProjects: PropTypes.func,
    onChooseProject: PropTypes.func,
    onChooseRule: PropTypes.func,
    onSetRules: PropTypes.func,
    onScroll: PropTypes.func,
    isFetching: PropTypes.boolean,
    rules: PropTypes.arrayOf(
        PropTypes.shape({})
    ),
    currentProject: PropTypes.shape({
        rules: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        link: PropTypes.string
    })
};

export default connect(
    (state, ownProps) => {
        let currentProject = state.landings.find(
            item => item.id === ownProps.params.id
        );
        let rules = [];

        if (state.rules.length != 0) {
            rules = state.rules;
        }

        return ({
            currentProject,
            isFetching: state.isFetching,
            rules
        })
    },
    dispatch => ({
        onFetchProjects: () => {
            dispatch(getLandingsMiddleware());
        },
        onChooseRule: (rule) => {
            dispatch(chooseRule(rule));
        },
        onSetRules: rules => {
            dispatch(setRules(rules));
        },
        onScroll: (payload) => {
            dispatch(setScrollbarWidth(payload))
        }
    })
)(RulesPage);
