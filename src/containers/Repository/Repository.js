import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../../graphql/queries';
import Loading from '../../components/UI/Utility/Spinner/Spinner';
import ErrorMessage from '../../components/Error/Error';

import RepositoryView from '../../components/Repository/RepositoryView';
        
function Repository(props){
    //Get repository data
    const {loading, error, data} = useQuery(queries.getRepositoryInfo, 
        {variables:{name: props.repoName, owner: props.repoOwner}});

    if (!props.isValidAuthToken) return(<Redirect to="/" />);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error}/>;
    const repo = data.repository;
    // console.log(repo);

    return(
        <RepositoryView repo={repo} />
    )
}

const mapStateToProps = state => {
    return{
        isValidAuthToken: state.isAuthTokenValid,
        repoOwner: state.repoOwner,
        repoName: state.repoName
    }
}

export default connect(mapStateToProps)(Repository);