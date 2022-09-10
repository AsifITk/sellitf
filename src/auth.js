import axios from "axios";
const axiosClient = axios.create({
    baseURL: "http://localhost:8000/",
})


axiosClient.interceptors.request.use(
    (requestConfig) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            requestConfig.headers["Athorization"] = "Bearer" + accessToken;
        }
        return requestConfig;
    },
    (error) => {
        return Promise.reject(error);
    });

axiosClient.interceptors.response.use(

    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        const statusCode = err.response.status;
        if (statusCode === 401 && originalConfig.url === '/auth/token') {
            return Promise.reject(err)
        }


        if (statusCode == 401) {
            const tokenResponse = await axiosClient.post('/auth/token', {
                token: localStorage.getItem("refresh_token")
            }
            );
            localStorage.setItem("access_token", tokenResponse.data.accessToken);
            return axiosClient(originalConfig)

        }
        return Promise.reject(err)
    }

)
export default axiosClient;



