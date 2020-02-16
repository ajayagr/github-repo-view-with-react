import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import { ApolloProvider } from 'react-apollo';

import './App.css';
import Main from './containers/Main/Main';


const GITHUB_BASE_URL = 'https://api.github.com/graphql';

class App extends Component {
  render(){
    /*Setup Apollo client
      done in render as we want new token code as input*/
    const httpLink = new HttpLink({
      uri: GITHUB_BASE_URL,
      headers: {
        authorization: `Bearer ${this.props.authToken}`,
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
    
    // console.log(this.props.authToken);
    
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
    authToken: state.oAuthToken
  }
}

export default connect(mapStateToProps)(App);
