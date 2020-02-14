import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Main from './containers/Main/Main';

import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '../node_modules/react-apollo';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

class App extends Component {
  render(){
    // console.log("App rerendering");
    /*Setup Apollo client
      done in render as we want new token code as input*/
    const httpLink = new HttpLink({
      uri: GITHUB_BASE_URL,
      headers: {
        authorization: `Bearer ${this.props.authTokenConstant}`,
      },
    });
  
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        }
      });
  
    const link = ApolloLink.from([errorLink, httpLink]);
  
    const cache = new InMemoryCache();
  
    const client = new ApolloClient({
      link,
      cache,
    });
    
    console.log(this.props.authToken);
    
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    authTokenConstant: state.oAuthTokenConstant,
    authToken: state.oAuthToken
    // isAuthTokenValid: state.isAuthTokenValid
  }
}

export default connect(mapStateToProps)(App);
