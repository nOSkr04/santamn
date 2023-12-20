import { customPost, del, get, put, post } from "helpers/api_helper"

export const getLessons = async ({ page, limit }) => {
  const res = await get(`/lessons?page=${page}&limit=${limit}&sort=-createdAt`)
  return res
}

export const createLesson = async data => {
  const res = await post("/lessons", data)
  return res
}

export const deleteLesson = async id => {
  const res = await del(`/lessons/${id}`)
  return res
}

export const editLesson = async user => {
  const res = put(`/lessons/${user._id}`, {
    title: user.title,
    description: user.description,
  })
  return res
}
export const editLessonVideo = async user => {
  const res = put(`/lessons/${user._id}`, {
    title: user.title,
    description: user.description,
    video: user.video,
  })
  return res
}

export const postVideo = async file => {
  const res = await customPost(`/media/video`, file)
  return res
}
