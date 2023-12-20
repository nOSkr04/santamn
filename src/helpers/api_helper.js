import axios from "axios"
import authHeader from "./auth-token-header"
//pass new generated access token here
const token = `Bearer ${authHeader().Authorization}`

//apply base url for axios
// const API_URL = "http://localhost:8005"
const API_URL = "https://boostersback.com"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi
    .get(`${API_URL}${url}`, { ...config, headers: { Authorization: token } })
    .then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(`${API_URL}${url}`, { ...data }, { ...config })
    .then(response => response.data)
}

export async function customPost(url, data, config = {}) {
  return axiosApi
    .post(`${API_URL}${url}`, data, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(`${API_URL}${url}`, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(`${API_URL}${url}`, { ...config })
    .then(response => response.data)
}
