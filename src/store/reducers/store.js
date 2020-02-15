import * as actions from '../actions/actionTypes';

//Graphql auth

const initialState = {
    oAuthTokenConstant: process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN,
    oAuthToken: "1234",
    isAuthTokenValid: false,
    repoOwner:"reactjs",
    repoName:"react-tabs"
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case(actions.SET_AUTH_TOKEN):
            return ({...state, oAuthToken: action.token});
        case(actions.CONFIRM_AUTH_VALIDITY):
            return({...state, isAuthTokenValid: true});
        case(actions.REJECT_AUTH_VALIDITY):
            return({...state, isAuthTokenValid: false});
        case(actions.SET_REPO_OWNER):
            return({...state, repoOwner: action.owner});
        case(actions.SET_REPO_NAME):
            return({...state, repoName: action.name});
        default:    
            return state;
    }
}

export default reducer;