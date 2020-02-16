import React from 'react';
import RepoDetails from './RepoDetails/RepoDetails';

import classes from './Header.module.css';

const Header = props => {
    const repo = props.repository;
    return(
        <div className={classes.RepoHeader}>
            <div className={classes.RepoGeneralInfo}>
                <div className={classes.RepoTitle}><h3>{repo.nameWithOwner}</h3></div>
                <div>{repo.description}</div>
            </div>
            <RepoDetails repository = {repo}/>
        </div>
    )
};

export default Header;