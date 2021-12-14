import axios from 'axios';
//import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_IDENTITY_URL_END_POINT, 
    headers: {
        'content-type': 'application/json',
    },
    //paramsSerializer, //: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const user = localStorage.getItem("user");
    
    if (user) {
        config.headers.Authorization = `Bearer ${JSON.parse(user).access_token}`;
    }
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    if(error.response.status === 400){
        alert(error.response.data.message);
    }

    if (error.response.status === 403) {
        alert("access forbidden")
    }
    
    throw error;
});
export default axiosClient;