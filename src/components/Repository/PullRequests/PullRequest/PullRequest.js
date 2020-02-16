import React from 'react';
import {connect} from 'react-redux';
import classes from './PullRequest.module.css';

import * as Utility from '../../../UI/Utility/Utility';

const PullRequest = props => {
    // console.log(props);
    let pullState = "";
    let dateOptions = {month:'long', day:'numeric'};
    let shortDate = null;
    if(props.issue.state === "OPEN"){
        pullState="opened"
        shortDate = new Date(props.issue.createdAt).toLocaleDateString("en-US", dateOptions);
    }
    if(props.issue.state === "MERGED"){
        pullState="merged"
        shortDate = new Date(props.issue.mergedAt).toLocaleDateString("en-US", dateOptions);
    }
    if(props.issue.state === "CLOSED"){
        pullState="closed"
        shortDate = new Date(props.issue.closedAt).toLocaleDateString("en-US", dateOptions);
    }

    const pullRequestDetail = `# ${props.issue.number} ${pullState} on ${shortDate} by ${props.issue.author.login}`;

    const link= `https://github.com/${props.repoOwner}/${props.repoName}/pull/${props.issue.number}`
    return(
        <a href={link} target="__blank">
            <div className={classes.PullRequest}>
                <div className={classes.PullRequestInfo}>
                    <div className={classes.Title}><span>{props.issue.title}</span></div>
                    <div className={classes.Detail}><span>{pullRequestDetail}</span></div>
                </div>
                <div className={classes.FillSpace} />
                <div className={classes.FillSpace} />
                <div className={classes.CommentInfo} >
                        <div className={classes.Comment}>
                            {Utility.commentIcon} <span className={classes.CommentCount}>{props.issue.comments.totalCount}</span>
                        </div>
                </div>
            </div>
        </a>
    )
}

const mapStateToProps = state => {
    return{
        repoName: state.repoName,
        repoOwner: state.repoOwner
    }
}

export default connect(mapStateToProps)(PullRequest);