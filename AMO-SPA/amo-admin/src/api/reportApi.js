import amoClient from "./amoClient";


const reportApi = {
    getReport: () => {
        const url = 'api/Report';
        return amoClient.get(url)
    },
}

export default reportApi;