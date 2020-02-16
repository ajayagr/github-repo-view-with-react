import React from 'react';
import classes from './CommentSearchBox.module.css';

const CommentSearchBox = (props) => {
    return(
        <textarea className={classes.SearchBox} type="text" onChange={props.onChange} placeholder="Search Comments..."/>
    );
}

export default CommentSearchBox;