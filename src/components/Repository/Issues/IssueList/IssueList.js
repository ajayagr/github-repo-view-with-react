import React from 'react';
import Issue from './Issue/Issue';

const IssueList = props => {
    const issues = props.issues.map(issue => {
        return <Issue issue={issue.node} key={issue.cursor} />
    });
    return(
        <div>
            {issues}
            <div onClick={props.onLoadMore}>Load More....</div>
        </div>
    )
}

export default IssueList;