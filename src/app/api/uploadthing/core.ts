import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { currentUser } from '@clerk/nextjs/server'

import { db } from '@/server/db'
import { images, pdfs } from '@/server/db/schema'

const f = createUploadthing()

const auth = (req: Request) => ({ id: 'fakeId' }) // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ pdf: { maxFileSize: '8MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload

      const user = await currentUser()
      if (!user) throw new UploadThingError('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.url)

      const res = await db
        .insert(pdfs)
        .values({
          url: file.url,
        })
        .returning({ id: pdfs.id, })

      if (!res[0]) throw new UploadThingError('Failed to save pdf')

      return { id: res[0].id.toString() }
    }),
  imageUploader: f({ image: { maxFileSize: '8MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload

      const user = await currentUser()
      if (!user) throw new UploadThingError('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.url)

      const res = await db
        .insert(images)
        .values({
          url: file.url,
        })
        .returning({ id: images.id, })

      if (!res[0]) throw new UploadThingError('Failed to save image')

      return { id: res[0].id.toString() }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
