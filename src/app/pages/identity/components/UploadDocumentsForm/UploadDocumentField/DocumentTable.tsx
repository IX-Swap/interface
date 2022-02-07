import React from 'react'
import { DataroomFile } from 'types/dataroomFile'
import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableBody
} from '@mui/material'

import { DocumentTableRow } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/DocumentTableRow'
import { TableCell } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/TableCell'

export interface DocumentTableProps {
  name: string
  documents: DataroomFile[]
}

export const DocumentTable = ({ documents, name }: DocumentTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>File</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Uploaded At</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map(document => (
            <DocumentTableRow
              key={document._id}
              name={name}
              document={document}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
