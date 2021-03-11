import React from 'react'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { Table, TableBody, TableContainer, TableRow } from '@material-ui/core'
import { formatDocuments } from 'app/pages/identity/const/documents'
import { IdentityType } from 'app/pages/identity/utils'
import {
  CorporateIdentity,
  IndividualIdentity
} from '../../../../types/identity'

export interface DocumentsViewProps {
  data: IndividualIdentity | CorporateIdentity
  type: IdentityType
}

export const IdentityDocumentsView = (props: DocumentsViewProps) => {
  const {
    data: { documents },
    type
  } = props
  const formattedDocuments = formatDocuments(documents, type)

  return (
    <TableContainer>
      <Table>
        <DataroomHeader />
        <TableBody>
          {formattedDocuments.map(({ value: document }, index) => (
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
