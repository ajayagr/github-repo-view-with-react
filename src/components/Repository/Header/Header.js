import React from 'react';
import RepoDetails from './RepoDetails/RepoDetails';

import classes from './Header.module.css';

const Header = props => {
    const repo = props.repository;
    return(
        <div className={classes.RepoHeader}>
            <div className={classes.RepoGeneralInfo}>
                <div><h3>{repo.nameWithOwner}</h3></div>
                <div>{repo.description}</div>
            </div>
            <div className={classes.RepoDetailContainer}>
                <RepoDetails repository = {repo}/>
            </div>
        </div>
    )
};

export default Header;