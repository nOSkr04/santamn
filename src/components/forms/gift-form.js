import React, { memo } from "react"
import { Controller } from "react-hook-form"
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap"
import { Link } from "react-router-dom"
import Dropzone from "react-dropzone"

const GiftForm = memo(
  ({
    handleSubmit,
    onSubmit,
    control,
    errors,
    setselectedFiles,
    selectedFiles,
    reset,
  }) => {
    function handleAcceptedFiles(files) {
      files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: formatBytes(file.size),
        })
      )

      setselectedFiles(files)
    }

    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes"
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }

    return (
      <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
        <div data-repeater-list="outer-group mt-3" className="outer">
          <div data-repeater-item className="outer">
            <FormGroup className="mb-4" row>
              <Card>
                <CardBody>
                  <Dropzone
                    onDrop={acceptedFiles => {
                      handleAcceptedFiles(acceptedFiles)
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone">
                        <div
                          className="dz-message needsclick"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <div className="dz-message needsclick">
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>Хичээл энд оруулна уу.</h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <div className="dropzone-previews mt-3" id="file-previews">
                    {selectedFiles.map((f, i) => {
                      return (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={i + "-file"}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={f.name}
                                  src={f.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {f.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{f.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </CardBody>
              </Card>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col sm="6">
                        {/* 1.name */}
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
                                  errors.name && "border-danger"
                                } `}
                                placeholder="Нэр"
                              />
                            )}
                          />

                          {errors.name && (
                            <p className="text-danger mt-2">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        {/* 2.type */}
                        <div className="mb-3">
                          <Label htmlFor="type">Бүтээгдэхүүн</Label>
                          <Controller
                            rules={{ required: "Бүтээгдэхүүн заавал бөглөнө" }}
                            name="type"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                className={`form-control ${
                                  errors.type && "border-danger"
                                } `}
                                placeholder="Бүтээгдэхүүн"
                              />
                            )}
                          />
                          {errors.type && (
                            <p className="text-danger mt-2">
                              {errors.type.message}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col sm="6">
                        {/* 3.productType */}
                        <div className="mb-3">
                          <Label htmlFor="productType">
                            Бүтээгдэхүүн төрөл
                          </Label>
                          <Controller
                            name="productType"
                            control={control}
                            render={({ field }) => (
                              <select
                                id="formrow-InputState"
                                className="form-control"
                                {...field}
                              >
                                <option>Өндөг</option>
                                <option>Хөнгөлөлт</option>
                              </select>
                            )}
                          />
                          {errors.productType && (
                            <p className="text-danger mt-2">
                              {errors.productType.message}
                            </p>
                          )}
                        </div>
                        {/* 4.quantity */}
                        <div className="mb-3">
                          <Label htmlFor="quantity">Тоо ширхэг</Label>
                          <Controller
                            rules={{ required: "Тоо ширхэг заавал бөглөнө" }}
                            name="quantity"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                className={`form-control ${
                                  errors.quantity && "border-danger"
                                } `}
                                placeholder="Тоо ширхэг"
                              />
                            )}
                          />
                          {errors.quantity && (
                            <p className="text-danger mt-2">
                              {errors.quantity.message}
                            </p>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn ">
                        Хадгалах
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => {
                          reset({
                            title: "",
                            description: "",
                          })
                          setselectedFiles([])
                        }}
                      >
                        Цэвэрлэх
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </FormGroup>
          </div>
        </div>
      </form>
    )
  }
)

GiftForm.displayName = "GiftForm"

export { GiftForm }
