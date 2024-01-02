import React, { useState } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'
import dayjs from 'dayjs'
import axios from 'axios'

import pdfIcon from 'assets/images/pdf.svg'
import { EllipsisText, MEDIA_WIDTHS } from 'theme'
import { Document } from 'state/admin/actions'
import { KycDocPreviewModal } from 'components/KycDocPreviewModal'

const headerCells = [t`File`, t`Type`, t`Uploaded At`]

const formattedTypes = {
  identity: t`Proof of Identity`,
  address: t`Proof of Address`,
  selfie: t`Selfie`,
  accreditation: t`Evidence of Accreditation`,
  financial: t`Additional Documents`,
  authorization: t`Proof of Address`,
  authorizationIdentity: t`Proof of Identity`,
  corporate: t`Corporate documents`,
} as Record<string, string>

interface Props {
  documents: Array<Document>
  title?: string
  kycKey: any
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

export const Documents = ({ documents, title, kycKey }: Props) => {
  {
    return (
      <Container>
        {title && <Title>{t`${title}`}</Title>}
        <Table>
          <Body documents={documents} kycKey={kycKey}/>
        </Table>
      </Container>
    )
  }
}

const Row = ({
  file: {
    type,
    id,
    asset: { name, public: publicUrl, mimeType },
    createdAt,
  },
  isFirstRow,
  setPreviewModal,
  kycKey
}: {
  file: Document
  isFirstRow: boolean
  setPreviewModal: (value: boolean) => void
  kycKey: any
}) => {
  const openModal = () => {
    setPreviewModal(true)
  }

  const handleRowClick = (url: string, name: string, mimeType: string) => {
    const docType = extractDocType(name)
    if (['docx', 'doc'].includes(docType)) {
      downloadFile(url, name, mimeType)
    } else {
      openModal()
    }
  }

  return (
    <BodyRow key={id} gridColNo={kycKey === 'corporate' ? 2 : 3} onClick={() => handleRowClick(publicUrl, name, mimeType)}>
      <div>
        {isFirstRow && <ColumnHeader>{headerCells[0]}</ColumnHeader>}
        <FileName>
          <img src={pdfIcon} alt="pdfIcon" />
          <EllipsisText>{name}</EllipsisText>
        </FileName>
      </div>
      {kycKey === 'individual' && <div>
        {isFirstRow && <ColumnHeader>{headerCells[1]}</ColumnHeader>}

        {formattedTypes[type] || type}
      </div>}
      <div>
        {isFirstRow && <ColumnHeader>{headerCells[2]}</ColumnHeader>}
        {dayjs(createdAt).format('MMM D, YYYY hh:mm:ss A')}
      </div>
    </BodyRow>
  )
}

const Body = ({ documents, kycKey }: Omit<Props, 'title'>) => {
  const [openPreviewModal, setPreviewModal] = useState(false)

  const filteredDocs = documents?.filter((doc: any) => {
    const docName = doc?.asset?.name
    const docType = extractDocType(docName)

    return !['docx', 'doc'].includes(docType) && doc
  })

  const closeModal = () => {
    setPreviewModal(false)
  }

  return (
    <>
      {openPreviewModal && (
        <KycDocPreviewModal isOpen onClose={closeModal} data={filteredDocs} downloadFile={downloadFile} />
      )}

      {documents?.map((item, index) => {
        return <Row key={`kyc-table-${item.id}`} file={item} isFirstRow={!index} setPreviewModal={setPreviewModal} kycKey={kycKey}/>
      })}
    </>
  )
}

const FileName = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  overflow: hidden;
`

const Container = styled.div`
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    // display: inline-block;
    // width: 100%;
  }
`

const Table = styled.div`
  display: grid;
  row-gap: 40px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: inline-block;
    // width: 100%;
    // row-gap: 40px;
    column-gap: 10px;
  }
`

const Title = styled.div`
  color: ${({ theme: { text2 } }) => text2};
  margin-bottom: 10px;
`

const ColumnHeader = styled.div`
  margin-bottom: 13px;
  font-size: 13px;
  color: ${({ theme: { text11 } }) => `${text11}`};
`

const BodyRow = styled.a<{ gridColNo?: number }>`
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme: { text1 } }) => text1};
  display: grid;
  grid-template-columns: repeat(${({ gridColNo }) => (gridColNo ? gridColNo : '3')}, 1fr);
  column-gap: 200px;
  font-size: 13px;
  overflow: auto;
  > div {
    display: grid;
    white-space: nowrap;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    column-gap: 11px;
    font-size: 10px;
    margin-bottom: 10px;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    column-gap: 11px;
    font-size: 10px;
    margin-bottom: 10px;
  }
`
