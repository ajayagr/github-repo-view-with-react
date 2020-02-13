import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actionTypes';

import classes from "./Auth.module.css";

class Auth extends Component {
    state={
        newToken: this.props.authToken
    }

    checkAuthValidity = () => {

    }

    inputChangeHandler = (event) => {
        this.setState({newToken: event.target.value});
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.setAuthToken(this.state.newToken);
    }

    formResetHandler = (event) => {
        event.preventDefault();
        this.setState({newToken: this.props.authToken});

    }

    render(){
        return (
            <div className = {classes.AuthForm}>
                <h4><label htmlFor="authTokenInput" className={classes.FormTitle}>Enter your Github OAuth Token</label></h4>
                <form className={classes.FormBody} onSubmit={this.formSubmitHandler} onReset={this.formResetHandler}>
                    <div className={classes.Input}>
                        <label htmlFor="authTokenInput">Enter new token: </label>
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
        setAuthToken: (token) => dispatch({type: actions.SET_AUTH_TOKEN, token: token})
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);