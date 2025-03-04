import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Document } from 'state/admin/actions'

import { Attachment } from './Attachment'
import { isDownload, isPreview } from 'components/LaunchpadOffer/util/files'
import { File } from 'react-feather'
import { Flex } from 'rebass'
import { getPublicAssetUrl } from 'components/TokenLogo/utils'

interface Props {
  attachments: Array<Document>
}
const extractDocType = (docName: any) => docName.substring(docName.lastIndexOf('.')).split('.')[1]

export const Attachments = ({ attachments }: Props) => {
  const theme = useTheme()

  const filteredDocs = attachments.filter((doc: any) => {
    const docName = doc?.asset?.name
    const docType = extractDocType(docName)

    return !['docx', 'doc'].includes(docType) && doc
  })

  const entries = React.useMemo(
    () =>
      filteredDocs.map(({ asset }) => {
        const isPreviewing = isPreview(asset.name)
        const isDownloading = !isPreviewing && isDownload(asset.name)
        return {
          label: (
            <LabelContainer alignItems="center">
              <File size="18" />
              {asset.name}
            </LabelContainer>
          ),
          file: {
            ...asset,
            publicUrl: getPublicAssetUrl(asset),
          },
          isPreviewing,
          isDownloading,
        }
      }),
    [filteredDocs, theme]
  )

  return (
    <Container flexWrap="wrap">
      {entries.map((entry, idx) => {
        const id = `document-${idx}`
        return <Attachment key={id} idx={idx} entry={entry} isLast />
      })}
    </Container>
  )
}

const Container = styled(Flex)`
  gap: 12px;
`

const LabelContainer = styled(Flex)`
  gap: 8px;
`
