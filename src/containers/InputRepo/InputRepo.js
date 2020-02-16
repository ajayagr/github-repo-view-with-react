import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/actionTypes';
import classes from './InputRepo.module.css';
import * as routes from '../../routes/routes';

class InputRepo extends Component{
    state = {
        repoOwner: this.props.repoOwner,
        repoName: this.props.repoName
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.setRepoOwner(this.state.repoOwner);
        this.props.setRepoName(this.state.repoName);
        this.props.history.push(routes.REPOSITORY);
    }

    formResetHandler = (event) => {
        event.preventDefault();
        this.setState({ repoOwner: "", repoName: ""});
    }

    repoOwnerChangeHandler = event => {
        this.setState({repoOwner: event.target.value});
    }

    repoNameChangeHandler = event => {
        this.setState({repoName: event.target.value});
    }

    render(){
        if(!this.props.isAuthTokenValid){
            console.log("[InputRepo] auth not valid!!");
            return <Redirect to="/" />
        }
        return(
        <div className = {classes.FormContainer}>
            <label htmlFor="repoOwner"><h3>Enter details of Repository</h3></label>
            <form className={classes.FormBody} onSubmit={this.formSubmitHandler} onReset={this.formResetHandler}>
                <div className={classes.Input}>
                    <label htmlFor="repoOwner">Repo Owner: </label>
                    <input id="repoOwner" type="text" required onChange={this.repoOwnerChangeHandler} value = {this.state.repoOwner}
                        placeholder="Github username (e.g. 'ajayagr')" />
                </div>
                <div className={classes.Input}>
                    <label htmlFor="repoName">Repo Name: </label>
                    <input id="repoName" type="text" required onChange={this.repoNameChangeHandler} value = {this.state.repoName} 
                        placeholder="Github username (e.g. 'burger-builder')"/>
                </div>
                <div className={classes.FormControls}>
                    <button className={classes.Button} type="submit">Load Repository</button>
                    <button className={classes.Button} type="reset">Reset</button>
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuthTokenValid: state.isAuthTokenValid,
        repoName: state.repoName,
        repoOwner: state.repoOwner
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setRepoOwner: (val) => dispatch({type: actions.SET_REPO_OWNER, owner:val}),
        setRepoName: (val) => dispatch({type:actions.SET_REPO_NAME, name: val})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputRepo);