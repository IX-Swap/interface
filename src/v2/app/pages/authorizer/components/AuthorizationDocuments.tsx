import React from 'react'
import { Box, Grid, IconButton } from '@material-ui/core'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { DataroomFileWithGuide, DataroomFile } from 'v2/types/dataroomFile'
import { AuthorizationDocument } from './AuthorizationDocument'
import { Delete } from '@material-ui/icons'
import {
  Dataroom,
  Noop
} from 'v2/app/pages/identity/components/dataroom/Dataroom'
import { DataroomFileType } from 'v2/components/form/DataroomFileTypeSelect'
import { DataroomFeature } from 'v2/types/authorizer'

export interface AuthorizationDocumentsProps {
  resourceId: string
  documents: DataroomFile[]
  feature: typeof DataroomFeature[keyof typeof DataroomFeature]
}

export const AuthorizationDocuments = (props: AuthorizationDocumentsProps) => {
  const { resourceId, documents, feature } = props
  const { Form, FormValue, DataroomFileTypeSelect } = useTypedForm<{
    documents: DataroomFileWithGuide[]
    documentType: string
  }>()
  const deleteComponent = (
    <IconButton component='span' size='small'>
      <Delete />
    </IconButton>
  )

  return (
    <Grid container>
      <Form
        defaultValues={{
          documentType: DataroomFileType.SupportingDocument,
          documents: documents.map(document => ({
            title: '',
            label: '',
            type: '',
            document
          }))
        }}
      >
        <Grid item container>
          <FormValue name='documentType'>
            {documentType => (
              <Dataroom
                editable
                multiple
                isEditing={true}
                direction='row'
                HeaderComponent={Noop}
                EditComponent={AuthorizationDocument}
                dataroomDocumentProps={{
                  deleteComponent,
                  setValueToNullOnDelete: false
                }}
                dataroomAddDocumentProps={{
                  documentInfo: {
                    type: documentType,
                    feature,
                    resourceId
                  }
                }}
              >
                {({ items, addButton }) => (
                  <Grid container direction='column'>
                    <Grid item container alignItems='center'>
                      <Box py={5}>
                        <DataroomFileTypeSelect
                          label='Document Type'
                          name='documentType'
                          variant='outlined'
                          formControlProps={{
                            style: {
                              minWidth: 200
                            }
                          }}
                        />
                      </Box>
                      <Box py={5} px={1}>
                        {addButton}
                      </Box>
                    </Grid>
                    {items.length > 0 && <Box py={2} />}
                    <Grid item container>
                      {items}
                    </Grid>
                    {items.length > 0 && <Box py={2} />}
                  </Grid>
                )}
              </Dataroom>
            )}
          </FormValue>
        </Grid>
      </Form>
    </Grid>
  )
}
