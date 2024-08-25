'use client'
import { Button } from '@/components/ui/button'

import { loremIpsum } from 'lorem-ipsum'
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
  const { mutate: deleteAll } = api.question.deleteAll.useMutation()

  const { data: questions, isLoading: isLoadingQuestions } =
    api.question.getAllQuestionsLimited.useQuery({
      limit: 10,
    })

  const handleCreateTopic = () => {
    createManyTopics(testTopics)
  }

  const handleCreateTag = () => {
    createManyTags(testTags)
  }

  const handleDeleteAll = () => {
    deleteAll()
  }

  const handleCreateQuestions = () => {
    const input = Array.from({ length: 2000}, () => ({
      name: loremIpsum({ count: 2, units: 'words' }),
      case: loremIpsum({ count: 30, units: 'words' }),
      question: loremIpsum({ count: 10, units: 'words' }),
      type: 'AKT',
      multipleChoiceOptions: Array.from({ length: 5 }, () => loremIpsum({
        count: 5,
        units: 'words',
      })),
      topics:
        Math.random() > 0.5
          ? [
              { id: Math.floor(Math.random() * 4) + 1 },
              { id: Math.floor(Math.random() * 4) + 5 },
            ]
          : [{ id: Math.floor(Math.random() * 10) + 1 }],
      tags:
        Math.random() > 0.5
          ? [
              { id: Math.floor(Math.random() * 9) + 1 },
              { id: Math.floor(Math.random() * 9) + 10 },
            ]
          : [{ id: Math.floor(Math.random() * 20) + 1 }],
      image: '1',
      pdf: '1',
    }))
    createQuestions(input)
  }

  if (isLoadingQuestions) return null
  return (
    <div className='mb-20 flex flex-col items-center justify-center gap-4 px-4 py-16'>
      <h1 className='text-3xl font-bold'>Questions</h1>
      <div className='flex flex-col gap-4'>
        {questions ? <DataTable questions={questions} /> : null}
      </div>
      <div className='flex hidden  gap-4'>
        <Button onClick={handleCreateQuestions}>Create Questions</Button>
        <Button onClick={handleCreateTopic}>Create Topics</Button>
        <Button onClick={handleCreateTag}>Create Tags</Button>
        <Button onClick={handleDeleteAll}>Delete All</Button>
      </div>
    </div>
  )
}

export default Page
