import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { t, Trans } from '@lingui/macro'

import { Document } from 'state/admin/actions'
import { KycDocPreviewModal } from 'components/KycDocPreviewModal'

import { ButtonGradient } from 'components/Button'
import { ReactComponent as PdfImage } from 'assets/images/pdf.svg'

interface Props {
  attachments: Array<Document>
  title?: string
}

const extractDocType = (docName: any) => docName.substring(docName.lastIndexOf('.')).split('.')[1]

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

export const Attachments = ({ attachments, title }: Props) => {
  {
    return (
      <Container>
        {title && (
          <Title>
            <Trans>{`${title}`}</Trans>
          </Title>
        )}
        <Table>
          <Body attachments={attachments} />
        </Table>
      </Container>
    )
  }
}

const Body = ({ attachments }: Pick<Props, 'attachments'>) => {
  const [openPreviewModal, setPreviewModal] = useState(false)

  const filteredDocs = attachments.filter((doc: any) => {
    const docName = doc?.asset?.name
    const docType = extractDocType(docName)

    return !['docx', 'doc'].includes(docType) && doc
  })

  const downloadedDocs = attachments.filter((doc: any) => {
    const docName = doc?.asset?.name
    const docType = extractDocType(docName)

    return ['docx', 'doc'].includes(docType) && doc
  })

  const handlePreviewClick = () => {
    if (filteredDocs.length > 0) {
      openModal()
    }

    downloadedDocs.map((item) => {
      const {
        asset: { name, public: publicUrl, mimeType },
      } = item

      downloadFile(publicUrl, name, mimeType)
    })
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
        <KycDocPreviewModal isOpen onClose={closeModal} data={filteredDocs} downloadFile={downloadFile} />
      )}

      {
        <AttachmentsButton onClick={() => handlePreviewClick()} disabled={filteredDocs.length === 0}>
          <Trans>View Files</Trans>
          <PdfIcon />
        </AttachmentsButton>
      }
    </>
  )
}

const Container = styled.div``

const Table = styled.div`
  display: grid;
  row-gap: 40px;
`

const Title = styled.div`
  color: ${({ theme: { text2 } }) => text2};
  margin-bottom: 10px;
`

const AttachmentsButton = styled(ButtonGradient)`
  font-size: 13px;
  line-height: 20px;
  border-radius: 32px;
  padding: 4px 12px;
`

const PdfIcon = styled(PdfImage)`
  width: 20px;
  height: 20px;
  margin-left: 4px;
`
