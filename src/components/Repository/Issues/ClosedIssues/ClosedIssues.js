import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as queries from '../../../../graphql/queries';
import ErrorMessage from '../../../Error/Error';
import Loading from '../../../Loading/Loading';
import Issue from '../Issue/Issue';
import classes from '../Issues.module.css';

const ClosedIssues = props => {
    console.log(`[ClosedIssues]`, props);
    
    const {loading, error, data} = useQuery(queries.getClosedIssues, 
        {variables:{repoName: props.repoName, repoOwner: props.repoOwner}, issueCursor:null, commentCursor:null});
    
    if(!props.isAuthTokenValid) return(<Redirect to="/auth" />);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;
    const issues = data.repository.closedIssues;
    console.log(issues);
    
    const issueList = issues.edges.map((issue) => {
        return <Issue issue={issue.node} key={issue.cursor} />
    });

    return (
        <div className={classes.Issues}>
            {issueList}
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

export default connect(mapStateToProps)(withRouter(ClosedIssues));