import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {cloneDeep} from 'lodash';

import * as GQL from '../../../../graphql/queries';
import ErrorMessage from '../../../Error/Error';
import Loading from '../../../Loading/Loading';
import IssueList from '../IssueList/IssueList';

const OpenIssues = props => {
    console.log(`[OpenIssues]`, props);
    const query = GQL.getIssues[props.issueType];

    // console.log(query);

    const {loading, error, data, fetchMore} = useQuery(query, 
            {
                variables:{repoName: props.repoName, repoOwner: props.repoOwner, cursor:null}
        });
    
    if(!props.isAuthTokenValid) return(<Redirect to="/auth" />);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;
    console.log(data.repository);
    const issues = data.repository.issues;
    let cursor  = issues.pageInfo.endCursor ? issues.pageInfo.endCursor  : null;
    // console.log(issues);

    return (
        <IssueList 
            hasMore = {issues.pageInfo.hasNextPage}
            issues={issues.edges} 
            onLoadMore= {() => 
                fetchMore({
                    query:query,
                    variables: {repoName: props.repoName, repoOwner: props.repoOwner, cursor:cursor},
                    updateQuery: (previousResult, {fetchMoreResult}) => {
                        // console.log(previousResult);
                        // console.log(fetchMoreResult);
                        //Merging newresult with the old result
                        const newResult = cloneDeep(fetchMoreResult);
                        const previousIssues = previousResult.repository.issues;
                        const newIssues = fetchMoreResult.repository.issues;
                        const newPageInfo = fetchMoreResult.repository.issues.pageInfo;

                        // console.log(newResult);
                        newResult.repository.issues.pageInfo = newPageInfo;
                        newResult.repository.issues.edges = [...previousIssues.edges, ...newIssues.edges];

                        // console.log(newResult);
                        return newResult;
                    }
                })
            }
        />
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