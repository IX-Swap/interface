import React from 'react'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { Table, TableBody, TableContainer, TableRow } from '@material-ui/core'
import { DataroomFile } from 'types/dataroomFile'
import { formatDocuments } from 'app/pages/identity/const/documents'
import { IdentityType } from 'app/pages/identity/utils'

export interface DocumentsViewProps {
  data: DataroomFile[]
  type: IdentityType
}

export const IdentityDocumentsView = (props: DocumentsViewProps) => {
  const { data: documents, type } = props
  const formattedDocuments = formatDocuments(documents, type)

  return (
    <TableContainer>
      <Table>
        <DataroomHeader />
        <TableBody>
          {formattedDocuments.map(({ value: document }, index) => (
            <TableRow key={index}>
              <DataroomViewRow
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
