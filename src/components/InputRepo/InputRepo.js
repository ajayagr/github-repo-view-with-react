import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actionTypes';
import classes from './InputRepo.module.css';
import * as routes from '../../routes/routes';

class InputRepo extends Component{
    state = {
        repoOwner: "",
        repoName: ""
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.setRepoOwner(this.state.repoOwner);
        this.setRepoName(this.state.repoName);
        this.props.history.push(routes.REPOSITORY);
        // this.props.setAuthToken(this.state.newToken);
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
        return(
        <div className = {classes.FormContainer}>
            <label htmlFor="repoOwner"><h3>Enter details of Repo</h3></label>
            <form className={classes.FormBody} onSubmit={this.formSubmitHandler} onReset={this.formResetHandler}>
                <div className={classes.Input}>
                    <label htmlFor="repoOwner">Repo Owner: </label>
                    <input id="repoOwner" type="text" onChange={this.repoOwnerChangeHandler} value = {this.state.repoOwner} />
                </div>
                <div className={classes.Input}>
                    <label htmlFor="repoName">Repo Name: </label>
                    <input id="repoName" type="text" onChange={this.repoNameChangeHandler} value = {this.state.repoName} />
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

const mapDispatchToProps = dispatch => {
    return{
        setRepoOwner: (val) => dispatch({type: actions.SET_REPO_OWNER, owner:val}),
        setRepoName: (val) => dispatch({type:actions.SET_REPO_NAME, name: val})
    }
}

export default connect(null, mapDispatchToProps)(InputRepo);