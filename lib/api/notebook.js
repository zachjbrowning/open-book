import api from "./api";


const NotebookAPI = {
    load: async () => {
        return await api.get(`/load`);
    },
    commit: async (data) => {
        return await api.post(`/commit`, data)
    }
}

export default NotebookAPI