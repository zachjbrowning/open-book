import api from "./api";

// Collection of api calls used in regard to resetting pwd
const PwdAPI = {
    // send pwd-reset-request
    request : async email => {
        return await api.put(`/user/pwd-reset/`, { email });
    },
    // checks that token given in url is valid
    check_url : async token => {
        return await api.put(`/user/token-check/`, { token });
    },
    // resets the password!
    hard_reset : async (token, pwd) => {
        return await api.post(`/user/pwd-reset/`, { token, pwd });
    } 
    

}

export default PwdAPI;