import { customPost } from "helpers/api_helper"

export const postImage = async data => {
  const res = await customPost("/media/photo", data)
  return res
}
