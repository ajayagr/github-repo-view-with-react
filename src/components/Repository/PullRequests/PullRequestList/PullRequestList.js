import React from 'react';
import PullRequest from '../PullRequest/PullRequest';

const IssueList = props => {
    const pullRequests = props.issues.map(issue => {
        return <PullRequest issue={issue.node} key={issue.cursor} />
    });
    const loadMore = props.hasMore ? 
    (<button onClick={props.onLoadMore}>Load More....</button>) :
    (null)

    return(
        <div>
            {pullRequests}
            {loadMore}
        </div>
    )
}

export default IssueList;