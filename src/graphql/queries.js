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

export const getClosedIssues = (repoName, repoOwner, issueCursor=null, commentCursor=null) => gql`
{
    repository(name: "${repoName}", owner:"${repoOwner}"){
        issues(first:${RESULT_COUNT},  after:${issueCursor}, states:OPEN, orderBy:{
        field:CREATED_AT
        direction: DESC
        }){
            pageInfo {
                endCursor
                startCursor
            }
            nodes {
                id,
                number,
                title,
                createdAt,
                author{
                    login
                }
                comments(first:${RESULT_COUNT} after:${commentCursor}){
                nodes{
                    createdAt,
                    bodyHTML,
                    author{
                    login
                    }
                }
            }
        }
    }}
}
`

export const getOpenIssues = (repoOwner, repoName, issueCursor=null, commentCursor=null) => gql`
    {
        repository(name: "${repoName}" owner:"${repoOwner}"){
            issues(first:${RESULT_COUNT}  after:${issueCursor} states:OPEN orderBy:{
            field:CREATED_AT
            direction: DESC
            }){
                pageInfo {
                    endCursor
                    startCursor
                }
                nodes {
                    id,
                    number,
                    title,
                    createdAt,
                    author{
                        login
                    }
                    comments(first:${RESULT_COUNT} after:${commentCursor}){
                    nodes{
                        createdAt,
                        bodyHTML,
                        author{
                        login
                        }
                    }
                }
            }
        }}
    }
`

