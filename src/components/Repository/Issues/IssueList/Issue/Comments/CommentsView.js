import React from 'react';
import {withRouter, useParams} from 'react-router-dom';

import CommentHeader from './CommentList/Header/Header';
import CommentSearchBox from './CommentList/CommentSearchBox/CommentSearchBox';
import IssueDetail from '../IssueDetail/IssueDetail';
import IssueAssignmentDetail from '../IssueDetail/IssueAssignmentDetail/IssueAssignmentDetail';
import CommentList from '../Comments/CommentList/CommentList';

import classes from './CommentsView.module.css';

const Comments = props => {
    //Getting details from URL
    let {repoOwner, repoName, issueNumber} = useParams();
    // console.log(props);
    return(
        <div className={classes.Container}>
            <div className={classes.IssueTop}>
                { <CommentHeader issue={props.issue} repoOwner={repoOwner} repoName ={repoName} issueNumber={issueNumber}/>  }
                <div className={classes.SearchComments}>
                    <CommentSearchBox onChange={props.onCommentChange}/>
                </div>
            </div>
            <hr />
            <div className={classes.Row}>
                <div className={classes.IssueComments}>
                    <IssueDetail issue={props.issue} />
                    <CommentList 
                        searchComment = {props.searchComment}
                        hasMore ={props.hasMore}
                        comments={props.comments} 
                        onLoadMore= {props.onLoadMore}
                    />
                </div>

                <div className={classes.IssueDetails}>
                    <IssueAssignmentDetail issue={props.issue} />
                </div>
                
            </div>
        </div>
    );
}

export default withRouter(Comments);