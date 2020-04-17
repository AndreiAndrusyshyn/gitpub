const currentSessionReducer = (state = [], action: any) => {
    switch (action.type) {
        case "CURRENT_SESSION":
            console.log(action.email)
            return Object.assign({}, state, {
                email: action.email
            })
        default:
            return state;
    }
};

export default currentSessionReducer;
