import api from '../api/api';

const Token = {
    getToken : () => {
        let token = localStorage.getItem("token");
        if (token) {
            TokenHeader.setTokenHeader(token);
            return true;
        }
    },
    setToken : (token) => {
        TokenHeader.setTokenHeader(token);
        return localStorage.setItem("token", token);
    },
    delToken : () => {
        TokenHeader.delTokenHeader();
        return localStorage.removeItem("token");
    },
    
    
}


const TokenHeader = {
    setTokenHeader : (token) => {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
    },
    delTokenHeader : () => {
        delete api.defaults.headers.common["Authorization"];
    }
}


const Night = {
    getNight : () => {
        let night = localStorage.getItem("night");
        return night;
    },
    setNight : bool => {
        return localStorage.setItem("night", bool);
    }
}

export { Token, Night };