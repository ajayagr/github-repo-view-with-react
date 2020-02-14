import * as actions from '../actions/actionTypes';

//Graphql auth

const initialState = {
    oAuthTokenConstant: "3107e8b602d205800d3812e86af95af501434428",
    oAuthToken: "1234",
    isAuthTokenValid: false,
    repoOwner:"",
    repoName:""
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