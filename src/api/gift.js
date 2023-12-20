import { del, get, post, put } from "helpers/api_helper"

export const getGifts = async ({ page, limit }) => {
  const res = await get(`/gifts?page=${page}&limit=${limit}&sort=-createdAt`)
  return res
}

export const deleteGift = async id => {
  const res = await del(`/gifts/${id}`)
  return res
}

export const editGift = async data => {
  const res = put(`/gifts/${data._id}`, data)
  return res
}

export const createGift = async data => {
  const res = await post("/gifts", data)
  return res
}
