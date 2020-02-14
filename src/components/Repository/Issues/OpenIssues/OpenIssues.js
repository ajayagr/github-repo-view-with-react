import React from 'react';
import {} from 'react-apollo';
import {withRouter} from 'react-router-dom';
import * as queries from '../../../../graphql/queries';
// import ErrorMessage from '../../../Error/Error';
// import Loading from '../../../Loading/Loading';
// import Issue from '../Issue/Issue';

const OpenIssues = props => {
    console.log(props);
    const query = queries.getOpenIssues(props.repoOwner,props.repoName);
    console.log(query);
    
    // console.log(issues);
    // const data = props.client.query({
    //     query: query
    // }).then(response => {
    //     console.log(response);
    // }).catch(err => {
    //     console.log(err);
    // })
    return (
        <div>Closed Issues</div>
    )
}

export default withRouter(OpenIssues);