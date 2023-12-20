import moment from "moment"
import React from "react"
import { Badge } from "reactstrap"

const Name = cell => {
  return cell.value ? cell.value : ""
}
const Phone = cell => {
  return cell.value ? cell.value : ""
}
const Email = cell => {
  return cell.value ? cell.value : ""
}

const PaymentDate = cell => {
  const date1 = moment(new Date(cell.value)).format("YYYY-MM-DD HH:mm")
  if (!cell.value) {
    return "*"
  }
  return date1
}
const CreatedAt = cell => {
  const date1 = moment(new Date(cell.value)).format("YYYY-MM-DD HH:mm")
  return date1
}

const IsPayment = cell => {
  switch (cell.value) {
    case true:
      return <Badge className="bg-success font-size-10">Төлсөн</Badge>
    case false:
      return <Badge className="bg-danger font-size-10">Төлөөгүй</Badge>
  }
}

export { Name, Phone, Email, PaymentDate, CreatedAt, IsPayment }
