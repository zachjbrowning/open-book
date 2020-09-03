import api from "./api";

const CollectionAPI = {
    get : async () => {
        return await api.get(`/collection/`);
    },
    get_one : async id => {
        return await api.get(`/collection/${id}/`);
    },
    create : async title => {
        return await api.post(`/collection/`, { title });
    },
    update : async (id, title) => {
        return await api.patch(`collection/${id}/`, { title })
    },
    delete : async id => {
        return await api.delete(`/collection/${id}/`)
    },

}

export default CollectionAPI;
