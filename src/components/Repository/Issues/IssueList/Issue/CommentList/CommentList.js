import React from 'react';
import Comment from './Comment/Comment';

const Comments = props => {
    const comments = props.comments.map(comment => {
        if(comment.node.bodyText.includes(props.searchComment)) {
            return <Comment comment={comment.node} key={comment.cursor} />
        }
        return null;
    });
    const loadMore = props.hasMore ? 
    (<button onClick={props.onLoadMore}>Load More....</button>) :
    (null)
    return(
        <div>
            {comments}
            {loadMore}
        </div>
    )    
}

export default Comments;