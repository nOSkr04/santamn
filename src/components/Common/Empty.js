import React from "react"
import { Card, CardBody, Col, Container } from "reactstrap"

const Empty = () => {
  return (
    <Container>
      <Col md={6}>
        <Card className="mt-4 maintenance-box col-4">
          <CardBody>
            <i className="bx bx-broadcast mb-4 h1 text-primary"></i>
            <h5 className="font-size-15 text-uppercase">Хоосон байна?</h5>
          </CardBody>
        </Card>
      </Col>
    </Container>
  )
}

export default Empty
