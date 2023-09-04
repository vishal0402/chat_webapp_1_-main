const initialState = {
   UserLoggedIn : []
}

export default function Reducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'AddUser':
            return { ...state, UserLoggedIn : payload }

        default:
            return state
    }
}
