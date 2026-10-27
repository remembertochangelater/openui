"use client"

import { Table, type EmsteinUITableColumn } from "@/components/emstein-ui/table"

type Invoice = {
  invoice: string
  customer: string
  method: string
  status: "Paid" | "Pending" | "Overdue"
  amount: number
}

const invoices: Invoice[] = [
  { invoice: "INV-001", customer: "Northwind Traders", method: "Card", status: "Paid", amount: 250 },
  { invoice: "INV-002", customer: "Globex Corporation", method: "Transfer", status: "Pending", amount: 150 },
  { invoice: "INV-003", customer: "Initech", method: "Card", status: "Paid", amount: 350 },
  { invoice: "INV-004", customer: "Umbrella Health", method: "Invoice", status: "Overdue", amount: 450 },
  { invoice: "INV-005", customer: "Stark Industries", method: "Card", status: "Paid", amount: 550 },
]

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

const columns: EmsteinUITableColumn<Invoice>[] = [
  { key: "invoice", label: "Invoice", type: "shortText", footer: "Total" },
  { key: "customer", label: "Customer", type: "longText" },
  { key: "method", label: "Method", type: "shortText" },
  { key: "status", label: "Status", type: "status" },
  {
    key: "amount",
    label: "Amount",
    type: "currency",
    align: "right",
    render: (row) => currency.format(row.amount),
    footer: ({ rows }) =>
      currency.format(rows.reduce((total, row) => total + row.amount, 0)),
  },
]

export function TableFooterDemo() {
  return (
    <Table
      data={invoices}
      columns={columns}
      getRowId={(row) => row.invoice}
      className="rounded-lg"
    />
  )
}
