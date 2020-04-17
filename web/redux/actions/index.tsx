export const currentSession = (text: any) => ({
    type: "CURRENT_SESSION",
    email: text
});

export const addRepo = (repo: any, repo_id: any) => ({
    type: "ADD_REPO",
    repo_id: repo_id,
    repo_info: repo
});

export const deleteRepo = (repo_id: any) => ({
    type: "DELETE_REPO",
    repo_id: repo_id,
});
