import api from "./api";

// Collection of api calls used in regard to resetting pwd
const PwdAPI = {
    // send pwd-reset-request
    request : async email => {
        return await api.put(`/user/pwd-reset/`, { email });
    }
    

}

export default PwdAPI;