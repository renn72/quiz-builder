'use client'
import { useState } from 'react'

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
const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <CirclePlus
          size={28}
          strokeWidth={2}
          className='mx-4 text-primary/70 hover:scale-110 hover:text-primary'
        />
      </DialogTrigger>
      <DialogContent className='w-max min-w-[800px] sm:max-w-full'>
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
        </DialogHeader>
        <QuestionForm setIsOpen={setIsOpen} />
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
