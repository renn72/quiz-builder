'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { labels, priorities, statuses } from './data'
// import { Task } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { GetQuestion } from '@/lib/types'

export const columns: ColumnDef<GetQuestion>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='id'
      />
    ),
    cell: ({ row }) => <div className='w-min'>{row.getValue('id')}</div>,
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Name'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'case',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Case'
      />
    ),
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
        <div className='flex w-[200px] items-center truncate'>
          {row.getValue('case')}
        </div>
          </HoverCardTrigger>
          <HoverCardContent className='w-min'>
            <div className='flex w-[200px] items-center'>
              {row.getValue('case')}
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'question',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Question'
      />
    ),
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
        <div className='flex w-[200px] items-center truncate'>
          {row.getValue('question')}
        </div>
          </HoverCardTrigger>
          <HoverCardContent className='w-min'>
            <div className='flex w-[200px] items-center'>
              {row.getValue('question')}
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Type'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-min items-center truncate'>
          {row.getValue('type')}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'topics',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Topics'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[250px] items-center flex-wrap gap-1'>
          {row.original?.topics.map((topic,) => (
            <Badge key={topic.id} className=''>
              {topic.topic?.name}
            </Badge>
          ))}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Tags'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[250px] items-center flex-wrap gap-1'>
          {row.original?.tags.map((tag,) => (
            <Badge key={tag.id} className=''>
              {tag.tag?.name}
            </Badge>
          ))}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
