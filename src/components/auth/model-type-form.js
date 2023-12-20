import React from "react"
import { Controller } from "react-hook-form"
import { Input, Label } from "reactstrap"

const ModelTypeForm = ({ handleSubmit, onSubmit, control, title, errors }) => {
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
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
