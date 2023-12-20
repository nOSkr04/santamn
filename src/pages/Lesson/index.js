import React, { useState, useMemo } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
} from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { LessonsApi } from "api"
import useSWR from "swr"
import Spinners from "components/Common/Spinner"
import TableContainer from "components/Common/TableContainer"

import withRouter from "components/Common/withRouter"

import { Link } from "react-router-dom"
import DeleteModal from "components/Common/DeleteModal"
import { CreatedAt, Description, Duration, Title } from "./lesson-col"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import EditLesson from "components/product/edit-lesson"
const Lesson = () => {
  //meta title
  document.title = "Захиалга"

  const [deleteModal, setDeleteModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [deleteProduct, setDeleteProduct] = useState()
  const [selectedFiles, setselectedFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const {
    data: orders,
    isLoading,
    mutate,
  } = useSWR(
    `swr.lesson`,
    async () => {
      const res = await LessonsApi.getLessons({
        page: 1,
        limit: 10000,
      })
      return res
    },
    {
      onError: error => {
        toast(error.response.data.error.message, { type: "error" })
      },
    }
  )

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    reValidateMode: "onChange",
  })

  const onClickDelete = async () => {
    try {
      await LessonsApi.deleteLesson(deleteProduct._id)
      setTimeout(() => {
        mutate()
      }, 500)
    } catch (err) {
      toast(err.response.data.error.message, { type: "error" })
    } finally {
      setDeleteModal(false)
    }
  }

  const handleDeleteOrder = product => {
    setDeleteProduct(product)
    setDeleteModal(true)
  }
  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    reset(arg)
    toggle()
  }

  // Table Data
  const columns = useMemo(
    () => [
      {
        Header: "Гарчиг",
        accessor: "title",
        filterable: true,
        isSort: true,
        Cell: cellProps => {
          return <Title {...cellProps} />
        },
      },
      {
        Header: "Тайлбар",
        accessor: "description",
        filterable: true,
        isSort: true,
        Cell: cellProps => {
          return <Description {...cellProps} />
        },
      },
      {
        Header: "Урт",
        accessor: "video",
        isSort: true,
        Cell: cellProps => {
          return <Duration {...cellProps} />
        },
      },
      {
        Header: "Үүсгэсэн огноо",
        accessor: "createdAt",
        isSort: true,
        Cell: cellProps => {
          return <CreatedAt {...cellProps} />
        },
      },
      {
        Header: "Үйлдэл",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original
                  handleUserClick(userData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Өөрчлөх
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original
                  handleDeleteOrder(userData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Устгах
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  const onSubmit = async data => {
    setLoading(true)
    try {
      if (selectedFiles[0]) {
        const file = selectedFiles[0]
        const formData = new FormData()
        formData.append("file", file)
        const video = await LessonsApi.postVideo(formData)
        const createData = {
          title: data.title,
          description: data.description,
          video: video._id,
          _id: data._id,
        }
        await LessonsApi.editLessonVideo(createData)
        toggle()
        setTimeout(() => {
          mutate()
        }, 500)
        toast("Амжилтай өөрчллөө", { type: "success" })
        reset({
          title: "",
          description: "",
        })
        setselectedFiles([])
      }
      await LessonsApi.editLesson(data)
      toggle()
      setTimeout(() => {
        mutate()
      }, 500)
      setselectedFiles([])
    } catch (err) {
      toast(err.response.data.error.message, { type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={onClickDelete}
        onCloseClick={() => setDeleteModal(false)}
        title={"Хэрэглэгч"}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Хэрэглэгч "
            breadcrumbItem="Хэрэглэгч  жагсаалт"
          />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-3">Хичээл</h4>
                  {isLoading ? (
                    <Spinners />
                  ) : (
                    <TableContainer
                      columns={columns}
                      data={orders?.data || []}
                      isAddOptions={false}
                      customPageSize={10}
                      isPagination={true}
                      isShowingPageLength={true}
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination justify-content-end pagination-rounded"
                      tableClass="table-hover datatable dt-responsive nowrap dataTable no-footer dtr-inline"
                      pageCount={orders?.pageCount || 0}
                      total={orders?.total || 0}
                      isGlobalFilter={true}
                      iscustomPageSizeOptions={true}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <EditLesson
        toggle={toggle}
        modal={modal}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        setselectedFiles={setselectedFiles}
        selectedFiles={selectedFiles}
        loading={loading}
      />
    </React.Fragment>
  )
}

export default withRouter(Lesson)
