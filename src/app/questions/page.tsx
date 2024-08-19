'use client'
import { Button } from '@/components/ui/button'

import { api } from '@/trpc/react'

const input = {
  name: 'Test',
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

const topics = [
  { name: 'Cardiology' },
  { name: 'Neurology' },
  { name: 'Oncology' },
  { name: 'Pediatrics' },
  { name: 'Orthopedics' },
  { name: 'Dermatology' },
  { name: 'Gastroenterology' },
  { name: 'Psychiatry' },
  { name: 'Radiology' },
  { name: 'Endocrinology' },
]

const tags = [
  { name: 'Heart Disease', topicId: 1 },
  { name: 'Hypertension', topicId: 1 },
  { name: 'Stroke', topicId: 2 },
  { name: 'Epilepsy', topicId: 2 },
  { name: 'Breast Cancer', topicId: 3 },
  { name: 'Chemotherapy', topicId: 3 },
  { name: 'Childhood Vaccination', topicId: 4 },
  { name: 'Pediatric Asthma', topicId: 4 },
  { name: 'Joint Replacement', topicId: 5 },
  { name: 'Fracture Treatment', topicId: 5 },
  { name: 'Acne', topicId: 6 },
  { name: 'Psoriasis', topicId: 6 },
  { name: 'Irritable Bowel Syndrome', topicId: 7 },
  { name: 'Liver Disease', topicId: 7 },
  { name: 'Depression', topicId: 8 },
  { name: 'Anxiety Disorders', topicId: 8 },
  { name: 'X-ray Imaging', topicId: 9 },
  { name: 'MRI Scans', topicId: 9 },
  { name: 'Diabetes Management', topicId: 10 },
  { name: 'Thyroid Disorders', topicId: 10 },
]
const Page = () => {
  const ctx = api.useUtils()
  const { mutate: createQuestion } = api.question.createQuestion.useMutation({
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
    createManyTopics(topics)
  }

  const handleCreateTag = () => {
    createManyTags(tags)
  }

  const handleCreateQuestion = () => {
    createQuestion(input)
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
      <Button onClick={handleCreateQuestion}>Create Question</Button>
      <Button onClick={handleCreateTopic}>Create Topic</Button>
      <Button onClick={handleCreateTag}>Create Tag</Button>
    </div>
  )
}

export default Page
