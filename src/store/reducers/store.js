import * as actions from '../actions/actionTypes';

//Graphql auth

const initialState = {
    oAuthToken: "1234",
    isAuthTokenValid: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case(actions.SET_AUTH_TOKEN):
            return ({...state, oAuthToken: action.token});
        case(actions.CONFIRM_AUTH_VALIDITY):
            return({...state, isAuthTokenValid: true});
        case(actions.REJECT_AUTH_VALIDITY):
            return({...state, isAuthTokenValid: false});
        default:    
            return state;
    }
}

export default reducer;