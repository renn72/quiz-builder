'use client'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  case: z.string(),
  question: z.string(),
  type: z.string(),
  multipleChoiceOptions: z.array(z.string()).optional(),
  topics: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  pdfs: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
})

export const QuestionForm = () => {
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
      multipleChoiceOptions: [],
    },
  })

  const formTopics = form.watch('topics')


  const tags = tagsQuery
    ?.filter((tag) => formTopics?.includes(tag.topicId?.toString() || ''))
    .map((tag) => ({
      value: tag.id.toString(),
      label: tag.name || '',
    }))

  console.log(topics, tagsQuery, formTopics, tags)
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  if (isLoadingTopics || isLoadingTags) return null
  return (
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
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
