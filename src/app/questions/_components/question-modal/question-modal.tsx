'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CirclePlus } from 'lucide-react'

import { QuestionForm } from './question-form'

export const QuestionModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CirclePlus size={28} strokeWidth={2} className='mx-4 text-primary/70 hover:text-primary hover:scale-110' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
            aspernatur, doloremque, voluptate, quisquam, consequuntur, ipsam
            voluptatibus, voluptas, quis, dolorem, facere, asperiores
            exercitationem.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <QuestionForm />
        </DialogContent>
      </DialogContent>
    </Dialog>
  )
}

