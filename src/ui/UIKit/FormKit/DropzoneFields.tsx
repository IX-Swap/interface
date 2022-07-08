import { Box, Grid, Typography } from '@mui/material'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { Dropzone } from 'components/dataroom/Dropzone'
import { TypedField } from 'components/form/TypedField'
import { DataroomFileType } from 'config/dataroom'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const DropzoneFields = () => {
  const { control } = useFormContext()
  return (
    <Grid container spacing={6}>
      <Grid item>
        <TypedField
          customRenderer
          component={Dropzone}
          name='logo'
          label='Upload Logo'
          control={control}
          valueExtractor={documentValueExtractor}
          accept={DataroomFileType.image}
          documentInfo={{
            type: 'DSO Logo'
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <UploadDocumentField
          fieldId='document'
          name='document'
          label='Proof of Identity'
          helperElement={
            <>
              <Box m={1} />
              <Typography variant='body1' color='textSecondary'>
                Passport, Driving License, NRIC, Government Issued ID Card And
                Others
              </Typography>
            </>
          }
          defaultValue={[
            {
              _id: '61fcb42023f48709b125fabf',
              user: '5fc0982ef02bc219055a0b9e',
              title: 'Documents ',
              type: 'Documents ',
              originalFileName: 'Sample-Document.pdf',
              createdAt: '2022-02-04T05:05:36.032Z',
              updatedAt: '2022-02-04T05:05:36.032Z'
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}
