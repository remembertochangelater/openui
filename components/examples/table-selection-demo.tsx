"use client"

import * as React from "react"

import { Table, type EmsteinUITableColumn } from "@/components/emstein-ui/table"

type Task = {
  id: string
  title: string
  assignee: string
  priority: "Low" | "Medium" | "High"
  estimate: number
}

const tasks: Task[] = [
  { id: "TASK-8782", title: "Audit onboarding emails", assignee: "Maya Reed", priority: "High", estimate: 3 },
  { id: "TASK-7878", title: "Migrate billing webhooks", assignee: "Noah Stone", priority: "High", estimate: 8 },
  { id: "TASK-7839", title: "Refresh pricing page copy", assignee: "Leah Levin", priority: "Medium", estimate: 2 },
  { id: "TASK-5562", title: "Add CSV export to reports", assignee: "Eli Hart", priority: "Medium", estimate: 5 },
  { id: "TASK-8686", title: "Fix timezone drift in schedules", assignee: "Iris Lane", priority: "High", estimate: 4 },
  { id: "TASK-1280", title: "Document the public API", assignee: "Theo Wells", priority: "Low", estimate: 6 },
]

const columns: EmsteinUITableColumn<Task>[] = [
  { key: "id", label: "Task", type: "shortText", className: "font-mono text-xs" },
  { key: "title", label: "Title", type: "longText" },
  { key: "assignee", label: "Assignee", type: "text" },
  { key: "priority", label: "Priority", type: "status" },
  {
    key: "estimate",
    label: "Estimate",
    type: "number",
    align: "right",
    render: (task) => `${task.estimate}h`,
  },
]

export function TableSelectionDemo() {
  const [selectedRows, setSelectedRows] = React.useState<string[]>(["TASK-7878"])

  return (
    <div className="flex w-full flex-col gap-3">
      <Table
        data={tasks}
        columns={columns}
        getRowId={(task) => task.id}
        selection={{ selectedRows, onSelectedRowsChange: setSelectedRows }}
        className="rounded-lg"
      />
      <p className="text-sm text-muted-foreground">
        {selectedRows.length} of {tasks.length} row(s) selected.
      </p>
    </div>
  )
}
