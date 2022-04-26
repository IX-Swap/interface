import React from 'react'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { Table, TableBody, TableContainer, TableRow } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { IdentityType } from 'app/pages/identity/utils/shared'

export interface DocumentsViewProps {
  data: DataroomFile[]
  type?: IdentityType
}

export const DocumentsView = (props: DocumentsViewProps) => {
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
