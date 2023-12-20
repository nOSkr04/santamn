import React from "react"
import { Controller } from "react-hook-form"
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap"

const EditModal = ({
  modal,
  toggle,
  onSubmit,
  handleSubmit,
  control,
  errors,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        Өөрчлөх
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12}>
              <div className="mb-3">
                <Label className="form-label">Нэр</Label>
                <Controller
                  rules={{ required: "Нэр заавал бөглөнө" }}
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      className={`form-control ${
                        errors.modelNomer && "border-danger"
                      } `}
                      placeholder="Нэр"
                    />
                  )}
                />

                {errors.name && (
                  <p className="text-danger mt-2">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-3">
                <Label className="form-label">И-мэйл</Label>
                <Controller
                  rules={{ required: "И-мэйл заавал бөглөнө" }}
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      className={`form-control ${
                        errors.modelNomer && "border-danger"
                      } `}
                      placeholder="И-мэйл"
                    />
                  )}
                />

                {errors.email && (
                  <p className="text-danger mt-2">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-3">
                <Label className="form-label">Эрх</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="formrow-InputState"
                      className="form-control"
                      {...field}
                    >
                      <option>user</option>
                      <option>operator</option>
                      <option>admin</option>
                    </select>
                  )}
                />

                {errors.role && (
                  <p className="text-danger mt-2">{errors.role.message}</p>
                )}
              </div>
              <div className="mb-3">
                <Label className="form-label">Төлөв</Label>
                <Controller
                  name="isPayment"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="formrow-InputState"
                      className="form-control"
                      {...field}
                    >
                      <option value={true}>Төлсөн</option>
                      <option value={false}>Төлөөгүй</option>
                    </select>
                  )}
                />

                {errors.isPayment && (
                  <p className="text-danger mt-2">{errors.isPayment.message}</p>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  Хадгалах
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
