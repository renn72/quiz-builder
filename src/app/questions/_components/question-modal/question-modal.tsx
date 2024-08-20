'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CirclePlus } from 'lucide-react'

import { QuestionForm } from './question-form'

export const QuestionModal = () => {
  return (
    <Sheet
    >
      <SheetTrigger asChild>
        <CirclePlus size={28} strokeWidth={2} className='mx-4 text-primary/70 hover:text-primary hover:scale-110' />
      </SheetTrigger>
      <SheetContent
        className='w-[600px] sm:max-w-2xl'
      >
        <SheetHeader>
          <SheetTitle>Create Question</SheetTitle>
        </SheetHeader>
          <QuestionForm />
        <SheetDescription>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
