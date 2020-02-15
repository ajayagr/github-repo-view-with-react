import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as queries from './../../../graphql/queries';
import ErrorMessage from '../../Error/Error';
import Loading from '../../Loading/Loading';
import Issue from '../Issues/Issue/Issue';
import classes from '../Issues/Issues.module.css';

const PullRequests = props => {
    console.log(`[PullRequests]`, props);
    
    const {loading, error, data} = useQuery(queries.getPullRequests, 
        {variables:{repoName: props.repoName, repoOwner: props.repoOwner}, issueCursor:null, commentCursor:null});
    
    if(!props.isAuthTokenValid) return(<Redirect to="/auth" />);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;
    const pulls = data.repository.pullRequests;
    console.log(pulls);
    
    const pullRequestList = pulls.nodes.map((pullReq) => {
        return <Issue issue={pullReq} key={pullReq.id} />
    });

    return (
        <div className={classes.Issues}>
            {pullRequestList}
        </div>
    );
}

const mapStateToProps = state => {
    return{
        isAuthTokenValid: state.isAuthTokenValid,
        repoName: state.repoName,
        repoOwner: state.repoOwner
    }
}

export default connect(mapStateToProps)(withRouter(PullRequests));