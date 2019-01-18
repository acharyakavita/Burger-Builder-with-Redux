import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
};

export const authSuccess=(idToken,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const checkAuthTimeOut=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{dispatch(logout())},expirationTime * 1000)
    }
}

export const logout=()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const auth=(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAvuzDJhX2xZxQlqygnMti71fZU0LOrfQ8'
        if(!isSignUp){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAvuzDJhX2xZxQlqygnMti71fZU0LOrfQ8'
        }
        axios.post(url,authData)
        .then(response=>{dispatch(authSuccess(response.data.idToken,response.data.localId));
             dispatch(checkAuthTimeOut(response.data.expiresIn))})
        .catch(error=>{dispatch(authFail(error.response.data.error.message))})
    }
}

export const setAuthRedirect=(path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT,
        path:path
    }
}