import { useQuery } from '@apollo/react-hooks';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import ErrorMessage from '../../../../../components/Error/Error';
import Loading from '../../../../../components/Loading/Loading';

import CommentsView from '../../../../../components/Repository/Issues/IssueList/Issue/Comments/CommentsView';
import * as GQL from '../../../../../graphql/queries';


const Comments = props => {
    const [commentSearchFilter, setCommentSearchFilter] = useState("");

    const onCommentChange = (event) => {
        setCommentSearchFilter(event.target.value);
        // console.log(commentSearchFilter);
    }

    //Getting details from URL
    let {repoOwner, repoName, issueNumber} = useParams();

    const query = GQL.getIssueComments;

    // console.log(query);

    const {loading, error, data, fetchMore} = useQuery(query, 
            {
                variables:{repoName: repoName, repoOwner: repoOwner, issueNumber:Number(issueNumber), cursor:null},
                // notifyOnNetworkStatusChange: true
        });
    
    if(isNaN(issueNumber)) return (props.history.back());
    if(!props.isAuthTokenValid) return(<Redirect to="/auth" />);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;
    // console.log(data.repository);
    const issue = data.repository.issue;
    const comments = data.repository.issue.comments;
    let cursor  = comments.pageInfo.endCursor ? comments.pageInfo.endCursor : null;


    return(
        <CommentsView
            issue = {issue}
            searchComment = {commentSearchFilter}
            hasMore ={comments.pageInfo.hasNextPage}
            comments={comments.edges} 
            onCommentChange = {onCommentChange}
            onLoadMore= {() => 
                fetchMore({
                    query:query,
                    variables: {repoName: repoName, repoOwner: repoOwner, issueNumber:Number(issueNumber), cursor:cursor},
                    updateQuery: (previousResult, {fetchMoreResult}) => {
                        
                        //Merging newresult with the old result
                        const newResult = cloneDeep(fetchMoreResult);
                        const previousComments = previousResult.repository.issue.comments;
                        const newComments = fetchMoreResult.repository.issue.comments;
                        const newPageInfo = fetchMoreResult.repository.issue.comments.pageInfo;

                        // console.log(newResult);
                        newResult.repository.issue.comments.pageInfo = newPageInfo;
                        newResult.repository.issue.comments.edges = [...previousComments.edges, ...newComments.edges];

                        // console.log(newResult);
                        return newResult;
                    }
                })
            }
        />
    )  
}

const mapStateToProps = state => {
    return{
        isAuthTokenValid: state.isAuthTokenValid
    }
}

export default connect(mapStateToProps)(Comments);