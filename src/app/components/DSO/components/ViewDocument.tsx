import { useEffect, useMemo, useState } from 'react'
import { useRawDocument } from 'hooks/useRawDocument'
import {
  convertBlobToFile,
  createObjectURLFromFile,
  revokeObjectURL
} from 'hooks/utils'
import { useRawBanner } from 'app/pages/admin/hooks/useRawBanner'

export interface ViewDocumentProps {
  documentId: string
  ownerId: string
  isNewThemeOn?: boolean
  children: (url: string) => JSX.Element
}

export const ViewDocument = (props: ViewDocumentProps) => {
  const { documentId, ownerId, children, isNewThemeOn = false } = props
  const { data } = useRawDocument({ documentId, ownerId })
  const { data: dataBanner } = useRawBanner(documentId)
  const finalData = isNewThemeOn ? dataBanner : data
  const blob = useMemo(() => finalData?.data ?? new Blob(), [finalData])
  const [file, setFile] = useState<string>('')

  useEffect(() => {
    if (finalData !== undefined) {
      setFile(createObjectURLFromFile(convertBlobToFile(blob, '')))
    }

    return () => {
      revokeObjectURL(file)
    }
  }, [blob]) // eslint-disable-line

  return children(file)
}
