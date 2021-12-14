import axiosClient from './axiosClient';

const userApi = {
    getAll: (params) => {
        const url = 'api/User/find';
        return axiosClient.get(url,{params})
    },

    get: (id) => {
        const url = `api/User/${id}`;
        return axiosClient.get(url)
    },

    post: (user) => {
        const url = `api/User`;
        return axiosClient.post(url,user)
    },

    put: (id, user) => {
        const url = `api/User/${id}`;
        return axiosClient.put(url,user)
    },

    delete: (id) => {
        const url = `api/User/${id}`;
        return axiosClient.delete(url)
    }
}

export default userApi;