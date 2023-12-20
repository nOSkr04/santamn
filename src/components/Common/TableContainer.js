import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useExpanded,
  usePagination,
} from "react-table"
import { Table, Row, Col, Button } from "reactstrap"
import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter"
import { Link } from "react-router-dom"
import Empty from "./Empty"

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <React.Fragment>
      <Col xxl={3} lg={6}>
        <input
          type="search"
          className="form-control"
          id="search-bar-0"
          value={value || ""}
          placeholder={`${count} хэрэглэгч`}
          onChange={e => {
            setValue(e.target.value)
            onChange(e.target.value)
          }}
        />
      </Col>
      {isJobListGlobalFilter && (
        <JobListGlobalFilter setGlobalFilter={setGlobalFilter} />
      )}
    </React.Fragment>
  )
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  customPageSizeOptions,
  iscustomPageSizeOptions,
  isPagination,
  isShowingPageLength,
  paginationDiv,
  pagination,
  tableClass,
  theadClass,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      // defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    // useFilters,
    useSortBy,
    useExpanded,
    usePagination
  )

  // const generateSortingIndicator = column => {
  //   return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  // }

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }

  if (!data.length) {
    return <Empty />
  }

  return (
    <Fragment>
      <Row className="mb-2">
        {iscustomPageSizeOptions && (
          <Col md={customPageSizeOptions ? 2 : 1}>
            <select
              className="form-select"
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} ш
                </option>
              ))}
            </select>
          </Col>
        )}

        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isJobListGlobalFilter={isJobListGlobalFilter}
          />
        )}
        {isAddOptions && (
          <Col sm="7" xxl="8">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="7" xxl="8">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddCustList && (
          <Col sm="7" xxl="8">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded mb-2 me-2"
                onClick={handleCustomerClick}
              >
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )}
      </Row>

      <div className="table-responsive">
        <Table {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    key={column.id}
                    className={column.isSort ? "sorting" : ""}
                  >
                    <div className="m-0" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                    </div>
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map(cell => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      )
                    })}
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </Table>
      </div>

      {isPagination && (
        <Row className="justify-content-between align-items-center">
          {isShowingPageLength && (
            <div className="col-sm">
              <div className="text-muted">
                Харуулж буй <span className="fw-semibold">{page.length}</span>{" "}
                аас
                <span className="fw-semibold"> {data.length}</span>
              </div>
            </div>
          )}
          <div className={paginationDiv}>
            <ul className={pagination}>
              <li className={`page-item ${!canPreviousPage ? "disabled" : ""}`}>
                <Link to="#" className="page-link" onClick={previousPage}>
                  <i className="mdi mdi-chevron-left"></i>
                </Link>
              </li>
              <li className={"page-item active"}>
                <Link to="#" className="page-link">
                  {pageIndex + 1}
                </Link>
              </li>
              <li className={`page-item ${!canNextPage ? "disabled" : ""}`}>
                <Link to="#" className="page-link" onClick={nextPage}>
                  <i className="mdi mdi-chevron-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </Row>
      )}
    </Fragment>
  )
}

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default TableContainer
