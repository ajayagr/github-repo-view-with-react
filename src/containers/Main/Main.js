import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Auth from '../Auth/Auth';
import Repos from '../Repository/Repository';
import InputRepo from '../../components/InputRepo/InputRepo';
import * as routes from '../../routes/routes';
// import * as actions from '../../store/actions/actionTypes';

import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import classes from './Main.module.css';


class Main extends Component{
    state = {
        validAuthToken: this.props.validAuthToken
    }


    render(){
        // console.log(client);
        return(
            <div className={classes.Main}>
                <div className={classes.Header}><Navigation /></div>
                <div className={classes.Content}>
                    <Switch>
                        <Route path={routes.REPOSITORY} component={Repos}/>
                        <Route path={routes.ENTER_REPO} component={InputRepo} />
                        <Route path={routes.AUTH} exact component={Auth} />
                        <Route path="/" component={Auth} />
                    </Switch>
                </div>
                <div className={classes.Footer}><Footer/></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        authToken: state.oAuthToken,
        validAuthToken: state.isAuthTokenValid
    }
}

export default connect(mapStateToProps)(Main);