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

const PasswordModal = ({
  modal,
  toggle,
  onSubmit,
  handleSubmit,
  control,
  errors,
  user,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        {user?.name}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12}>
              <div className="mb-3">
                <Label className="form-label">Нууц үг</Label>
                <Controller
                  rules={{ required: "Нууц үг заавал бөглөнө" }}
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      className={`form-control ${
                        errors.password && "border-danger"
                      } `}
                      placeholder="Нууц үг"
                    />
                  )}
                />

                {errors.password && (
                  <p className="text-danger mt-2">{errors.password.message}</p>
                )}
              </div>
              <div className="mb-3">
                <Label className="form-label">Баталгаажуулах нууц үг</Label>
                <Controller
                  rules={{ required: "Баталгаажуулах нууц үг заавал бөглөнө" }}
                  name="cpassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      className={`form-control ${
                        errors.cpassword && "border-danger"
                      } `}
                      placeholder="Баталгаажуулах нууц үг"
                    />
                  )}
                />

                {errors.cpassword && (
                  <p className="text-danger mt-2">{errors.cpassword.message}</p>
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

export default PasswordModal
