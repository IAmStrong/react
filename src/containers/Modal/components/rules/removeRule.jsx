import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeRuleMiddleware } from '../../../../actions/rules.js';
import './removeRule.less';


// import { editExistingProject } from '../../../utils/Api.js';
// import host from '../../../utils/host.js';

class RemoveRule extends Component {
    constructor () {
        super();

        this.remove = this.remove.bind(this);
    }

    remove (e) {
        e.preventDefault();

        let { id, projectID } = this.props.currentRule;

        this.props.onRuleRemove( { id, projectID } );
        
        this.props.closeModal();
    }

    render () {
        const { name, params } = this.props.currentRule;

        const tableRow = ( param, value, priority, id ) => (
            <tr key = {id}>
                <td className = 'tbody-cell'>{param}</td>
                <td className = 'tbody-cell'>{value}</td>
                <td className = 'tbody-cell'>{priority ? 'high' : 'low'}</td>
            </tr>
        )

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
                    <table className="table-params">
                        <thead>
                            <tr>
                                <th className="thead-cell">Param</th>
                                <th className="thead-cell">Value</th>
                                <th className="thead-cell">Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            { params.map ( item => {
                                return tableRow(
                                    item.param, 
                                    item.value, 
                                    item.priority, 
                                    item.id
                                )
                            } ) }
                        </tbody>
                    </table>
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

RemoveRule.propTypes = {
    closeModal: PropTypes.func.isRequired,
    onRuleRemove: PropTypes.func.isRequired,
    currentRule : PropTypes.shape({
        id:         PropTypes.string,
        is_active:  PropTypes.boolean,
        link:       PropTypes.string,
        name:       PropTypes.string,
        params:     PropTypes.array,
        projectID:  PropTypes.string
    })
};



export default connect(
    state => ({
        currentRule : state.currentRule
    }),
    dispatch => ({
        onRuleRemove : payload => {
            dispatch ( removeRuleMiddleware( payload ) )
        }
    })
)(RemoveRule);
