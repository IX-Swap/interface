import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { Separator } from '../../LaunchpadMisc/styled'

import { Asset } from 'state/launchpad/types'
import { KycLightDocPreviewModal } from 'components/KycLightDocPreviewModal'

interface InfoEntry {
  label: React.ReactNode
  value?: React.ReactNode
  file?: Asset
}

interface Props {
  fontSize?: string
  lineHeight?: string
  entry: InfoEntry
  idx?: number
  isLast?: boolean
}

const extractDocType = (docName: any) => docName?.substring(docName.lastIndexOf('.')).split('.')[1]

const downloadFile = async (url: string, name: string, type: string) => {
  const link = document.createElement('a')

  const { data } = (await axios(url, {
    responseType: 'blob',
  })) as any

  const blob = new Blob([data], { type })

  link.download = name
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const isPreview = (docName?: string) => {
  const docType = extractDocType(docName)

  return !['docx', 'doc'].includes(docType)
}
const isDownload = (docName: string) => {
  const docType = extractDocType(docName)

  return ['docx', 'doc'].includes(docType)
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

  const handlePreviewClick = (file?: Asset) => {
    if (!file) {
      return
    }
    if (isPreview(file.name)) {
      openModal()
    }

    if (isDownload(file.name)) {
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
        {props.entry?.value && <Value onClick={() => handlePreviewClick(props.entry?.file)}>{props.entry.value}</Value>}
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

  cursor: pointer;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`
