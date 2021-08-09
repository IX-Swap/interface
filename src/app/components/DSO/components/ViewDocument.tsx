import { useEffect, useMemo, useState } from 'react'
import { useRawDocument } from 'hooks/useRawDocument'
import {
  convertBlobToFile,
  createObjectURLFromFile,
  revokeObjectURL
} from 'hooks/utils'

export interface ViewDocumentProps {
  documentId: string
  ownerId?: string
  type?: 'document' | 'banner'
  children: (url: string) => JSX.Element
  getDataFunction?: any
}

export const ViewDocument = (props: ViewDocumentProps) => {
  const {
    documentId,
    ownerId = '',
    children,
    type = 'document',
    getDataFunction = useRawDocument
  } = props
  const { data } = getDataFunction(
    type === 'banner' ? documentId : { documentId, ownerId }
  )
  const blob = useMemo(() => data?.data ?? new Blob(), [data])
  const [file, setFile] = useState<string>('')

  useEffect(() => {
    if (data !== undefined) {
      setFile(createObjectURLFromFile(convertBlobToFile(blob, '')))
    }

    return () => {
      revokeObjectURL(file)
    }
  }, [blob]) // eslint-disable-line

  return children(file)
}
