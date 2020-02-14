import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import * as actions from '../../store/actions/actionTypes';

import classes from "./Auth.module.css";

class Auth extends Component {
    state={
        newToken: this.props.authToken,
        isAuthValid: false
    }

    checkAuthValidity = () => {
        return true;
    }

    componentDidMount(){
        this.props.setAuthInvalid();
    }

    inputChangeHandler = (event) => {
        this.setState({newToken: event.target.value});  
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.setAuthToken(this.state.newToken);

        if(this.checkAuthValidity){
            this.props.setAuthValid();
            this.setState({isAuthValid: true});
            this.props.history.push("/enter_repo");
        }
    }

    formResetHandler = (event) => {
        event.preventDefault();
        this.setState({newToken: this.props.authToken});
    }

    render(){
        if(this.state.isAuthValid){
            return(<Redirect to="/" />);
        }
        return (
            <div className = {classes.FormContainer}>
                <h3><label htmlFor="authTokenInput">Enter your Github OAuth Token</label></h3>
                <form className={classes.FormBody} onSubmit={this.formSubmitHandler} onReset={this.formResetHandler}>
                    <div className={classes.Input}>
                        <label htmlFor="authTokenInput">Enter token: </label>
                        <input id="authTokenInput" type="text" onChange={this.inputChangeHandler} value = {this.state.newToken} />
                    </div>
                    <div className={classes.FormControls}>
                        <button className={classes.Button} type="submit">Set New Token</button>
                        <button className={classes.Button} type="reset">Reset</button>
                    </div>
                </form>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return{
        authToken: state.oAuthToken,
        isAuthTokenValid: state.isAuthTokenValid 
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setAuthToken: (token) => dispatch({type: actions.SET_AUTH_TOKEN, token: token}),
        setAuthValid: () => dispatch({type:actions.CONFIRM_AUTH_VALIDITY}),
        setAuthInvalid: () => dispatch({type:actions.REJECT_AUTH_VALIDITY})
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);