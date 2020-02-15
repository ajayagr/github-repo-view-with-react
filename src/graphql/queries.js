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

export const getOpenIssues = gql`
    query OpenIssues($repoName: String!, $repoOwner: String!, $issueCursor: String, $commentCursor: String){
        repository(name:$repoName owner:$repoOwner){
            openIssues: issues(first:${RESULT_COUNT} states:OPEN after:$issueCursor orderBy:{
            field:CREATED_AT
            direction: DESC
            }){
                pageInfo {
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
                        author{
                            login
                        }
                        comments(first:${RESULT_COUNT} after:$commentCursor){
                            totalCount,
                            edges{
                                cursor
                                node{
                                    createdAt,
                                    bodyHTML,
                                    author{
                                    login
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const getClosedIssues = gql`
query OpenIssues($repoName: String!, $repoOwner: String!, $issueCursor: String, $commentCursor: String){
    repository(name:$repoName owner:$repoOwner){
        closedIssues: issues(first:${RESULT_COUNT} states:CLOSED after:$issueCursor orderBy:{
        field:CREATED_AT
        direction: DESC
        }){
            pageInfo {
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
                    author{
                        login
                    }
                    comments(first:${RESULT_COUNT} after:$commentCursor){
                        totalCount
                        edges{
                            cursor
                            node{
                                createdAt,
                                bodyHTML,
                                author{
                                login
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`

export const getPullRequests = gql`
query PullRequests($repoName: String!, $repoOwner: String!, $pullRequesCursor: String, $commentCursor: String){
    repository(name:$repoName owner:$repoOwner){
        pullRequests: pullRequests(first:${RESULT_COUNT} after:$pullRequesCursor orderBy:{
        field:CREATED_AT
        direction: DESC
        }){
            pageInfo {
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
                    author{
                        login
                    }
                    comments(first:${RESULT_COUNT} after:$commentCursor){
                        totalCount,
                        edges{
                            cursor,
                            node{
                                createdAt,
                                bodyHTML,
                                author{
                                login
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`


