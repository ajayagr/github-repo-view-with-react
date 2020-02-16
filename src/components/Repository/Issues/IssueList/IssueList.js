import React from 'react';
import Issue from './Issue/Issue';

const IssueList = props => {
    const issues = props.issues.map(issue => {
        return <Issue issue={issue.node} key={issue.cursor} />
    });
    const loadMore = props.hasMore ? 
    (<button onClick={props.onLoadMore}>Load More....</button>) :
    (null)

    return(
        <div>
            {issues}
            {loadMore}
        </div>
    )
}

export default IssueList;