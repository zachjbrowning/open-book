import api from "./api";

// Collection of api calls used in regard to user and authentication
const AuthAPI = {
    // Get info about user (requires token)
    get : async () => {
        return await api.get(`/user/`);
    },
    // Log user in. Returns token
    login : async (username, password) => {
        return await api.post(`/user/login/`, {username, password});
    },
    // Logs user out. (requires token)
    logout : async () => {
        return await api.get(`/user/logout/`);
    },
    // Registers user. returns token
    register : async (email, password, first_name, last_name) => {
        return await api.post(`/user/register/`, {email, password, first_name, last_name});
    }

}

export default AuthAPI;
