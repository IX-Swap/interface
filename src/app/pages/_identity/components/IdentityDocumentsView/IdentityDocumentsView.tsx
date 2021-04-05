import React from 'react'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { Table, TableBody, TableContainer, TableRow } from '@material-ui/core'
import { DataroomFile } from 'types/dataroomFile'
import { IdentityType } from 'app/pages/identity/utils'

export interface DocumentsViewProps {
  data: DataroomFile[]
  type?: IdentityType
}

export const IdentityDocumentsView = (props: DocumentsViewProps) => {
  const { data: documents } = props

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
