import React from 'react';
import Comment from './Comment/Comment';

const Comments = props => {
    const comments = props.comments.map(comment => {
        return <Comment comment={comment.node} key={comment.cursor} />
    });
    return(
        <div>
            {comments}
            <div onClick={props.onLoadMore}>Load More....</div>
        </div>
    )    
}

export default Comments;