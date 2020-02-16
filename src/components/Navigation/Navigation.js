import React from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../routes/routes';

import classes from './Navigation.module.css';

const Navigation = props => {
  let changeRepo = null;
  if(props.isValidAuthToken) {
    changeRepo= <Link to={routes.ENTER_REPO}>Change Repo</Link>
  }
  return(
    <header className={classes.Navigation}>
      <div className={classes.NavLink}>
        <div className={classes.NavigationLink}>
          {changeRepo}
        </div>
      </div>
      <div className={classes.ControlLink}>
        <div className={[classes.NavigationLink, classes.PullRight].join(' ')}>
          <Link to={routes.AUTH}>Change Token</Link>
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = state => {
  return{
    isValidAuthToken: state.isAuthTokenValid
  }
}

export default connect(mapStateToProps)(withRouter(Navigation));
