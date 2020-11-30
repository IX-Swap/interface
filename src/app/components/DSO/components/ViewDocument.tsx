import { useEffect, useMemo, useState } from 'react'
import { useRawDocument } from 'hooks/useRawDocument'
import {
  convertBlobToFile,
  createObjectURLFromFile,
  revokeObjectURL
} from 'hooks/utils'

export interface ViewDocumentProps {
  documentId: string
  ownerId: string
  children: (url: string) => JSX.Element
}

export const ViewDocument = (props: ViewDocumentProps) => {
  const { documentId, ownerId, children } = props
  const { data } = useRawDocument({ documentId, ownerId })
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
