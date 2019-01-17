import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
};

export const authSuccess=(authData)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const auth=(email,password)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        console.log(authData)
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAvuzDJhX2xZxQlqygnMti71fZU0LOrfQ8',authData)
        .then(response=>{dispatch(authSuccess(response.data))})
        .catch(error=>{dispatch(authFail(error))})
    }
}