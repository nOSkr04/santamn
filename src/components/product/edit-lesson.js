import React from "react"
import Dropzone from "react-dropzone"
import { Controller } from "react-hook-form"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap"

const EditLesson = ({
  modal,
  toggle,
  onSubmit,
  handleSubmit,
  control,
  errors,
  setselectedFiles,
  selectedFiles,
  loading,
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
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        Өөрчлөх
      </ModalHeader>
      <ModalBody>
        {loading ? (
          <Spinner
            color="primary"
            style={{
              height: "3rem",
              width: "3rem",
            }}
            type="grow"
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={12}>
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
                <div className="mb-3">
                  <Label className="form-label">Гарчиг</Label>
                  <Controller
                    rules={{ required: "Гарчиг заавал бөглөнө" }}
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        className={`form-control ${
                          errors.title && "border-danger"
                        } `}
                        placeholder="Гарчиг"
                      />
                    )}
                  />

                  {errors.title && (
                    <p className="text-danger mt-2">{errors.title.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Тайлбар</Label>
                  <Controller
                    rules={{ required: "Тайлбар заавал бөглөнө" }}
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        className={`form-control ${
                          errors.description && "border-danger"
                        } `}
                        placeholder="Тайлбар"
                      />
                    )}
                  />

                  {errors.description && (
                    <p className="text-danger mt-2">
                      {errors.description.message}
                    </p>
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
        )}
      </ModalBody>
    </Modal>
  )
}

export default EditLesson
