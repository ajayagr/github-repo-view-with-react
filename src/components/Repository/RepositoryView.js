import React from 'react';

import RepoHeader from './Header/Header';
import RepoTabs from './Tabs/Tabs';

import classes from './RepositoryView.module.css';

const RepositoryView = props => {
    const repo = props.repo;
    return(
        <div className={classes.Content}>
            <RepoHeader repository = {repo} />
            <RepoTabs repository= {repo} />
        </div>
    )
}

export default RepositoryView;