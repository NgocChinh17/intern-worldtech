import React from "react"
import { Table } from "antd"

const TableComponent = ({ columns, data, id }) => {
  return (
    <div>
      <Table showHeader={false} pagination={false} columns={columns} dataSource={data} />
    </div>
  )
}

export default TableComponent
