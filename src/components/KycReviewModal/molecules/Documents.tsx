import React, { useState, useMemo } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'
import dayjs from 'dayjs'

import pdfIcon from 'assets/images/pdf.svg'
import { EllipsisText, MEDIA_WIDTHS } from 'theme'
import { Document } from 'state/admin/actions'
import { KycDocPreviewModal } from 'components/KycDocPreviewModal'

const headerCells = [t`File`, t`Type`, t`Uploaded At`]

const formattedTypes = {
  identity: t`Proof of Identity`,
  address: t`Proof of Address`,
  financial: t`Financial Documents`,
  authorization: t`Authorization document`,
  corporate: t`Corporate documents`,
} as Record<string, string>

interface Props {
  documents: Array<Document>
  title?: string
}

const extractDocType = (docName: any) => docName.substring(docName.lastIndexOf(".")).split('.')[1]

const downloadFile = (url: string, name: string) => {
  const link = document.createElement('a')
  link.download = name
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const Documents = ({ documents, title }: Props) => {
  {
    return (
      <Container>
        {title && <Title>{t`${title}`}</Title>}
        <Table>
          <Body documents={documents} />
        </Table>
      </Container>
    )
  }
}

const Row = ({
  file: {
    type,
    id,
    asset: { name, public: publicUrl },
    createdAt,
  },
  isFirstRow,
  setPreviewModal
}: any) => {

  const openModal = () => {
    setPreviewModal(true)
  }

  const handleRowClick = (url: string, name: string) => {
    const docType = extractDocType(name)
    if (['docx', 'doc'].includes(docType)) {
      downloadFile(url, name)
    } else {
      openModal()
    }
  }

  return (
    <BodyRow key={id} onClick={() => handleRowClick(publicUrl, name)}>
      <div>
        {isFirstRow && <ColumnHeader>{headerCells[0]}</ColumnHeader>}
        <FileName >
          <img src={pdfIcon} alt="pdfIcon" />
          <EllipsisText>{name}</EllipsisText>
        </FileName>
      </div>
      <div>
        {isFirstRow && <ColumnHeader>{headerCells[1]}</ColumnHeader>}

        {formattedTypes[type] || type}
      </div>
      <div>
        {isFirstRow && <ColumnHeader>{headerCells[2]}</ColumnHeader>}
        {dayjs(createdAt).format('MMM D, YYYY hh:mm:ss A')}
      </div>
    </BodyRow>
  )
}

const Body = ({ documents }: Pick<Props, 'documents'>) => {
  const [openPreviewModal, setPreviewModal] = useState(false)

  const filteredDocs = documents.filter((doc: any) => {
    const docName =  doc?.asset?.name;
    const docType = extractDocType(docName)

    return !['docx', 'doc'].includes(docType) && doc
  })

  const closeModal = () => {
    setPreviewModal(false)
  }

  return (
    <>
      {openPreviewModal && <KycDocPreviewModal isOpen onClose={closeModal} data={filteredDocs} downloadFile={downloadFile} />}

      {documents.map((item, index) => {
        return <Row key={`kyc-table-${item.id}`} file={item} isFirstRow={!index} setPreviewModal={setPreviewModal} />
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

const Container = styled.div``

const Table = styled.div`
  display: grid;
  row-gap: 40px;
`

const Title = styled.div`
  color: ${({ theme: { text2 } }) => text2};
  margin-bottom: 10px;
`

const ColumnHeader = styled.div`
  margin-bottom: 13px;
  font-size: 12px;
  color: ${({ theme: { text2 } }) => `${text2}50`};
`

const BodyRow = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme: { white } }) => white};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 121px;
  overflow: auto;
  > div {
    display: grid;
    white-space: nowrap;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    column-gap: 32px;
  }
`
