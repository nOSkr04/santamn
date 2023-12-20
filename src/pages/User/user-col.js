import moment from "moment"

const Phone = cell => {
  return cell.value ? cell.value : ""
}
const Egg = cell => {
  return cell.value ? cell.value : 0
}
const Token = cell => {
  return cell.value ? cell.value : "emp"
}

const CreatedAt = cell => {
  const date1 = moment(new Date(cell.value)).format("YYYY-MM-DD HH:mm")
  return date1
}

export { Phone, CreatedAt, Egg, Token }
