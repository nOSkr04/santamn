import React from "react"
import { Label } from "reactstrap"

const LoginForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  clearErrors,
}) => {
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <Label className="form-label">Утас</Label>
        <input
          {...register("phone", { required: "Утас оруулах хэрэгтэй" })}
          name="phone"
          className="form-control"
          placeholder="Утас оруулна уу"
          onChange={() => {
            clearErrors("root")
          }}
        />
        {errors.phone && (
          <p className="text-danger mt-2">{errors.phone.message}</p>
        )}
      </div>

      <div className="mb-3">
        <Label className="form-label">Нууц үг</Label>
        <input
          name="password"
          type="password"
          placeholder="Нууц үгээ оруулна уу"
          className="form-control"
          {...register("password", { required: "Нууц үг оруулах хэрэгтэй" })}
          onChange={() => {
            clearErrors("root")
          }}
        />
        {errors.password && (
          <p className="text-danger mt-2">{errors.password.message}</p>
        )}
        {errors.root && (
          <p className="text-danger mt-2">{errors.root.message}</p>
        )}
      </div>
      <div className="mt-3 d-grid">
        <button className="btn btn-primary btn-block" type="submit">
          Нэвтрэх
        </button>
      </div>
    </form>
  )
}

export default LoginForm
