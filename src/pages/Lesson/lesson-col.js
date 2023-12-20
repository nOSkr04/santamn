import moment from "moment"

const Title = cell => {
  return cell.value ? cell.value : ""
}
const Description = cell => {
  return cell.value ? cell.value : ""
}
const Duration = cell => {
  return cell.value ? `${cell.value.duration} сэк` : ""
}

const CreatedAt = cell => {
  const date1 = moment(new Date(cell.value)).format("YYYY-MM-DD HH:mm")
  return date1
}

export { CreatedAt, Title, Description, Duration }
