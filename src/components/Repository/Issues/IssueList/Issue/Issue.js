import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classes from './Issue.module.css';

import * as Utility from '../../../../UI/Utility/Utility';

const Issue = props => {
    // console.log(props);
    let issueState = "";
    let dateOptions = {month:'long', day:'numeric'}
    let shortDate = null;
    let issueIcon = null;
    let issueIconClass = [classes.IssueIcon];
    if(props.issue.state === "OPEN"){
        issueState="opened"
        shortDate = new Date(props.issue.createdAt).toLocaleDateString("en-US", dateOptions);
        issueIcon = Utility.openIssueIcon;
        issueIconClass.push(classes.Open);
    }
    if(props.issue.state === "CLOSED"){
        issueState="closed"
        shortDate = new Date(props.issue.closedAt).toLocaleDateString("en-US", dateOptions);
        issueIcon = Utility.closedIssueIcon;
        issueIconClass.push(classes.Closed);
    }

    const issueDetail = `# ${props.issue.number} ${issueState} on ${shortDate} by ${props.issue.author.login}`;

    //Link to comment
    const link= `/repository/${props.repoOwner}/${props.repoName}/issues/${props.issue.number}`;

    return(
        <Link to={link} >
            <div className={classes.Issue}>
                <div className={issueIconClass.join(' ')}>
                    {issueIcon}
                </div>
                <div className={classes.IssueInfo}>
                    <div className={classes.Title}><span>{props.issue.title}</span></div>
                    <div className={classes.Detail}><span>{issueDetail}</span></div>
                </div>
                <div className={classes.FillSpace} />
                <div className={classes.FillSpace} />
                <div className={classes.CommentInfo} >
                        <div className={classes.Comment}>
                            {Utility.commentIcon} <span className={classes.CommentCount}>{props.issue.comments.totalCount}</span>
                        </div>
                </div>
            </div>
        </Link>
    )
}

const mapStateToProps = state => {
    return{
        repoName: state.repoName,
        repoOwner: state.repoOwner
    }
}

export default connect(mapStateToProps)(Issue);