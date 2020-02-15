import React from 'react';
import classes from './Issue.module.css';
import * as Utility from '../../../../UI/Utility/Utility';

const Issue = props => {
    // console.log(props);
    let state = "";
    if(props.issue.state === "OPEN"){
        state="opened"
    }
    if(props.issue.state === "CLOSED"){
        state="closed"
    }

    let dateOptions = {month:'long', day:'numeric'}
    let shortDate = new Date(props.issue.createdAt).toLocaleDateString("en-US", dateOptions);
    const issueDetail = `# ${props.issue.number} ${state} on ${shortDate} by ${props.issue.author.login}`;


    return(
        <div className={classes.Issue}>
            <div className={classes.IssueInfo}>
                <div className={classes.Title}><span>{props.issue.title}</span></div>
                <div className={classes.Detail}><span>{issueDetail}</span></div>
            </div>
            <div className={classes.FillSpace} />
            <div className={classes.FillSpace} />
            <div className={classes.CommentInfo} >
                <div className={classes.Comment}>{Utility.commentIcon} <span className={classes.CommentCount}>{props.issue.comments.totalCount}</span></div>
            </div>
        </div>
    )
}

export default Issue;