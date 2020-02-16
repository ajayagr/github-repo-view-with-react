import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import * as routes from '../../routes/routes';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Auth from '../Auth/Auth';
import Repository from '../Repository/Repository';
import InputRepo from '../InputRepo/InputRepo';
import Comments from '../Repository/Issues/Issue/Comments/Comments';
import PageNotFound from '../../components/Error/PageNotFound/PageNotFound';
import classes from './Main.module.css';

class Main extends Component{
    render(){
        return(
            <div className={classes.Main}>
                <div className={classes.Header}><Navigation /></div>
                <div className={classes.Content}>
                    <Switch>
                        <Route path={routes.COMMENTS} exact component={Comments} />
                        <Route path={routes.REPOSITORY} exact component={Repository}/>
                        <Route path={routes.ENTER_REPO} component={InputRepo} />
                        <Route path={routes.AUTH} exact component={Auth} />
                        <Route path={routes.HOME} exact component={Auth} />
                        <Route path="/" component={PageNotFound} />
                    </Switch>
                </div>
                <div className={classes.Footer}><Footer/></div>
            </div>
        );
    }
}



export default Main;