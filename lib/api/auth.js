import api from "./api";

const AuthAPI = {
    get : async () => {
        return await api.get(`/user/`);
    },
    login : async (username, password) => {
        return await api.post(`/user/login/`, {username, password});
    },
    logout : async () => {
        return await api.get(`/user/logout/`);
    },
    register : async (email, password, first_name, last_name) => {
        return await api.post(`/user/register/`, {email, password, first_name, last_name});
    }

}

export default AuthAPI;
