import axios from "axios"

import { getCookie, setCookie } from "../utils/cookie"
import { getNewToken } from "../services/token"

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers:
        { "Content-Type": "application/json" }
})

api.interceptors.request.use((request) => {
    const accessToken = getCookie("accessToken")
    if (accessToken) {
        request.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return request
}, error => {
    return Promise.reject(error)
})


api.interceptors.response.use((response) => {
    return response
},
 async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry ) {
        originalRequest._retry = true;

        const response = await getNewToken()

        if (!response?.response) return
        setCookie(response.response.data)

        return api(originalRequest)
    }
})
export default api