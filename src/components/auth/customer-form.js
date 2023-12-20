import React from "react"
import { Controller } from "react-hook-form"
import { Input, Label } from "reactstrap"

const CustomerForm = ({ handleSubmit, onSubmit, control, errors }) => {
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <Label className="form-label">Нэр</Label>
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
        <Label className="form-label">Улс</Label>
        <Controller
          name="location"
          control={control}
          rules={{ required: "Заавал бөглөнө" }}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              className="form-control"
              placeholder="Улс"
            />
          )}
        />
        {errors.location && (
          <p className="text-danger mt-2">{errors.location.message}</p>
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
      <div className="mb-3">
        <Label className="form-label">Нутаг</Label>
        <Controller
          name="country"
          control={control}
          rules={{ required: "Заавал бөглөнө" }}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              className="form-control"
              placeholder="Нутаг"
            />
          )}
        />
        {errors.country && (
          <p className="text-danger mt-2">{errors.country.message}</p>
        )}
      </div>
      <div className="mb-3">
        <Label className="form-label">Нутгийн код</Label>
        <Controller
          name="countryCode"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              className="form-control"
              placeholder="Нутгийн код"
            />
          )}
        />
      </div>
      <div className="mt-3 d-grid">
        <button className="btn btn-primary btn-block" type="submit">
          Нэвтрэх
        </button>
      </div>
    </form>
  )
}

export default CustomerForm
