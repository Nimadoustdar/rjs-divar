import api from "../configs/api";


const getProfile = () => api.get("user/whoami").then(res => res || false)
const getPost = () => api.get("post/my")
const getAllPost = () => api.get("")
const deletePost = (id) => api.delete(`post/delete/${id}`)

export { getProfile, getPost, getAllPost, deletePost }