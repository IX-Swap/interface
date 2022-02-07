import React from 'react'
import { Grid, Typography, TableRow, IconButton } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'

import { DeleteOutline } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { ViewUploadedDocument } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/ViewUploadedDocument'
import { FileTypeIcon } from 'app/pages/identity/components/UploadDocumentsForm/FileTypeIcon/FileTypeIcon'
import { TableCell } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/TableCell'
import { formatDateAndTime } from 'helpers/dates'

export interface DocumentTableRowProps {
  name: string
  document: Partial<DataroomFile>
}

export const DocumentTableRow = ({ document, name }: DocumentTableRowProps) => {
  const { control } = useFormContext()
  if (document === undefined || document._id === undefined) {
    return null
  }

  const removeDocument = () => {
    const values: DataroomFile[] = control.getValues(name)
    control.setValue(
      name,
      values.filter(value => value._id !== document._id)
    )
  }

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        <Grid container spacing={1} alignItems='center'>
          <Grid item>
            <FileTypeIcon
              fileType={document.originalFileName?.split('.').pop() ?? ''}
            />
          </Grid>
          <Grid item>
            <Typography>{document.originalFileName}</Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell component='th' scope='row'>
        <Typography>{document.type}</Typography>
      </TableCell>
      <TableCell component='th' scope='row'>
        <Typography>
          {document.createdAt !== undefined
            ? formatDateAndTime(document.createdAt)
            : null}
        </Typography>
      </TableCell>
      <TableCell component='th' scope='row' align='right'>
        <ViewUploadedDocument documentId={document._id} />
        <IconButton onClick={removeDocument} size='large'>
          <DeleteOutline color='disabled' style={{ width: 24, height: 24 }} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
