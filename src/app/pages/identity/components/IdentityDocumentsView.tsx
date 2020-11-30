import React from 'react'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { Grid, List, ListItem } from '@material-ui/core'
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
    <Grid container direction='column'>
      <DataroomHeader />
      <List disablePadding>
        {formattedDocuments.map(({ value: document }, index) => (
          <ListItem
            key={index}
            divider={index !== formattedDocuments.length - 1}
            style={{ minHeight: 50 }}
          >
            <DataroomViewRow
              title={document?.title ?? ''}
              document={document}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  )
}
