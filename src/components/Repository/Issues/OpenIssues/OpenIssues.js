import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as queries from '../../../../graphql/queries';
import ErrorMessage from '../../../Error/Error';
import Loading from '../../../Loading/Loading';
import Issue from '../Issue/Issue';
import classes from '../Issues.module.css';

const OpenIssues = props => {
    console.log(`[OpenIssues]`, props);
    
    const {loading, error, data} = useQuery(queries.getOpenIssues, 
        {variables:{repoName: props.repoName, repoOwner: props.repoOwner}, issueCursor:null, commentCursor:null});
    
    if(!props.isAuthTokenValid) return(<Redirect to="/auth" />);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;
    const issues = data.repository.openIssues;
    console.log(issues);
    
    const issueList = issues.nodes.map((issue) => {
        return <Issue issue={issue} key={issue.id} />
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

export default connect(mapStateToProps)(withRouter(OpenIssues));