import axiosClient from './axiosClient';

const categoryApi = {
    getAll: (params) => {
        const url = 'api/Categories';
        return axiosClient.get(url,{params})
    },

    get: (id) => {
        const url = `api/Categories/${id}`;
        return axiosClient.get(url)
    },

    post: (category) => {
        const url = `api/Categories`;
        return axiosClient.post(url,category)
    },

    put: (category) => {
        const url = `api/Categories`;
        return axiosClient.put(url,category)
    },

    delete: (id) => {
        const url = `api/Categories/${id}`;
        return axiosClient.delete(url)
    }
}

export default categoryApi;