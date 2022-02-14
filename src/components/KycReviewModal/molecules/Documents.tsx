import React from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'
import dayjs from 'dayjs'

import pdfIcon from 'assets/images/pdf.svg'
import { MEDIA_WIDTHS } from 'theme'

const headerCells = [t`File`, t`Type`, t`Uploaded At`]

interface File {
  fileName: string
  type: string
  createdAt: string
}

interface Props {
  documents: Array<File>
  title?: string
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

const Row = ({ file: { type, fileName, createdAt }, isFirstRow }: { file: File; isFirstRow: boolean }) => {
  return (
    <BodyRow key={fileName}>
      <div>
        {isFirstRow && <ColumnHeader>{headerCells[0]}</ColumnHeader>}
        <FileName>
          <img src={pdfIcon} alt="pdfIcon" />
          {fileName}
        </FileName>
      </div>
      <div>
        {isFirstRow && <ColumnHeader>{headerCells[1]}</ColumnHeader>}

        {type}
      </div>
      <div>
        {isFirstRow && <ColumnHeader>{headerCells[2]}</ColumnHeader>}
        {dayjs(createdAt).format('MMM D, YYYY hh:mm:ss A')}
      </div>
    </BodyRow>
  )
}

const Body = ({ documents }: Pick<Props, 'documents'>) => {
  return (
    <>
      {documents.map((item, index) => {
        return <Row key={`kyc-table-${item.fileName}`} file={item} isFirstRow={!index} />
      })}
    </>
  )
}

const FileName = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
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

const BodyRow = styled.div`
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
