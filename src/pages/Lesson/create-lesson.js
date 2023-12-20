import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useForm } from "react-hook-form"

import { ProductForm } from "components/forms/lesson-form"
import { CategoryApi, LessonsApi } from "api"
import LoaderModal from "components/Common/LoaderModal"
import { toast } from "react-toastify"
import ModelTypeForm from "components/auth/model-type-form"
const CreateProduct = () => {
  //meta title
  document.title = "Хичээл үүсгэх"
  // Main FORM
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm()

  const {
    handleSubmit: categorySubmit,
    control: categoryControl,
    reset: resetCategory,
    formState: { errors: categoryError },
    setError: cateogrySetError,
  } = useForm()
  const [modal, setModal] = useState(false)
  const [loader, setLoader] = useState(false)

  const [selectedFiles, setselectedFiles] = useState([])

  const onSubmit = async data => {
    setLoader(true)
    try {
      const file = selectedFiles[0]
      const formData = new FormData()
      formData.append("file", file)
      const video = await LessonsApi.postVideo(formData)
      const createData = {
        title: data.title,
        description: data.description,
        video: video._id,
        category: data.category.value,
      }
      await LessonsApi.createLesson(createData)
      toast("Амжилтай нэмэгдлээ", { type: "success" })
      reset({
        title: "",
        description: "",
        category: null,
      })
      setselectedFiles([])
    } catch (err) {
      toast(err.response.data.error.message, { type: "error" })
    } finally {
      setLoader(false)
    }
  }
  // gg
  const onCategorySubmit = async data => {
    try {
      await CategoryApi.createCategory(data)
      toggleCategory()
      toast("Амжилтай нэмэгдлээ", { type: "success" })
      setTimeout(() => {
        mutate("swr.category")
      }, 500)
      resetCategory({
        name: "",
      })
    } catch (err) {
      toast(err.response.data.error.message, { type: "error" })
      cateogrySetError("name", {
        message: err.response.data.error.message,
      })
    }
  }

  const toggleCategory = () => {
    setModal(!modal)
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
                  <CardTitle className="mb-4">Хичээл нэмэх</CardTitle>
                  <ProductForm
                    onSubmit={onSubmit}
                    handleSubmit={handleSubmit}
                    control={control}
                    errors={errors}
                    selectedFiles={selectedFiles}
                    setselectedFiles={setselectedFiles}
                    reset={reset}
                    watch={watch}
                    toggleCategory={toggleCategory}
                    loader={loader}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <LoaderModal modal={loader} setModal={setLoader} />
      {/* Gage Modal */}
      <Modal isOpen={modal} toggle={toggleCategory}>
        <ModalHeader toggle={toggleCategory} tag="h4">
          Category нэмэх
        </ModalHeader>
        <ModalBody>
          <ModelTypeForm
            onSubmit={onCategorySubmit}
            handleSubmit={categorySubmit}
            control={categoryControl}
            title="Category"
            errors={categoryError.name?.message}
          />
        </ModalBody>
      </Modal>
    </>
  )
}

export default CreateProduct
