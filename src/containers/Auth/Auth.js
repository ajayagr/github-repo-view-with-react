import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as queries from '../../graphql/queries';
// import gql from 'graphql-tag';
import {withApollo} from 'react-apollo';

import * as actions from '../../store/actions/actionTypes';
import * as routes from '../../routes/routes';

import classes from "./Auth.module.css";

class Auth extends Component {
    state={
        newToken: this.props.authToken,
        isAuthValid: false,
        errMessage: null
    }

    /*Checking if token is valid and redirecting to repo detail page*/
    checkAuthValidity = () => {
        this.props.client.query({
            query: queries.getViewerInfo
        }).then(response => {
            console.log(response);
            this.setState({isAuthValid: true});
            this.props.setAuthValid();
            alert(`Welcome ${response.data.viewer.name}`);
            this.props.history.push(routes.ENTER_REPO);
        }).catch(err => {
            console.log(err.message);
            this.setState({errMessage: err.message});
            return false;
        });
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

        this.checkAuthValidity();
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
                <span style={{color:'red'}}>{this.state.errMessage}</span>
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

export default connect(mapStateToProps,mapDispatchToProps)(withApollo(Auth));