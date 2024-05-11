import api from "../configs/api";
import { getCookie } from "../utils/cookie";


const getProfile = () => api.get("user/whoami").then(res => res || false)
const getPost = () => api.get("post/my")

export { getProfile, getPost }