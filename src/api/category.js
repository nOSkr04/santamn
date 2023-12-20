import { get, post } from "helpers/api_helper"

export const getCategorys = async () => {
  const res = await get(`/category?page=1&limit=100&sort=-createdAt`)
  return res
}

export const createCategory = async data => {
  const res = await post("/category", data)
  return res
}
