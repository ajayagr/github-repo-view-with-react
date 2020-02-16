import React from 'react';
import {Link} from 'react-router-dom';
import classes from './PageNotFound.module.css';

const PageNotFound = props => {
    return(
        <div className={classes.Container}>
            <p>404!! Page not Found!!
            Click <Link to="/">here</Link> to go back to home page!!</p>
        </div>
    )
}

export default PageNotFound;