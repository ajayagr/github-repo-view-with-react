import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auth from '../Auth/Auth';
// import * as actions from '../../store/actions/actionTypes';

import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import classes from './Main.module.css';


class Main extends Component{
    state ={
        authTokenFound: this.props.authToken ? true : false
    }

    render(){
        // console.log(client);
        return(
            <div className={classes.Main}>
                <div className={classes.Header}><Navigation /></div>
                <div className={classes.Content}><Auth /></div>
                <div className={classes.Footer}><Footer/></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        authToken: state.oAuthToken
    }
}

export default connect(mapStateToProps)(Main);