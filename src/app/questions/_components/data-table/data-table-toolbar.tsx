'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { QuestionModal } from '../question-modal/question-modal'

import { api } from '@/trpc/react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const { data: topics, isLoading: isLoadingTopics } =
    api.topic.getAll.useQuery()

  const { data: tags, isLoading: isLoadingTags } =
    api.tag.getAll.useQuery()

  if (isLoadingTopics || isLoadingTags) return null

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter questions...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('topics') && (
          <DataTableFacetedFilter
            column={table.getColumn('topics')}
            title='Topics'
            options={topics?.map((topic) => topic.name ?? '')}
          />
        )}
        {table.getColumn('tags') && (
          <DataTableFacetedFilter
            column={table.getColumn('tags')}
            title='Tags'
            options={tags?.map((tag) => tag.name ?? '')}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
      <QuestionModal />
    </div>
  )
}
