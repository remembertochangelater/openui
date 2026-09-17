"use client"

import { Table } from "@/components/emstein-ui/table"
import { demoColumns, demoUsers } from "@/lib/table-demo-data"

export function TablePreview() {
  return (
    <Table data={demoUsers} columns={demoColumns} getRowId={(row) => row.id} />
  )
}
