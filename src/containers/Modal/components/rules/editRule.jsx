import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import { editRuleMiddleware } from '../../../../actions/rules.js';
import { createNewRule } from '../../../../utils/Api.js';
import transliterate from '../../../../utils/transliterator.js';

import host from '../../../../utils/host.js';

import './createRule.less';

class EditRule extends Component {
    constructor (props) {
        super(props);

        this.state = {
            ...props.currentRule
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.saveRule = this.saveRule.bind(this);
        this.handleParamChange = this.handleParamChange.bind(this);
        this.addParamRow = this.addParamRow.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.removeParamRow = this.removeParamRow.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.removeUploadedFile = this.removeUploadedFile.bind(this);
    }

    handleNameChange (e) {
        const name = e.target.value;
        
        const link = transliterate( name );
        
        this.setState({name, link});
    }

    handleFileUpload (acceptedFiles, rejectedFiles) {
        const file = acceptedFiles[0];
        console.log(file);
        this.setState({
            file
        })
    }

    handleParamChange ( id ) {
        return ( e ) => {
            const newParam = e.target.value;
            
            let params = [...this.state.params];
            
            const paramIndex = params.findIndex( item => item.id == id )
            
            params[paramIndex].param = newParam;
            
            this.setState({params});
        } 
    }

    handlePriorityChange ( id ) {
        return (e, index, value) => {
            
            let params = [...this.state.params];
            
            const paramIndex = params.findIndex( item => item.id == id )
            
            params[paramIndex].priority = value;
            
            this.setState({params});
        } 
    }

    handleValueChange ( id ) {
        return ( e ) => {
            const newValue = e.target.value;
            
            let params = [...this.state.params];
            
            const index = params.findIndex( item => item.id == id )
            
            params[index].value = newValue;
            
            this.setState({params});
        } 
    }

    saveRule (e) {
        e.preventDefault();

        const rule = {
            ...this.state
        }

        this.props.onEdit(rule);
        this.props.closeModal();
    }

    addParamRow ( e ) {
        e.preventDefault();
        let newID = this.state.params[ this.state.params.length - 1 ].id + 1;
        let params = [...this.state.params, {
            id : newID,
            param : null,
            value : null,
            priority : null
        }];

        this.setState({
            params
        })
    }
    
    removeUploadedFile () {
        this.setState({
            file : null
        })
    }

    removeParamRow ( id ) {
        return () => {
            let params = [...this.state.params].filter((item) => {
                return item.id != id;
            });
    
            this.setState({
                params
            })
        }
        
    }

    render () {
        

        const form = ( id, priority, param, value ) => {
            const items = [
                <MenuItem
                    key={1}
                    data-id = {id}
                    value={1}
                    primaryText="High"
                />,
                <MenuItem
                    key={2}
                    data-id = {id}
                    value={0}
                    primaryText="Low"
                />
            ];

            

            return (
                <div 
                    key = {id} 
                    className="rule-params-container" 
                    data-id = {id}
                >
                    <div 
                        className="trash-container" 
                        role = 'button' 
                        onClick = { this.removeParamRow( id ) }
                    >
                        <i className="fa fa-trash-o" aria-hidden="true"/>
                    </div>
                    
                    <TextField
                        hintText="Param Field"
                        floatingLabelText="Param"
                        onChange={this.handleParamChange(id)}
                        required={true}
                        value = {param}
                    />

                    <TextField
                        hintText="Value Field"
                        floatingLabelText="Value"
                        onChange={this.handleValueChange(id)}
                        required={true}
                        value = {value}

                    />

                    <SelectField
                        value={priority}
                        onChange={this.handlePriorityChange(id)}
                        floatingLabelText="Priority"
                        style={
                            {
                                'width': '140px'
                            }
                        }
                    >
                        {items} 
                    </SelectField>
                </div>
            );
        };

        const DROPZONE = (
            <div className="dnd-container">
                <Dropzone 
                    className="dnd"
                    name="ruleFile"
                    activeClassName="dnd active"
                    onDrop={this.handleFileUpload}
                >
                    <i className="fa fa-cloud-upload" aria-hidden="true" />
                    Drag&Drop files here or click to choose from explorer
                </ Dropzone>
            </div>
        )

        const UPLOADED_FILE = (
            <div className='uploaded-file-container'>
                <div className="uploaded-file">
                    <div className='uploaded-file-title'>
                        <a 
                            href={this.state.file && this.state.file.preview}
                            target = "_blank"
                        >
                            <i className="fa fa-file"/>
                        </a>
                        <div>
                            File name: {this.state.file && this.state.file.name}
                        </div>
                    </div>

                    <div>
                        File size: {
                            this.state.file
                            &&
                            Math.round(this.state.file.size / 1024)
                        } KB
                    </div>

                    <div 
                        className="trash-container"
                        role="button"
                        onClick={this.removeUploadedFile}
                    >
                        <i className="fa fa-trash-o" aria-hidden="true"/>
                    </div>

                </div>
            </div>
        )

        const name = this.state.name;

        return (
            <form 
                className="create-rule-popup popup-standard"
                onSubmit={this.saveProject}
            >
                <h2 className="project-title">
                    Create new rule
                    <span className={`${!name && "hidden"}`}> / </span>
                    <span className="project-name">{this.state.name}</span>
                </h2>

                <div className="input-container">
                    <TextField
                        value = { this.state.name }
                        hintText="Name Field"
                        floatingLabelText="Name"
                        onChange={this.handleNameChange}
                        required={true}
                    />
                    {
                        this.state.params.map( ( item, index ) => {
                            return form( 
                                item.id,
                                item.priority,
                                item.param,
                                item.value );
                        })
                    }
                    
                    {/* <input
                        className="custom-input" 
                        type="text" 
                        maxLength="36"
                        placeholder="Name"
                        onChange={this.handleNameChange}
                        required="required"
                    /> */}
                    
                    <span className="focus-border">{}</span>
                    
                </div>
                {/* <SelectField
                value={this.state.value}
                onChange={this.handleTitleChange}
                floatingLabelText="Floating Label Text"
              >
                {items}
              </SelectField> */}

                { !this.state.file ? DROPZONE : UPLOADED_FILE}
                


                <div className="button-container">
                    <button 
                        className="button-save button-primary buttom-green"
                        onClick = {this.saveRule}
                    >
                        <i 
                            className="fa fa-check"
                            aria-hidden="true"
                        />
                        Save
                    </button>
                    {/* <button
                        className="button-template button-primary buttom-yellow"
                    >
                        <i 
                            className="fa fa-code" 
                            aria-hidden="true"
                        />
                        Add template
                    </button> */}
                    <button
                        className="button-add button-primary button-blue"
                        onClick = {this.addParamRow}
                    >
                        <i 
                            className="fa fa-plus"
                            aria-hidden="true"
                        />
                        New param
                    </button>
                </div>
            </form>
        );        
    }
}

EditRule.propTypes = {
    closeModal: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
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
        onEdit: (rule) => {
            dispatch( editRuleMiddleware(rule) )
        }
    })
)(EditRule);
