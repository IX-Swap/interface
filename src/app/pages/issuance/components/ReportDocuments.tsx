import React from 'react'
import { Table, TableBody, TableContainer, TableRow } from '@material-ui/core'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DataroomFile } from 'types/dataroomFile'

const sampleDocument: DataroomFile = {
  _id: '619752bb43bb8622657c5f14',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  originalFileName: 'documentfile1',
  title: 'Document 1',
  type: 'doctype1',
  user: '1233',
  url: 'https://docurl/'
}

export const ReportDocuments = () => {
  const documents = [
    sampleDocument,
    sampleDocument,
    sampleDocument,
    sampleDocument,
    sampleDocument,
    sampleDocument
  ]

  return (
    <TableContainer>
      <Table>
        <DataroomHeader />
        <TableBody>
          {documents.map((document, index) => (
            <TableRow key={index}>
              <DataroomViewRow
                showDivider={false}
                title={document?.title ?? ''}
                document={document}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
