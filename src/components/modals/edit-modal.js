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
                <Label className="form-label">Утас</Label>
                <Controller
                  rules={{ required: "Утас заавал бөглөнө" }}
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      className={`form-control ${
                        errors.modelNomer && "border-danger"
                      } `}
                      placeholder="Утас"
                    />
                  )}
                />

                {errors.phone && (
                  <p className="text-danger mt-2">{errors.phone.message}</p>
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
                <Label className="form-label">Өндөг</Label>
                <Controller
                  rules={{ required: "Өндөг заавал бөглөнө" }}
                  name="eggCount"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      className={`form-control ${
                        errors.modelNomer && "border-danger"
                      } `}
                      placeholder="Өндөг"
                    />
                  )}
                />

                {errors.eggCount && (
                  <p className="text-danger mt-2">{errors.eggCount.message}</p>
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
