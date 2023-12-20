import React from "react"
import Dropzone from "react-dropzone"
import { Controller } from "react-hook-form"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Input, Label, Row } from "reactstrap"

const ModelTypeForm = ({
  handleSubmit,
  onSubmit,
  control,
  title,
  errors,
  setselectedFiles,
  selectedFiles,
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
      <Card>
        <CardBody>
          <Dropzone
            onDrop={acceptedFiles => {
              handleAcceptedFiles(acceptedFiles)
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone">
                <div className="dz-message needsclick" {...getRootProps()}>
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
                        <Link to="#" className="text-muted font-weight-bold">
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
        <Label className={`form-label ${errors && "text-danger"}`}>
          {title}
        </Label>
        <Controller
          name="name"
          control={control}
          rules={{ required: `${title} заавал сонгоно` }}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              className={`form-control ${errors && "border-danger"}`}
              placeholder={title}
            />
          )}
        />
      </div>
      {errors && <p className="text-danger">{errors}</p>}
      <div className="mt-3 d-grid">
        <button className="btn btn-primary btn-block" type="submit">
          Хадгалах
        </button>
      </div>
    </form>
  )
}

export default ModelTypeForm
