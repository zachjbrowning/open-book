import api from "./api";


const ExampleAPI = {
    get: async (id) => {
        return await api.get(`/bump/${id}`);
    },
    upload: async (data) => {
        return await api.post(`/push`, data)
    }
}

export default ExampleAPI