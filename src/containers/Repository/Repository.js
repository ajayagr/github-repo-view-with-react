import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import classes from './Repository.module.css';


class Repos extends Component{
    render(){
        if(!this.props.validAuthToken){
            console.log("Auth token is invalid!!");
            return <Redirect to="/auth" />
        }

        return(
            <div className={classes.Content}>
                <Tabs>
                    <TabList>
                        <Tab>Pull Request</Tab>
                        <Tab>Open Issues</Tab>
                        <Tab>Closed Issues</Tab>
                    </TabList>
            
                    <TabPanel>
                        <h2>Any content 1</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 3</h2>
                    </TabPanel>
            </Tabs>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        authToken: state.oAuthToken,
        validAuthToken: state.isAuthTokenValid
    }
}

export default connect(mapStateToProps)(Repos);