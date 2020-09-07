import api from "./api";

// Collection of api calls used in regard to creating and editing notes
// All of these calls require the user to pass back a token
const NoteAPI = {
    // create a new note
    create : async (title, collection, notes, keywords)  => {
        return await api.post(`/note/`, { title, collection, notes, keywords });
    },
    // delete a note
    delete : async id => {
        return await api.delete(`/note/${id}/`);
    },
    // change the contents of a note
    update : async (id, title, notes) => {
        return await api.patch(`/note/${id}/`, { title, notes })
    },
    // add a keyword to a note
    add_cat : async (note, keyword) => {
        return await api.post(`/keyword/`, { note, keyword })
    },
    // remove a keyword from a note
    del_cat : async (note, keyword) => {
        return await api.patch(`/keyword/${note}/`, { keyword })
    }

}

export default NoteAPI;
