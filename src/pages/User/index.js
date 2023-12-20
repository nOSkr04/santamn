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
import { useForm } from "react-hook-form"

import { UsersApi } from "api"
import useSWR from "swr"
import Spinners from "components/Common/Spinner"
import TableContainer from "components/Common/TableContainer"

import withRouter from "components/Common/withRouter"

import { Link } from "react-router-dom"
import EditModal from "components/modals/edit-modal"
import DeleteModal from "components/Common/DeleteModal"
import { CreatedAt, Egg, Phone, Token } from "./user-col"
import PasswordModal from "components/modals/password-modal"
import { toast } from "react-toastify"
const User = () => {
  //meta title
  document.title = "Захиалга"

  const [deleteModal, setDeleteModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const [deleteProduct, setDeleteProduct] = useState()
  const [user, setUser] = useState()
  const {
    data: orders,
    isLoading,
    mutate,
  } = useSWR(
    `swr.users`,
    async () => {
      const res = await UsersApi.getUsers({
        page: 1,
        limit: 10000,
      })
      return res
    },
    {
      onError: error => {
        toast(error.response?.data?.error.message, { type: "error" })
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

  const {
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordError },
    control: passwordControl,
    reset: passwordReset,
  } = useForm()

  const onClickDelete = async () => {
    try {
      await UsersApi.deleteUser(deleteProduct._id)
      setTimeout(() => {
        mutate()
      }, 500)
    } catch (err) {
      if (err.response.data) {
        toast(err.response.data.error.message, { type: "error" })
      }
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
  const togglePassword = () => {
    setPasswordModal(!passwordModal)
  }
  const handleUserClick = arg => {
    reset(arg)
    toggle()
  }
  const changePassword = user => {
    setUser(user)
    togglePassword()
  }

  // Table Data
  const columns = useMemo(
    () => [
      {
        Header: "Утас",
        accessor: "phone",
        filterable: true,
        isSort: true,
        Cell: cellProps => {
          return <Phone {...cellProps} />
        },
      },
      {
        Header: "Өндөг",
        accessor: "eggCount",
        isSort: true,
        Cell: cellProps => {
          return <Egg {...cellProps} />
        },
      },
      {
        Header: "Expo Token",
        accessor: "expoPushToken",
        isSort: true,
        Cell: cellProps => {
          return <Token {...cellProps} />
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
                className="text-warning"
                onClick={() => {
                  const userData = cellProps.row.original
                  changePassword(userData)
                }}
              >
                <i className="mdi mdi-alpha-p-box font-size-18" id="password" />
                <UncontrolledTooltip placement="top" target="password">
                  Нууц үг
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
    try {
      await UsersApi.editProduct(data)
      toggle()
      setTimeout(() => {
        mutate()
      }, 500)
    } catch (err) {
      if (err.response.data) {
        toast(err.response.data.error.message, { type: "error" })
      }
    }
  }
  const onPassword = async data => {
    try {
      await UsersApi.editPassword({ data, id: user._id })
      togglePassword()
      setUser()
      passwordReset()
      setTimeout(() => {
        mutate()
      }, 500)
    } catch (err) {
      if (err.response.data) {
        toast(err.response.data.error.message, { type: "error" })
      }
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
                  <h4 className="card-title mb-3">Хэрэглэгч </h4>
                  {isLoading ? (
                    <Spinners />
                  ) : (
                    <>
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
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <EditModal
        toggle={toggle}
        modal={modal}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
      />
      <PasswordModal
        toggle={togglePassword}
        modal={passwordModal}
        onSubmit={onPassword}
        handleSubmit={passwordHandleSubmit}
        control={passwordControl}
        errors={passwordError}
        user={user}
      />
    </React.Fragment>
  )
}

export default withRouter(User)
