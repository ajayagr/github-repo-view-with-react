import React from 'react';
import ReactHTMLParser from 'react-html-parser';

import classes from './IssueDetail.module.css';

const IssueDetail = props => {
    let dateOptions = {month:'long', day:'numeric'}
    let shortDate = new Date(props.issue.createdAt).toLocaleDateString("en-US", dateOptions);
    const headerText = `${props.issue.author.login} created issue on ${shortDate}`;
    return(
        <div className={classes.IssueBody}>
            <div className={classes.IssueBodyHeader}>
                <span className={classes.IssueBodyHeaderText}>{headerText}</span>
            </div>
            <div className={classes.IssueText}>
                {ReactHTMLParser(props.issue.bodyHTML)}
            </div>
        </div>
    )
}

export default IssueDetail;