'use client'
import { Button } from '@/components/ui/button'

import { api } from '@/trpc/react'
import { testQuestions, testTopics, testTags } from '@/lib/store'

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
    createQuestions(testQuestions)
  }

  if (isLoadingQuestions) return null
  console.log(questions)
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1>Questions</h1>
      <div className='flex flex-col gap-4'>
        {questions?.map((question) => (
          <div
            key={question.id}
            className='flex gap-2'
          >
            <h2>{question.name}</h2>
            <p>{question.question}</p>
          </div>
        ))}
      </div>
      <Button onClick={handleCreateQuestions}>Create Questions</Button>
      <Button onClick={handleCreateTopic}>Create Topics</Button>
      <Button onClick={handleCreateTag}>Create Tags</Button>
    </div>
  )
}

export default Page
