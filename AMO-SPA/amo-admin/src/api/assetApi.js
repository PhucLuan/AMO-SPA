import amoClient from "./amoClient";

const assetApi = {
  getAll: (params) => {
    const url = "api/Asset";
    return amoClient.get(url, { params });
  },

  get: (id) => {
    const url = `api/Asset/${id}`;
    return amoClient.get(url);
  },

  find: (category) => {
    const url = `api/Asset/find`;
    return amoClient.post(url, category);
  },

  findAvailable: (asset) => {
    const url = `api/Asset/find/available`;
    return amoClient.post(url, asset);
  },

  delete: (id) => {
    const url = `api/Asset/${id}`;
    return amoClient.delete(url);
  },

  getFilter: () => {
    const url = `api/Asset/GetFilterAssetAsync`;
    return amoClient.get(url);
  },
  post: (asset) => {
    const url = `api/Asset`;
    return amoClient.post(url, asset)
  },
  put: (asset) => {
    const url = `api/Asset`;
    return amoClient.put(url, asset)
  }
};

export default assetApi;
