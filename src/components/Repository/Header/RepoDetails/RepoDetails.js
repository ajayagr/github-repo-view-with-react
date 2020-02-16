import React from 'react';

import * as Utility from '../../../UI/Utility/Utility';

import classes from './RepoDetails.module.css';

const RepoDetails = props => {
    const repo = props.repository;
    const forkIcon = Utility.forkIcon;
    const commitIcon = Utility.commitIcon;
    const watcherIcon = Utility.watcherIcon;
    const stargazersIcon = Utility.starGazerIcon;
    return(
        <div className={classes.RepoProjectDetails}>
            <div className={classes.RepoDetails}>
                <div className={classes.RepoDetailItem}><button>{forkIcon} {repo.forkCount}</button></div>
                <div className={classes.RepoDetailItem}><button>{commitIcon} {repo.commitCount.history.totalCount}</button></div>
                <div className={classes.RepoDetailItem}><button>{watcherIcon} {repo.watchers.totalCount}</button></div>
                <div className={classes.RepoDetailItem}><button>{stargazersIcon} {repo.stargazers.totalCount}</button></div>
            </div>
            <div>Language: {repo.primaryLanguage.name}</div>
            
        </div>
    );
}

export default RepoDetails;
