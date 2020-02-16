import { useQuery } from '@apollo/react-hooks';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import ErrorMessage from '../../../../../components/Error/Error';
import Loading from '../../../../../components/Loading/Loading';
import CommentHeader from '../../../../../components/Repository/Issues/IssueList/Issue/CommentList/Header/Header';
import CommentSearchBox from '../../../../../components/Repository/Issues/IssueList/Issue/CommentList/CommentSearchBox/CommentSearchBox';
import IssueDetail from '../../../../../components/Repository/Issues/IssueList/Issue/IssueDetail/IssueDetail';
import IssueAssignmentDetail from '../../../../../components/Repository/Issues/IssueList/Issue/IssueDetail/IssueAssignmentDetail/IssueAssignmentDetail';
import * as GQL from '../../../../../graphql/queries';
import CommentList from '../../.././../../components/Repository/Issues/IssueList/Issue/CommentList/CommentList';
import classes from './Comments.module.css';


const Comments = props => {
    const [commentSearchFilter, setCommentSearchFilter] = useState("");

    const onCommentChange = (event) => {
        setCommentSearchFilter(event.target.value);
        console.log(commentSearchFilter);
    }

    let {repoOwner, repoName, issueNumber} = useParams();

    const query = GQL.getIssueComments;

    // console.log(query);

    const {loading, error, data, fetchMore} = useQuery(query, 
            {
                variables:{repoName: repoName, repoOwner: repoOwner, issueNumber:Number(issueNumber), cursor:null},
                notifyOnNetworkStatusChange: true
        });
    
    if(isNaN(issueNumber)) return (props.history.back());
    if(!props.isAuthTokenValid) return(<Redirect to="/auth" />);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;
    console.log(data.repository);
    const issue = data.repository.issue;
    const comments = data.repository.issue.comments;
    let cursor  = comments.pageInfo.endCursor ? comments.pageInfo.endCursor : null;


    return(
        <div className={classes.Container}>
            <div className={classes.IssueTop}>
                <CommentHeader issue={issue} repoOwner={repoOwner} repoName ={repoName} issueNumber={issueNumber}/> 
                <div className={classes.SearchComments}><CommentSearchBox onChange={onCommentChange}/></div>
            </div>
            <hr />
            <div className={classes.Row}>
                <div className={classes.IssueComments}>
                    <IssueDetail issue={issue} />
                    <CommentList 
                        searchComment = {commentSearchFilter}
                        hasMore ={comments.pageInfo.hasNextPage}
                        comments={comments.edges} 
                        onLoadMore= {() => 
                            fetchMore({
                                query:query,
                                variables: {repoName: repoName, repoOwner: repoOwner, issueNumber:Number(issueNumber), cursor:cursor},
                                updateQuery: (previousResult, {fetchMoreResult}) => {
                                    // console.log(previousResult);
                                    // console.log(fetchMoreResult);
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
                </div>

                <div className={classes.IssueDetails}>
                    <IssueAssignmentDetail issue={issue} />
                </div>
                
            </div>
        </div>
    )  
}

const mapStateToProps = state => {
    return{
        isAuthTokenValid: state.isAuthTokenValid
    }
}

export default connect(mapStateToProps)(Comments);