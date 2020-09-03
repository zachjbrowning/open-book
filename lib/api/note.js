import api from "./api";

const NoteAPI = {
    create : async (title, collection, notes, keywords)  => {
        return await api.post(`/note/`, { title, collection, notes, keywords });
    },
    delete : async id => {
        return await api.delete(`/note/${id}/`);
    },
    update : async (id, title, notes) => {
        return await api.patch(`/note/${id}/`, { title, notes })
    },
    add_cat : async (note, keyword) => {
        return await api.post(`/keyword/`, { note, keyword })
    },
    del_cat : async (note, keyword) => {
        return await api.patch(`/keyword/${note}/`, { keyword })
    }

}

export default NoteAPI;
