'use client'
/*
    Description: The viewer for pdfs. Needs a buffer to render
*/
import React, { FC, useMemo, useEffect } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

type Props = {
  buffer: { data: Buffer }
}

export const dynamic = 'force-dynamic'

const PdfViewer = ({ file }: { file: string }): React.ReactElement => {
  // const memoizedFile = useMemo(() => buffer.data, [buffer.data]) // Depend on buffer.data assuming buffer.data is stable and only changes if actual data changes

  // Memoize the file object to prevent unnecessary re-renders
  // const fileProp = useMemo(() => ({ data: memoizedFile }), [memoizedFile])

  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-12 px-4 py-16'>
      <Document
        file={'CV-20.pdf'}
        onLoadError={(err) =>
          console.error(`Loading error from PDF viewer: ${err}`)
        }
        onLoadStart={() => console.log('Started loading pdf')}
        onLoadSuccess={(pdf) => console.log('Successfully loaded pdf:', pdf)}
      >
        <Page pageIndex={0} />
      </Document>
    </div>
  )
}

export default PdfViewer
