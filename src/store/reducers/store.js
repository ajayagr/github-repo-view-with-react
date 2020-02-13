import * as actions from '../actions/actionTypes';

//Graphql auth

const initialState = {
    oAuthToken: "1234",
    isAuthTokenValid: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case(actions.SET_AUTH_TOKEN):
            return ({oAuthToken: action.token});
        default:    
            return state;
    }
}

export default reducer;