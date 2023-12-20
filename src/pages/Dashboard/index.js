import React from "react"
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import useSWR from "swr"
import { UsersApi } from "api"
import PieChart from "./PieChart"
import DashedLine from "./dashedLine"

const Dashboard = () => {
  //meta title
  document.title = "Дашбоард"
  const { data } = useSWR("swr.dashboard", async () => {
    const res = await UsersApi.getDashboard()
    return res
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={"Нүүр"} breadcrumbItem={"Нүүр"} />
          <Row>
            <Col md="4">
              <Card className="mini-stats-wid">
                <CardBody>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <p className="text-muted fw-medium">Нийт хэрэглэгч</p>
                      <h4 className="mb-0">{data?.allUserCount} хэрэглэгч</h4>
                    </div>
                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                      <span className="avatar-title rounded-circle bg-primary">
                        <i className={"bx bx-user font-size-24"}></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="mini-stats-wid">
                <CardBody>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <p className="text-muted fw-medium">Нийт орлого</p>
                      <h4 className="mb-0">
                        {data?.netWorth.toLocaleString()} ₮
                      </h4>
                    </div>
                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                      <span className="avatar-title rounded-circle bg-primary">
                        <i
                          className={"bx bx-purchase-tag-alt font-size-24"}
                        ></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="mini-stats-wid">
                <CardBody>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <p className="text-muted fw-medium">
                        Төлбөр төлсөн хэрэглэгч
                      </p>
                      <h4 className="mb-0">{data?.payedUser} хэрэглэгч</h4>
                    </div>
                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                      <span className="avatar-title rounded-circle bg-primary">
                        <i
                          className={"bx bx-purchase-tag-alt font-size-24"}
                        ></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Хэрэглэгчдийн харьцаа</CardTitle>
                  <PieChart data={data} />
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Статик</CardTitle>
                  <DashedLine
                    data={data?.dailyUserCounts}
                    created={data?.dailyUserCreateCounts}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
