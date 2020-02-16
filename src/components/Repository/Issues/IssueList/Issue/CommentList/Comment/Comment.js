import React from 'react';
import ReactHTMLParser from 'react-html-parser';

import classes from './Comment.module.css';

const Comment = props => {
    let dateOptions = {month:'long', day:'numeric', year:"2-digit"}
    let shortDate = new Date(props.comment.createdAt).toLocaleDateString("en-US", dateOptions);
    const headerText = `${props.comment.author.login} commented on ${shortDate}`;
    return(
        <div className={classes.CommentBody}>
            <div className={classes.CommentBodyHeader}>
                <span className={classes.CommentBodyHeaderText}>{headerText}</span>
            </div>
            <div>
                {ReactHTMLParser(props.comment.bodyHTML)}
            </div>
        </div>
    )
}

export default Comment;