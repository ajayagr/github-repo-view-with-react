import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../routes/routes';
// import Button from '../UI/Button/Button';
// import Input from '../UI/Input/Input';

import classes from './Navigation.module.css';

const Navigation = props => {
  return(
    <header className={classes.Navigation}>
      <div className={classes.NavLink}>
      {/* <div className={classes.NavigationLink}>
        <Link to={routes.PROFILE}>Profile</Link>
      </div> */}
      <div className={classes.NavigationLink}>
        <Link to={routes.ENTER_REPO}>Change Repo</Link>
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

export default withRouter(Navigation);
