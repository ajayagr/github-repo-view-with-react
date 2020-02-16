import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {cloneDeep} from 'lodash';
import * as queries from './../../../graphql/queries';
import ErrorMessage from '../../Error/Error';
import Loading from '../../Loading/Loading';

import IssueList from '../Issues/IssueList/IssueList';


const PullRequests = props => {
    console.log(`[PullRequests]`, props);
    const query = queries.getPullRequests;
    
    const {loading, error, data, fetchMore} = useQuery(query,
        {variables:{repoName: props.repoName, repoOwner: props.repoOwner, cursor:null}});
    
    if(!props.isAuthTokenValid) return(<Redirect to="/auth" />);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;
    const pulls = data.repository.pullRequests;
    let cursor  = pulls.pageInfo.endCursor ? pulls.pageInfo.endCursor  : null;
    console.log(pulls);

    return (
        <IssueList 
            hasMore = {pulls.pageInfo.hasNextPage}
            issues={pulls.edges} 
            onLoadMore= {() => 
                fetchMore({
                    query:query,
                    variables: {repoName: props.repoName, repoOwner: props.repoOwner, cursor:cursor},
                    updateQuery: (previousResult, {fetchMoreResult}) => {
                        // console.log(previousResult);
                        // console.log(fetchMoreResult);
                        //Merging newresult with the old result
                        const newResult = cloneDeep(fetchMoreResult);
                        const previousRequests = previousResult.repository.pullRequests;
                        const newRequests = fetchMoreResult.repository.pullRequests;
                        // const newPageInfo = fetchMoreResult.repository.issues.pageInfo;

                        // console.log(newResult);
                        newResult.repository.pullRequests.pageInfo = newRequests.pageInfo;
                        newResult.repository.pullRequests.edges = [...previousRequests.edges, ...newRequests.edges];

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

export default connect(mapStateToProps)(withRouter(PullRequests));