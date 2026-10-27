"use client"

import { Table, type EmsteinUITableColumn } from "@/components/emstein-ui/table"
import { cn } from "@/lib/utils"

type Member = {
  id: string
  name: string
  email: string
  role: string
  team: string
  status: "Active" | "Invited" | "Suspended"
  lastActive: string
  projects: number
}

const firstNames = ["Ari", "Maya", "Noah", "Leah", "Eli", "Nina", "Sam", "Iris", "Theo", "Zoe"]
const lastNames = ["Cohen", "Reed", "Stone", "Levin", "Hart", "Brooks", "Shaw", "Lane", "Wells", "Fox"]
const roles = ["Designer", "Engineer", "Manager", "Analyst", "Researcher"]
const teams = ["Support", "Product", "Data", "Growth", "Platform"]

const members: Member[] = Array.from({ length: 1000 }, (_, index) => {
  const first = firstNames[index % firstNames.length]
  const last = lastNames[Math.floor(index / firstNames.length) % lastNames.length]

  return {
    id: `USR-${String(index + 1).padStart(4, "0")}`,
    name: `${first} ${last}`,
    email: `${first}.${last}${index + 1}@example.com`.toLowerCase(),
    role: roles[(index * 3) % roles.length],
    team: teams[(index * 7) % teams.length],
    status: index % 9 === 0 ? "Suspended" : index % 4 === 0 ? "Invited" : "Active",
    lastActive: `2026-${String((index % 9) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
    projects: (index * 13) % 24,
  }
})

const statusDot: Record<Member["status"], string> = {
  Active: "bg-emerald-500",
  Invited: "bg-amber-500",
  Suspended: "bg-muted-foreground/40",
}

const columns: EmsteinUITableColumn<Member>[] = [
  {
    key: "name",
    label: "Member",
    type: "longText",
    render: (member) => (
      <span className="flex min-w-0 flex-col leading-5">
        <span className="truncate font-medium">{member.name}</span>
        <span className="truncate text-xs text-muted-foreground">{member.email}</span>
      </span>
    ),
  },
  {
    key: "id",
    label: "ID",
    type: "shortText",
    className: "font-mono text-xs text-muted-foreground",
  },
  { key: "role", label: "Role", type: "shortText" },
  { key: "team", label: "Team", type: "shortText" },
  {
    key: "status",
    label: "Status",
    type: "status",
    render: (member) => (
      <span className="inline-flex items-center gap-2">
        <span className={cn("size-1.5 rounded-full", statusDot[member.status])} />
        {member.status}
      </span>
    ),
  },
  { key: "lastActive", label: "Last active", type: "date" },
  { key: "projects", label: "Projects", type: "number", align: "right" },
]

export function TableDemo() {
  return (
    <Table
      data={members}
      columns={columns}
      getRowId={(member) => member.id}
      selection={{}}
      scrollMode="table"
      tableHeight={420}
      className="rounded-lg"
    />
  )
}
