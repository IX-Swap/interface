import React from 'react'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Grid
} from '@material-ui/core'
import { DownloadDSODocument } from 'app/components/DSO/components/DownloadDSODocument'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export interface DSODataroomViewProps {
  dso: DigitalSecurityOffering
}

export const DSODataroomView = (props: DSODataroomViewProps) => {
  const { dso } = props

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormSectionHeader title='Dataroom' />
      </Grid>
      <Grid item>
        <TableContainer>
          <Table>
            <DataroomHeader />
            <TableBody>
              {dso.documents?.map(document => (
                <TableRow key={document._id}>
                  <DataroomViewRow
                    title={document.type}
                    document={document}
                    downloader={
                      <DownloadDSODocument
                        dsoId={dso._id}
                        documentId={document._id}
                      />
                    }
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
