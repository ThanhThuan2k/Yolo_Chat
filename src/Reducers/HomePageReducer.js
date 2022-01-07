const defaultState = {
    usersList: [],
    chatUsers: [],
    messages: [],
}

export default function HomePageReducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_USERS_LIST':
            return {
                ...state,
                usersList: action.payload
            }
        case 'SET_CHAT_USERS':
            return {
                ...state,
                chatUsers: action.payload
            }
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}