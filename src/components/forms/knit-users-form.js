import React from "react"
import { Controller } from "react-hook-form"
import { Button, Col, Input, Label, Row } from "reactstrap"

const KnitUserForm = ({ handleSubmit, onSubmit, control, errors }) => {
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="6">
          {" "}
          <div className="mb-3">
            <Label className="form-label">Бүтэн нэр</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Заавал бөглөнө" }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Нэр"
                />
              )}
            />
            {errors.name && (
              <p className="text-danger mt-2">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <Label className="form-label">И-мэйл хаяг</Label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Заавал бөглөнө" }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="И-мэйл хаяг"
                />
              )}
            />
            {errors.email && (
              <p className="text-danger mt-2">{errors.email.message}</p>
            )}
          </div>
        </Col>
        <Col sm="6">
          {" "}
          <div className="mb-3">
            <Label className="form-label">Утас</Label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Заавал бөглөнө" }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Утас"
                />
              )}
            />
            {errors.phone && (
              <p className="text-danger mt-2">{errors.phone.message}</p>
            )}
          </div>
        </Col>
      </Row>

      <div className="d-flex flex-wrap gap-2">
        <Button type="submit" color="primary" className="btn ">
          Нэмэх
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            reset({
              name: "",
              phone: "",
              email: "",
            })
          }}
        >
          Цэвэрлэх
        </Button>
      </div>
    </form>
  )
}

export default KnitUserForm
