'use client'
import { Button } from '@/components/ui/button'

import { api } from '@/trpc/react'

const input = {
  name: 'Test',
  case: 'Test',
  question: 'Test',
  type: 'AKT',
  topics: [{ id: 1 }],
  multipleChoiceOptions: [
    'an option',
    'another option',
    'yet another option',
    'and another one',
  ],
  tags: [{ id: 1 }, { id: 2 }],
  images: [],
  pdfs: [],
}

const Page = () => {
  const { mutate: createQuestion } = api.question.createQuestion.useMutation()

  const handleCreateQuestion = () => {
    createQuestion(input)
  }
  return (
    <div>
      <h1>Questions</h1>
      <Button onClick={handleCreateQuestion}>Create Question</Button>
    </div>
  )
}

export default Page
