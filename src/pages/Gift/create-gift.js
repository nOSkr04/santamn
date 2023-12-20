/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useForm } from "react-hook-form"

import { GiftForm } from "components/forms/gift-form"
import { GiftApi, MediaApi } from "api"
import LoaderModal from "components/Common/LoaderModal"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"

const CreateGift = () => {
  //meta title
  document.title = "Захиалга үүсгэх"
  // Main FORM
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError,
    watch,
  } = useForm()
  const { mutate } = useSWRConfig()

  const [loader, setLoader] = useState(false)
  const [selectedFiles, setselectedFiles] = useState([])
  const onSubmit = async data => {
    setLoader(true)
    const formData = new FormData()
    formData.append("file", selectedFiles[0])
    const res = await MediaApi.postImage(formData)
    const createData = {
      ...data,
      image: {
        url: res.data.url,
        blurHash: res.data.blurHash,
      },
    }

    try {
      const res = await GiftApi.createGift(createData)
      console.log(res)
      setselectedFiles([])
      mutate("swr.gift")
      toast(`Бэлэг амжилттай нэмэгдлээ`, {
        type: "success",
      })
    } catch (err) {
      console.log(err)
      setError("root", { message: err?.response?.data?.error.message })
      toast(err?.response?.data?.error.message, { type: "error" })
    } finally {
      setLoader(false)
    }
  }

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Захиалга" breadcrumbItem="Захиалга нэмэх" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Захиалга нэмэх</CardTitle>
                  <GiftForm
                    onSubmit={onSubmit}
                    handleSubmit={handleSubmit}
                    control={control}
                    errors={errors}
                    selectedFiles={selectedFiles}
                    setselectedFiles={setselectedFiles}
                    reset={reset}
                    watch={watch}
                    loader={loader}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <LoaderModal modal={loader} setModal={setLoader} />
    </>
  )
}

export default CreateGift
