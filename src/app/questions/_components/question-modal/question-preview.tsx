export const QuestionPreview = ({
  name,
  caseInput,
  question,
  type,
  multipleChoiceOptions,
  topics,
  tags,
  image,
  pdf,
}: {
  name: string
  caseInput: string
  question: string
  type: string
  multipleChoiceOptions: Array<{
    value: string
  }>
  topics: Array<string>
  tags: Array<string>
  image: string
  pdf: string
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-sm'>Preview</h2>
        <div className='flex flex-col gap-4'>
          <div>
            Case
          </div>
          <div>
            {caseInput}
          </div>
          <div>
            Question
          </div>
          <div>
            {question}
          </div>
          <div>Type</div>
          <div>
            {type}
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div>
            Multiple Choice Options
          </div>
          <div>
            {multipleChoiceOptions.map((option) => (
              <div key={option.value}>
                {option.value}
              </div>
            ))}
          </div>
          <div>
            Topics
          </div>
          <div>
            {topics.map((topic) => (
              <div key={topic}>
                {topic}
              </div>
            ))}
          </div>
          <div>
            Tags
          </div>
          <div>{tags.map((tag) => (
            <div key={tag}>
              {tag}
            </div>
          ))}</div>
          <div>
            Image
          </div>
          <div>
            {image}
          </div>
          <div>
            PDF
          </div>
          <div>
            {pdf}
          </div>
        </div>
      </div>
    </div>
  )
}
