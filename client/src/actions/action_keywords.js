export const USER_ACTION_TYPES = {
    USER_KEYWORDS: 'USER KEYWORDS'
}

export const getUserKeywords = (payload) =>{
    return{
        type:USER_ACTION_TYPES.USER_KEYWORDS,
        payload:payload
    }
}
