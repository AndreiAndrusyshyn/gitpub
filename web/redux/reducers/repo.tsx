let repoId = 0;

const repoReducer = (state = [], action) => {

    switch (action.type) {
        case "ADD_REPO":  {
            repoId++;
            // if(name.repo_info.name == action.repoinfo.name){return state}

            for(let i =0 ; i < state.length; i++){
                if(state[i].repo_info.name === action.repo_info.name){return state}
            }
           // state.map(name => {if(name.repo_info.name == action.repo_info.name){return state}})
            return [
                ...state, {
                   repo_id: repoId,
                   repo_info: action.repo_info,
                }]
        }
            // action.repo_id !== index
        case "DELETE_REPO": {

            return state.filter((todo, index) => {console.log(todo.repo_id); console.log(action.repo_id); return todo.repo_id !== action.repo_id});
        }

        default:
            return state;
    }
};

export default repoReducer;
