import gql from 'graphql-tag';
// import * as FRAGMENTS from './fragments';

const RESULT_COUNT = 10;

export const getViewerInfo = gql`
    { 
        viewer{
            name
        }
    }`;

export const getRepositoryInfo = gql`
    query Repo($name: String!, $owner: String!) {
        repository(name:$name owner:$owner){
            nameWithOwner,
            description,
            forkCount,
            createdAt,
            pullRequests: pullRequests(first:1){
                    totalCount
            }
            closedIssues: issues(first:1 states:CLOSED){
            totalCount
            }
            openIssues: issues(first:1 states:OPEN){
            totalCount
            }
            primaryLanguage{
            name
            }
            commitCount: object(expression:"master") {
            ... on Commit {
                history {
                totalCount
                }
            }
            }
            watchers(first:1){
            totalCount
            }
            stargazers(first:1){
            totalCount
            }
        }
    }
`

const getOpenIssues = gql`
    query OpenIssues($repoName: String!, $repoOwner: String!, $cursor: String){
        repository(name:$repoName owner:$repoOwner){
            issues(first:${RESULT_COUNT} states:OPEN after:$cursor orderBy:{
            field:CREATED_AT
            direction: DESC
            }){
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
                edges{
                    cursor,
                    node {
                        id,
                        state,
                        number,
                        title,
                        createdAt,
                        closedAt
                        author{
                            login
                        }
                        comments(first:1){
                            totalCount
                        }
                    }
                }
            }
        }
    }
`

const getClosedIssues = gql`
query OpenIssues($repoName: String!, $repoOwner: String!, $cursor: String){
    repository(name:$repoName owner:$repoOwner){
        issues(first:${RESULT_COUNT} states:CLOSED after:$cursor orderBy:{
        field:CREATED_AT
        direction: DESC
        }){
            pageInfo {
                hasNextPage
                endCursor
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
                    closedAt,
                    author{
                        login
                    }
                    comments(first:1){
                        totalCount
                    }
                }
            }
        }
    }
}
`

export const getPullRequests = gql`
query PullRequests($repoName: String!, $repoOwner: String!, $cursor: String){
    repository(name:$repoName owner:$repoOwner){
        pullRequests: pullRequests(first:${RESULT_COUNT} after:$cursor orderBy:{
        field:CREATED_AT
        direction: DESC
        }){
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
                    mergedAt,
                    closedAt,
                    author{
                        login
                    }
                    comments(first:1){
                        totalCount
                    }
                }
            }
        }
    }
}
`

export const getIssueComments = gql`
query IssueComments($repoName: String!, $repoOwner: String!, $issueNumber: Int!, $cursor: String){
    repository(name: $repoName, owner: $repoOwner) {
      issue(number: $issueNumber) {
        title
        number
        author {
          login
        }
        state
        bodyHTML
        createdAt
        assignees(first:2){
            totalCount,
            edges{
              node{
                name
              }
            }
          }
          labels(first:2){
            totalCount,
            edges{
              node{
                name
              }
            }
          }
          milestone{
            title
          }
          projectCards(first:2){
            totalCount,
            edges{
              node{
                project{
                  name
                }
              }
            }
          }
        comments(first: ${RESULT_COUNT} after: $cursor) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              createdAt
              author {
                login
                url
              }
              bodyHTML
              bodyText
            }
          }
        }
      }
    }
  }
`

export const getIssues  = {
    OPEN: getOpenIssues,
    CLOSED: getClosedIssues
};


