import React from 'react';
import classes from './Header.module.css'

const Header = props => {
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
        <div className={classes.IssueInfo}>
                <div className={classes.Title}><span>{props.issue.title}</span></div>
                <div className={classes.Detail}><span>{issueDetail}</span></div>
        </div>
    )
}

export default Header;