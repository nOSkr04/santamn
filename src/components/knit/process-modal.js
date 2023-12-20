import { KnitUserApi } from "api"
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
import useSWR from "swr"
import Select from "react-select"
const ProcessModal = ({
  modal,
  toggle,
  onSubmit,
  handleSubmit,
  control,
  errors,
}) => {
  const { data } = useSWR("swr.knit.user", async () => {
    const { data } = await KnitUserApi.getKnitUsers()
    return data.map(knit => ({
      label: knit.name,
      value: knit._id,
    }))
  })
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        Даалгавар
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12}>
              <div className="mb-3">
                <Label htmlFor="knitUser">Сүлжигч</Label>
                <div className="hstack gap-3 ">
                  <Controller
                    name="knitUser"
                    control={control}
                    rules={{ required: "Сүлжигч заавал сонгоно" }}
                    render={({ field }) => {
                      return (
                        <>
                          <Select
                            styles={{
                              option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected
                                  ? "#ccc"
                                  : "white",
                              }),
                            }}
                            className="form-control me-auto"
                            options={data || []}
                            {...field}
                            placeholder="Сүлжигч"
                          />
                        </>
                      )
                    }}
                  />
                </div>
                {errors.knitUser && (
                  <p className="text-danger mt-2">{errors.knitUser.message}</p>
                )}
              </div>
              <div className="mb-3">
                <Label className="form-label">Олгох тоо</Label>
                <Controller
                  rules={{ required: "Олгох тоо заавал бөглөнө" }}
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      className={`form-control ${
                        errors.quantity && "border-danger"
                      } `}
                      placeholder="Олгох тоо"
                    />
                  )}
                />

                {errors.quantity && (
                  <p className="text-danger mt-2">{errors.quantity.message}</p>
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

export default ProcessModal
