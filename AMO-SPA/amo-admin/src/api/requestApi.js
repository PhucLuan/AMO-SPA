import amoClient from "./amoClient";

const requestApi = {
  post: (request) => {
    const url = `api/Request/`;
    return amoClient.post(url, request);
  },

  acceptrespond: (id) => {
    const url = `api/Request/accept/${id}`;
    return amoClient.put(url);
  },

  declinerespond: (id) => {
    const url = `api/Request/${id}`;
    return amoClient.delete(url);
  },
  find: (params) => {
    const url = 'api/Request/find';
    return amoClient.post(url, params)
  },
  get: (id) => {
    const url = `api/Request/${id}`;
    return amoClient.get(url)
  },
  createreturnrequest: (request) => {
    const url = `api/Request`;
    return amoClient.post(url, request)
  },
  put: (id, request) => {
    const url = `api/Request/${id}`;
    return amoClient.put(url, request)
  },
  delete: (id) => {
    const url = `api/Request/${id}`;
    return amoClient.delete(url)
  },
  accept: (id) => {
    const url = `api/Request/accept/${id}`;
    return amoClient.put(url)
  }
};

export default requestApi;
