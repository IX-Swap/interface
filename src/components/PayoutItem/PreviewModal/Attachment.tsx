import React from 'react'
import styled from 'styled-components'

import { KycLightDocPreviewModal } from 'components/KycLightDocPreviewModal'
import { InfoEntry } from 'components/LaunchpadOffer/util/InfoList'
import { downloadFile, downloadLocalFile, extractDocType, isDownload, isPreview } from 'components/LaunchpadOffer/util/files'

interface Props {
  fontSize?: string
  lineHeight?: string
  entry: InfoEntry
  idx?: number
  isLast?: boolean
}

export const Attachment: React.FC<Props> = (props) => {
  const [openPreviewModal, setPreviewModal] = React.useState(false)

  const filteredDocs = [props.entry].map((doc: any) => {
    const docName = doc?.file?.name
    const docType = extractDocType(docName)

    if (!['docx', 'doc'].includes(docType) && doc?.file) {
      return { asset: doc.file }
    }
  })

  const handlePreviewClick = ({ file, hasAsset, isPreviewing, isDownloading }: any) => {
    if (!file) {
      return
    }
    if (hasAsset === false) {
      downloadLocalFile(file)
    } else if (isPreviewing || isPreview(file.name)) {
      openModal()
    } else if (isDownloading || isDownload(file.name)) {
      const { name, public: publicUrl, mimeType } = file
      downloadFile(publicUrl, name, mimeType)
    }
  }

  const openModal = () => {
    setPreviewModal(true)
  }

  const closeModal = () => {
    setPreviewModal(false)
  }

  return (
    <>
      {openPreviewModal && (
        <KycLightDocPreviewModal isOpen onClose={closeModal} data={filteredDocs} downloadFile={downloadFile} />
      )}

      <Entry
        key={`entry-${props.idx}`}
        fontSize={props.fontSize}
        lineHeight={props.lineHeight}
        onClick={() => handlePreviewClick(props.entry)}
      >
        <Label>{props.entry?.label}</Label>
      </Entry>
    </>
  )
}

interface TextProps {
  fontSize?: string
  lineHeight?: string
}

const Entry = styled.div<TextProps>`
  display: flex;
  border: 1px solid ${({theme}) => theme.bg24};
  border-radius: 8px;
  background: ${({theme}) => theme.bg7};
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  cursor: pointer;
`

const Label = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: ${({theme}) => theme.text5};
`
