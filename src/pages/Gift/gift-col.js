import React from "react"

const Image = cell => {
  return <img src={cell.value?.url} width={50} height={50} alt={cell.value} />
}
const Name = cell => {
  return cell.value ? cell.value : ""
}
const Type = cell => {
  return cell.value ? cell.value : ""
}
const Quantity = cell => {
  return cell.value ? cell.value : 0
}
const ProductType = cell => {
  return cell.value ? cell.value : ""
}

export { Image, Name, Type, Quantity, ProductType }
