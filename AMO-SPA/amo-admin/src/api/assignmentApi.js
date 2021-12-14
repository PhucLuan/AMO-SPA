import amoClient from "./amoClient";

const assignmentApi = {
  getAll: (params) => {
    const url = "api/Assignment/find";
    return amoClient.get(url, { params });
  },

  get: (id) => {
    const url = `api/Assignment/${id}`;
    return amoClient.get(url);
  },

  getByUser: (id) => {
    const url = `api/Assignment/user/${id}`;
    return amoClient.get(url);
  },

  post: (assignment) => {
    const url = `api/Assignment`;
    return amoClient.post(url, assignment);
  },

  put: (id, assignment) => {
    const url = `api/Assignment/${id}`;
    return amoClient.put(url, assignment);
  },

  makeAccept: (id) => {
    const url = `api/Assignment/accept/${id}`;
    return amoClient.put(url);
  },
  acceptrespond: (id) => {
    const url = `api/Assignment/accept/${id}`;
    return amoClient.put(url);
  },
  delete: (id) => {
    const url = `api/Assignment/${id}`;
    return amoClient.delete(url);
  },
  getHistoryAssignment: (params) => {
    const url = `api/Assignment/Gethistory`
    return amoClient.get(url,{params});
  },
  checkRelation: (id) => {
    const url = `api/Assignment/CheckRelation/${id}`
    return amoClient.get(url);
  }
};

export default assignmentApi;
