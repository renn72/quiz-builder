'use client'
import { Button } from '@/components/ui/button'

import { api } from '@/trpc/react'

const input = {
  name: 'Test3',
  case: 'A new case 2',
  question: 'A very long question 2',
  type: 'AKT',
  topics: [{ id: 2 }],
  multipleChoiceOptions: [
    'an option',
    'another option',
    'yet another option',
    'and another one',
  ],
  tags: [{ id: 3 }, { id: 4 }],
  images: [],
  pdfs: [],
}

const Page = () => {
  const ctx = api.useUtils()
  const { mutate: createQuestion } = api.question.createQuestion.useMutation({
    onSettled: () => {
      void ctx.question.getAllQuestions.refetch()
    },
  })

  const { data: questions, isLoading: isLoadingQuestions } = api.question.getAllQuestions.useQuery()

  const handleCreateQuestion = () => {
    createQuestion(input)
  }

  if (isLoadingQuestions) return null
  console.log(questions)
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Questions</h1>
      <div className="flex flex-col gap-4">
        {questions?.map((question) => (
          <div key={question.id} className="flex gap-2">
            <h2>{question.name}</h2>
            <p>{question.question}</p>
          </div>
        ))}
      </div>
      <Button onClick={handleCreateQuestion}>Create Question</Button>
    </div>
  )
}

export default Page
