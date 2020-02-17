import React from 'react';
import Comment from './Comment/Comment';

import classes from './CommentList.module.css';
const Comments = props => {
    const comments = props.comments.map(comment => {
        if(comment.node.bodyText.toLowerCase().includes(props.searchComment.toLowerCase())) {
            return <Comment comment={comment.node} key={comment.cursor} />
        }
        return null;
    });
    const loadMore = props.hasMore ? 
    (<button onClick={props.onLoadMore}>Load More....</button>) :
    (null)
    return(
        <div className={classes.Container}>
            {comments}
            {loadMore}
        </div>
    )    
}

export default Comments;