import { del, get, post, put } from "helpers/api_helper"

export const getUsers = async ({ page, limit }) => {
  const res = await get(`/users?page=${page}&limit=${limit}&sort=-createdAt`)
  return res
}

export const deleteUser = async id => {
  const res = await del(`/users/${id}`)
  return res
}

export const editProduct = async user => {
  const res = put(`/users/${user._id}`, user)
  return res
}

export const getDashboard = async () => {
  const res = await get(`/users/dashboard`)
  return res
}

export const editPassword = async ({ data, id }) => {
  const res = post(`/users/update-password/${id}`, data)
  return res
}
