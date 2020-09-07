import api from "./api";

// Collection of api calls used in regard to collection management
// All of these calls require the user to pass back a token
const CollectionAPI = {
    // Get a dict of all the users collections
    get : async () => {
        return await api.get(`/collection/`);
    },
    // get the contents of a specific collection
    get_one : async id => {
        return await api.get(`/collection/${id}/`);
    },
    // create a new collection
    create : async title => {
        return await api.post(`/collection/`, { title });
    },
    // rename a collection
    update : async (id, title) => {
        return await api.patch(`collection/${id}/`, { title })
    },
    // delete a collection
    delete : async id => {
        return await api.delete(`/collection/${id}/`)
    },

}

export default CollectionAPI;
