import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as queries from '../../graphql/queries';

import Loading from '../../components/UI/Utility/Spinner/Spinner';
import PullRequests from './PullRequests/PullRequest';
import ShowIssues from '../../components/Repository/Issues/ShowIssues/ShowIssues';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import classes from './Repository.module.css';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../components/Error/Error';
        
function GetRepoInfo(props){
    //Get repository data
    const {loading, error, data} = useQuery(queries.getRepositoryInfo, 
        {variables:{name: props.repoName, owner: props.repoOwner}});
    if (!props.isValidAuthToken) return(<Redirect to="/" />);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error}/>;
    const repo = data.repository;
    console.log(repo);

    return(
        <div className={classes.Content}>
            <div className={classes.RepoHeader}>
                <div className={classes.RepoGeneralInfo}>
                    <div className={classes.RepoTitle}><h3>{repo.nameWithOwner}</h3></div>
                    <div>{repo.description}</div>
                </div>
                <div className={classes.RepoProjectDetails}>
                    <div className={classes.RepoDetails}>
                        <div className={classes.RepoDetailItem}><button>Forks {repo.forkCount}</button></div>
                        {/* <div className={classes.DetailItem}>createdAt</div> */}
                        <div className={classes.RepoDetailItem}><button>Commits {repo.commitCount.history.totalCount}</button></div>
                        <div className={classes.RepoDetailItem}><button>Watchers {repo.watchers.totalCount}</button></div>
                        <div className={classes.RepoDetailItem}><button>StarGazers {repo.stargazers.totalCount}</button></div>
                    </div>
                    <div>Language: {repo.primaryLanguage.name}</div>
                </div>
                {/* <div>{repo.description}</div> */}
            </div>
            <div className={classes.RepoTabs}>
                <Tabs>
                    <TabList>
                        <Tab>Pull Requests {repo.pullRequests.totalCount} </Tab>
                        <Tab>Open Issues {repo.openIssues.totalCount}</Tab>
                        <Tab>Closed Issues {repo.closedIssues.totalCount}</Tab>
                    </TabList>
            
                <div className={classes.RepoTabContent}>
                    <TabPanel>
                        <PullRequests repoName={"react-tabs"} repoOwner={"reactjs"}/>
                    </TabPanel>
                    <TabPanel>
                        <ShowIssues repoName={"react-tabs"} repoOwner={"reactjs"} issueType="OPEN"/>
                    </TabPanel>
                    <TabPanel>
                        <ShowIssues repoName={"react-tabs"} repoOwner={"reactjs"} issueType="CLOSED"/>
                    </TabPanel>
                </div>
                </Tabs>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        isValidAuthToken: state.isAuthTokenValid,
        repoOwner: state.repoOwner,
        repoName: state.repoName
    }
}

export default connect(mapStateToProps)(GetRepoInfo);