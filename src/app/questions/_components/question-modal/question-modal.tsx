'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CirclePlus } from 'lucide-react'

import { QuestionForm } from './question-form'

export const QuestionModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CirclePlus
          size={28}
          strokeWidth={2}
          className='mx-4 text-primary/70 hover:scale-110 hover:text-primary'
        />
      </DialogTrigger>
      <DialogContent className='w-[600px] sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
        </DialogHeader>
        <QuestionForm />
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
