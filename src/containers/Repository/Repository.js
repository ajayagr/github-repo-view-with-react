import React from 'react';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';
import * as queries from '../../graphql/queries';
import PullRequests from '../../components/Repository/PullRequests/PullRequests';
import {OpenIssues, ClosedIssues} from '../../components/Repository/Issues/Issues';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import classes from './Repository.module.css';
import { useQuery } from '@apollo/react-hooks';
        
function GetRepoInfo(props){
    console.log(props);
    const {loading, error, data} = useQuery(queries.getRepositoryInfo, 
        {variables:{name: props.repoName, owner: props.repoOwner}});
    if (loading) return null;
    if (error) return `Error! ${error}`;
    const repo = data.repository;
    return(
        <div className={classes.Content}>
            <div className={classes.RepoHeader}>
                <div className={classes.RepoGeneralInfo}>
                    <div className={classes.RepoTitle}><h3>{repo.nameWithOwner}</h3></div>
                    <div className={classes.RepoDetails}>
                        <div className={classes.RepoDetailItem}><button>Forks {repo.forkCount}</button></div>
                        {/* <div className={classes.DetailItem}>createdAt</div> */}
                        <div className={classes.RepoDetailItem}><button>Commits {repo.commitCount.history.totalCount}</button></div>
                        <div className={classes.RepoDetailItem}><button>Watchers {repo.watchers.totalCount}</button></div>
                        <div className={classes.RepoDetailItem}><button>StarGazers {repo.stargazers.totalCount}</button></div>
                    </div>
                </div>
                <div>{data.repository.description}</div>
            </div>
            <div className={classes.RepoTabs}>
                <Tabs>
                    <TabList>
                        <Tab>Pull Request</Tab>
                        <Tab>Open Issues</Tab>
                        <Tab>Closed Issues</Tab>
                    </TabList>
            
                    <TabPanel>
                        <h2><PullRequests repoName={"react-tabs"} repoOwner={"reactjs"}/></h2>
                    </TabPanel>
                    <TabPanel>
                        <h2><OpenIssues repoName={"react-tabs"} repoOwner={"reactjs"}/></h2>
                    </TabPanel>
                    <TabPanel>
                        <h2><ClosedIssues repoName={"react-tabs"} repoOwner={"reactjs"}/></h2>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        authToken: state.oAuthToken,
        validAuthToken: state.isAuthTokenValid,
        repoOwner: state.repoOwner,
        repoName: state.repoName
    }
}

export default connect(mapStateToProps)(GetRepoInfo);