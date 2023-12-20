import React from "react"
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Dashboard = () => {
  //meta title
  document.title = "Дашбоард"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={"Нүүр"} breadcrumbItem={"Нүүр"} />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
