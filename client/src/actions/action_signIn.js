export const USER_ACTION_TYPES = {
    ON_GOOGLE_SIGNIN : 'ON GOOGLE SIGNIN',
    USER_LOGIN_STATUS : 'USER LOGIN STATUS'
}

export const googleSignIn = (payload) =>{
    console.log("payload:",payload)
    return{
        type:USER_ACTION_TYPES.ON_GOOGLE_SIGNIN,
        payload:payload
    }
}

export const userLoginStatus = (payload) =>{
    console.log("userLoginStatuspayload:",payload)
    return{
        type:USER_ACTION_TYPES.USER_LOGIN_STATUS,
        payload:payload
    }
}