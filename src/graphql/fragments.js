import {gql} from '@apollo/client';

PageInfo.fragments = {

}

RepoIssues.fragments = {
    issue: gql`
        fragment IssueList on IssueConnection {
            pageInfo {
                endCursor
                hasNextPage
                startCursor
            }
            edges{
                cursor,
                node {
                    id,
                    state,
                    number,
                    title,
                    createdAt,
                    author{
                        login
                    }
                    comments(first:1){
                        totalCount
                    }
                }
            }
        }
    `
}