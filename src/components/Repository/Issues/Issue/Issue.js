import React from 'react';
import classes from './Issue.module.css';

const Issue = props => {
    // console.log(props);
    return(
        <div className={classes.Issue}>
            <div className={classes.title}>{props.issue.title}</div>
        </div>
    )
}

export default Issue;