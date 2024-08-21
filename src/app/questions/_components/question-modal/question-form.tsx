'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { SelectBox } from '@/components/ui/select-box'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { UploadButton } from '@/app/_components/upload-button'
import { PlusIcon, XIcon } from 'lucide-react'

import { QuestionPreview } from './question-preview'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  case: z.string(),
  question: z.string(),
  type: z.string(),
  multipleChoiceOptions: z.array(z.object({ value: z.string() })),
  topics: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  pdf: z.string().optional(),
  image: z.string().optional(),
})

export const QuestionForm = () => {
  const [image, setImage] = useState<string | null>(null)
  const [pdf, setPdf] = useState<string | null>(null)
  const { data: topics, isLoading: isLoadingTopics } =
    api.topic.getAll.useQuery()
  const { data: tagsQuery, isLoading: isLoadingTags } =
    api.tag.getAll.useQuery()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      case: '',
      question: '',
      type: 'AKT',
      multipleChoiceOptions: [{ value: '' }],
    },
  })

  const formName = form.watch('name')
  const formCase = form.watch('case')
  const formQuestion = form.watch('question')
  const formTopics = form.watch('topics')
  const formTags = form.watch('tags')
  const formType = form.watch('type')
  const multi = form.watch('multipleChoiceOptions')
  const formPdf = form.watch('pdf')
  const formImage = form.watch('image')

  const multiFieldArray = useFieldArray({
    control: form.control,
    name: 'multipleChoiceOptions',
  })
  console.log('multi', multi)

  const tags = tagsQuery
    ?.filter((tag) => formTopics?.includes(tag.topicId?.toString() || ''))
    .map((tag) => ({
      value: tag.id.toString(),
      label: tag.name || '',
    }))

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  if (isLoadingTopics || isLoadingTags) return null
  return (
    <div className='grid grid-cols-2 gap-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='case'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Case</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='case'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='question'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='question'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='AKT'>AKT</SelectItem>
                    <SelectItem value='KFP'>KFP</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div
            className={cn(
              'flex flex-col gap-2',
              formType === 'AKT' ? '' : 'hidden',
            )}
          >
            <h2 className='text-sm'>Multiple Choice Options</h2>
            {multiFieldArray.fields.map((field, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`multipleChoiceOptions.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex items-center gap-4'>
                        <h3 className='text-sm font-medium text-muted-foreground'>
                          {index + 1}
                        </h3>
                        <Input
                          placeholder='option'
                          {...field}
                        />
                        <XIcon
                          className='h-4 w-4 text-primary/70 hover:scale-110 hover:text-primary'
                          onClick={() => multiFieldArray.remove(index)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className='flex w-full justify-center'>
              <PlusIcon
                onClick={() => multiFieldArray.append({ value: '' })}
                className='h-6 w-6 text-primary/70 hover:scale-110 hover:text-primary'
              />
            </div>
          </div>
          {topics && topics.length > 0 && (
            <FormField
              control={form.control}
              name='topics'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topics</FormLabel>
                  <FormControl>
                    <SelectBox
                      options={topics.map((topic) => ({
                        value: topic.id.toString(),
                        label: topic.name || '',
                      }))}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='add topics'
                      inputPlaceholder='Search topics'
                      emptyPlaceholder='No number found.'
                      multiple
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {tags && tags.length > 0 && (
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <SelectBox
                      options={tags}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='add tags'
                      inputPlaceholder='Search tags'
                      emptyPlaceholder='No number found.'
                      multiple
                      isDisabled={
                        formTopics && formTopics?.length > 0 ? false : true
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-8'>
                    {image ? (
                      <span className='h-10 w-full flex-grow rounded-md border border-gray-700 p-2'>
                        {image}
                      </span>
                    ) : (
                      <>
                        <span className='h-10 w-full flex-grow rounded-md border border-gray-700 p-2'>
                          {image}
                        </span>
                        <UploadButton
                          endpoint='imageUploader'
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            const r = res[0]
                            console.log('Files: ', res)
                            console.log(r)
                            if (!r) return
                            setImage(r.name)
                            form.setValue('image', r.serverData.id)
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`)
                          }}
                        />
                      </>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='pdf'
            render={({ field }) => (
              <FormItem>
                <FormLabel>PDF</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-8'>
                    {pdf ? (
                      <span className='h-10 w-full flex-grow rounded-md border border-gray-700 p-2'>
                        {pdf}
                      </span>
                    ) : (
                      <>
                        <span className='h-10 w-full flex-grow rounded-md border border-gray-700 p-2'>
                          {pdf}
                        </span>
                        <UploadButton
                          endpoint='pdfUploader'
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            const r = res[0]
                            console.log('Files: ', res)
                            console.log(r)
                            if (!r) return
                            setPdf(r.name)
                            form.setValue('pdf', r.serverData.id)
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`)
                          }}
                        />
                      </>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
      <QuestionPreview
        name={formName}
        caseInput={formCase}
        question={formQuestion}
        type={formType}
        multipleChoiceOptions={multi}
        topics={formTopics || []}
        tags={formTags || []}
        pdf={formPdf || ''}
        image={formImage || ''}
      />
    </div>
  )
}
