'use client'
import { Button } from '@/components/ui/button'

import { api } from '@/trpc/react'
import { testQuestions, testTopics, testTags } from '@/lib/store'
import DataTable from './_components/data-table/data-table'

export const dynamic = 'force-dynamic'

const Page = () => {
  const ctx = api.useUtils()
  const { mutate: createQuestions } =
    api.question.createManyQuestions.useMutation({
      onSettled: () => {
        void ctx.question.getAllQuestions.refetch()
      },
    })

  const { mutate: createManyTopics } =
    api.question.createManyTopics.useMutation()
  const { mutate: createManyTags } = api.question.createManyTags.useMutation()

  const { data: questions, isLoading: isLoadingQuestions } =
    api.question.getAllQuestions.useQuery()

  const handleCreateTopic = () => {
    createManyTopics(testTopics)
  }

  const handleCreateTag = () => {
    createManyTags(testTags)
  }

  const handleCreateQuestions = () => {
    const input = testQuestions.map((question) => ({
      ...question,
      type: 'AKT',
    }))
    createQuestions(input)
  }

  if (isLoadingQuestions) return null
  return (
    <div className='flex flex-col items-center justify-center gap-4 mb-20 px-4 py-16'>
      <h1 className='text-3xl font-bold'>Questions</h1>
      <div className='flex flex-col gap-4'>
        {questions ? <DataTable questions={questions} /> : null}
      </div>
      <div className='flex gap-4 hidden'>
        <Button onClick={handleCreateQuestions}>Create Questions</Button>
        <Button onClick={handleCreateTopic}>Create Topics</Button>
        <Button onClick={handleCreateTag}>Create Tags</Button>
      </div>
    </div>
  )
}

export default Page
