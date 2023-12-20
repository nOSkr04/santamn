import React, { useState, useMemo } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap"
import classnames from "classnames"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useForm } from "react-hook-form"

import { UsersApi } from "api"
import useSWR from "swr"
import Spinners from "components/Common/Spinner"
import TableContainer from "components/Common/TableContainer"

import withRouter from "components/Common/withRouter"

import { Link } from "react-router-dom"
import EditModal from "components/product/edit-modal"
import DeleteModal from "components/Common/DeleteModal"
import {
  CreatedAt,
  Email,
  IsPayment,
  Name,
  PaymentDate,
  Phone,
} from "./user-col"
import PasswordModal from "components/product/password-modal"
import { toast } from "react-toastify"
const User = () => {
  //meta title
  document.title = "Захиалга"

  const [activeTab, setActiveTab] = useState("All")
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
    `${activeTab}.swr.user`,
    async () => {
      const active =
        activeTab === "All"
          ? ""
          : activeTab === "Payed"
          ? "&isPayment=true"
          : "&isPayment=false"
      const res = await UsersApi.getUsers({
        page: 1,
        limit: 10000,
        activeTab: active,
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
  const {
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordError },
    control: passwordControl,
    reset: passwordReset,
  } = useForm()
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const onClickDelete = async () => {
    try {
      await UsersApi.deleteUser(deleteProduct._id)
      setTimeout(() => {
        mutate()
      }, 500)
    } catch (err) {
      console.log(err, "err")
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
        Header: "Нэр",
        accessor: "name",
        filterable: true,
        isSort: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
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
        Header: "И-мэйл",
        accessor: "email",
        filterable: true,
        isSort: true,
        Cell: cellProps => {
          return <Email {...cellProps} />
        },
      },

      {
        Header: "Төлбөр төлсөн огноо",
        accessor: "paymentDate",
        isSort: true,
        Cell: cellProps => {
          return <PaymentDate {...cellProps} />
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
        Header: "Төлөв",
        accessor: "isPayment",
        isSort: true,
        Cell: cellProps => {
          return <IsPayment {...cellProps} />
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
      console.log(err, "err")
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
      console.log(err, "err")
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
                      <ul
                        className="nav nav-tabs nav-tabs-custom"
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "All",
                            })}
                            onClick={() => {
                              toggleTab("All")
                            }}
                          >
                            Бүгд
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "Payed",
                            })}
                            onClick={() => {
                              toggleTab("Payed")
                            }}
                          >
                            Төлөгдсөн
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "UnPayed",
                            })}
                            onClick={() => {
                              toggleTab("UnPayed")
                            }}
                          >
                            Төлөөгүй
                          </NavLink>
                        </NavItem>
                      </ul>

                      <TabContent activeTab={activeTab} className="p-3">
                        <TabPane tabId="All" id="all-order">
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
                        </TabPane>
                        <TabPane tabId="Payed" id="Payed">
                          <div>
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
                          </div>
                        </TabPane>
                        <TabPane tabId="UnPayed" id="UnPayed">
                          <div>
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
                          </div>
                        </TabPane>
                      </TabContent>
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
