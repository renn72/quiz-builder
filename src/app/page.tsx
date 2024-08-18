'use client'
import { useState } from 'react'
import Link from 'next/link'

import { api } from '@/trpc/react'

import { SelectComponent } from '@/components/ui/select-component'

const jobTypeList = [
  { value: 'Full Time', label: 'Full Time' },
  { value: 'Part Time', label: 'Part Time' },
  { value: 'Intern', label: 'Intern' },
  { value: 'Temporary', label: 'Temporary' },
  { value: 'Contractor', label: 'Contractor' },
  { value: 'Volunteer', label: 'Volunteer' },
  { value: 'Freelance', label: 'Freelance' },
]

export default function Home() {
  const [field, setField] = useState(null)
  console.log(field)
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16'>
        <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
          Create <span className='text-[hsl(280,100%,70%)]'>T3</span> App
        </h1>
        <div className='w-full'>
          <SelectComponent
            createAble={true}
            isMulti={true}
            value={field}
            options={jobTypeList}
            onChange={setField}
            placeholder='Select Job Type'
          />
        </div>
      </div>
    </main>
  )
}
