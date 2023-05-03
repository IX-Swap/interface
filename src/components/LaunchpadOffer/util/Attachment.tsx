import React from 'react'
import styled from 'styled-components'

import { Separator } from '../../LaunchpadMisc/styled'
import { KycLightDocPreviewModal } from 'components/KycLightDocPreviewModal'
import { InfoEntry } from './InfoList'
import { downloadFile, downloadLocalFile, extractDocType, isDownload, isPreview } from './files'

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

      <Entry key={`entry-${props.idx}`} fontSize={props.fontSize} lineHeight={props.lineHeight}>
        <Label>{props.entry?.label}</Label>
        {props.entry?.value && <Value onClick={() => handlePreviewClick(props.entry)}>{props.entry.value}</Value>}
      </Entry>

      {!props.isLast && <Separator key={`separator-${props.idx}`} />}
    </>
  )
}

interface TextProps {
  fontSize?: string
  lineHeight?: string
}

const Entry = styled.div<TextProps>`
  display: flex;

  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  max-width: 100%;
  contain: content;

  font-style: normal;
  font-size: ${(props) => props.fontSize ?? '14px'};

  line-height: ${(props) => props.lineHeight ?? '40px'};
  letter-spacing: -0.02em;
`

const Label = styled.div`
  font-weight: 400;

  color: ${(props) => props.theme.launchpad.colors.text.body};
`
const Value = styled.div`
  font-weight: 600;
  text-align: right;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`
