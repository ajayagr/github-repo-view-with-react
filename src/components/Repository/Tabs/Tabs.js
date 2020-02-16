import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import PullRequests from '../../../containers/Repository/PullRequests/PullRequest';
import Issues from '../../../containers/Repository/Issues/Issues';

import classes from './Tabs.module.css';

const RepoTabs = props => {
    // console.log(props);
    const repo =props.repository;
    return(
        <div className={classes.RepoTabs}>
            <Tabs>
                <TabList>
                    <Tab>Pull Requests <span className={classes.Circle}>{repo.pullRequests.totalCount}</span> </Tab>
                    <Tab>Open Issues <span className={classes.Circle}>{repo.openIssues.totalCount}</span></Tab>
                    <Tab>Closed Issues <span className={classes.Circle}>{repo.closedIssues.totalCount}</span></Tab>
                </TabList>
        
                <div className={classes.RepoTabContent}>
                    <TabPanel>
                        <PullRequests repoName={"react-tabs"} repoOwner={"reactjs"}/>
                    </TabPanel>
                    <TabPanel>
                        <Issues repoName={"react-tabs"} repoOwner={"reactjs"} issueType="OPEN"/>
                    </TabPanel>
                    <TabPanel>
                        <Issues repoName={"react-tabs"} repoOwner={"reactjs"} issueType="CLOSED"/>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
}

export default RepoTabs;