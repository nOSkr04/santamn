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

import useSWR from "swr"
import Spinners from "components/Common/Spinner"
import TableContainer from "components/Common/TableContainer"

import withRouter from "components/Common/withRouter"
import { Image, Name, ProductType, Quantity, Type } from "./gift-col"
import { Link } from "react-router-dom"
import DeleteModal from "components/Common/DeleteModal"
import { GiftApi, MediaApi } from "api"
import ProductEditModal from "components/modals/product-edit-modal"

const Gift = () => {
  //meta title
  document.title = "Захиалга"

  const [deleteModal, setDeleteModal] = useState(false)
  const [pageIndex] = useState(1)
  const [loader, setLoader] = useState(false)
  const [selectedFiles, setselectedFiles] = useState([])
  const [deleteGift, setDeleteGift] = useState()
  const [modal, setModal] = useState(false)
  const {
    data: orders,
    isLoading,
    mutate,
  } = useSWR(`swr.gift`, async () => {
    const res = await GiftApi.getGifts({
      page: pageIndex,
      limit: 1000,
    })
    return res
  })
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    reValidateMode: "onChange",
  })

  const toggle = () => setModal(!modal)

  const onClickDelete = async () => {
    try {
      await GiftApi.deleteGift(deleteGift._id)
      setTimeout(() => {
        mutate()
      }, 500)
    } catch (err) {
      toast(err?.response?.data?.error?.message, { type: "error" })
    } finally {
      setDeleteModal(false)
    }
  }

  const handleDeleteOrder = gift => {
    setDeleteGift(gift)
    setDeleteModal(true)
  }

  const handleUserClick = arg => {
    reset(arg)
    toggle()
  }

  // Table Data
  const columns = useMemo(
    () => [
      {
        Header: "Зураг",
        accessor: "image",
        filterable: true,
        isSort: true,
        Cell: cellProps => {
          return <Image {...cellProps} />
        },
      },
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
        Header: "Бүтээгдэхүүн",
        accessor: "type",
        filterable: true,
        isSort: true,
        Cell: cellProps => {
          return <Type {...cellProps} />
        },
      },
      {
        Header: "Тоо ширхэг",
        accessor: "quantity",
        filterable: true,
        isSort: true,
        Cell: cellProps => {
          return <Quantity {...cellProps} />
        },
      },
      {
        Header: "Бүтээгдэхүүн төрөл",
        accessor: "productType",
        filterable: true,
        isSort: true,
        Cell: cellProps => {
          return <ProductType {...cellProps} />
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
    setLoader(true)
    const image = selectedFiles[0]
    if (image) {
      const formData = new FormData()
      formData.append("file", image)
      const res = await MediaApi.postImage(formData)
      const editData = {
        ...data,
        image: {
          url: res.data.url,
          blurHash: res.data.blurHash,
        },
      }
      try {
        await GiftApi.editGift(editData)
        toggle()
        setselectedFiles([])
        setTimeout(() => {
          mutate()
        }, 500)
      } catch (err) {
        toast(err?.response?.data?.error?.message, { type: "error" })
      } finally {
        setLoader(false)
      }
    } else {
      try {
        await GiftApi.editGift(data)
        toggle()
        setTimeout(() => {
          mutate()
        }, 500)
      } catch (err) {
        toast(err?.response?.data?.error?.message, { type: "error" })
      } finally {
        setLoader(false)
      }
    }
  }
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={onClickDelete}
        onCloseClick={() => setDeleteModal(false)}
        title={"Захиалга"}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Захиалга" breadcrumbItem="Захиалга жагсаалт" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-3">Захиалга</h4>
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
                      isGlobalFilter={true}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ProductEditModal
        toggle={toggle}
        modal={modal}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        setselectedFiles={setselectedFiles}
        selectedFiles={selectedFiles}
        loader={loader}
        setLoader={setLoader}
      />
    </React.Fragment>
  )
}

export default withRouter(Gift)
