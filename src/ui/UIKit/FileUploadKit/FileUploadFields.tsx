import { Button, Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { DataroomFileType } from 'config/dataroom'
import { plainValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { File } from 'ui/FileUpload/File'
import { DataroomFile } from 'types/dataroomFile'
import { Avatar } from 'components/Avatar'
import { getDataroomFileId } from 'helpers/dataroom'
import { FieldsArray } from 'components/form/FieldsArray'
import { Icon } from 'ui/Icons/Icon'

const sampleDocument: DataroomFile = {
  _id: '1232131231',
  title: 'File',
  type: 'document',
  user: '1232131',
  originalFileName: 'important-document.pdf',
  url: 'important-document.pdf',
  createdAt: '1231231',
  updatedAt: '1232131'
}

const sampleImage: DataroomFile = {
  _id: '1232131231',
  title: 'File',
  type: 'document',
  user: '1232131',
  originalFileName: 'logo.jpg',
  url: 'logo.jpg',
  createdAt: '1231231',
  updatedAt: '1232131'
}

export const FileUploadFields = () => {
  const { control } = useFormContext()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TypedField
          customRenderer
          name='file'
          control={control}
          component={FileUpload}
          label='Upload File'
          valueExtractor={plainValueExtractor}
          accept={DataroomFileType.document}
          fullWidth
          maxSize={10}
          documentInfo={{
            type: 'Report Document'
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <File
          label={sampleDocument.originalFileName}
          value={sampleDocument}
          readonly
        />
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item>
          <TypedField
            customRenderer
            name='image'
            control={control}
            component={FileUpload}
            label='Upload File'
            valueExtractor={plainValueExtractor}
            accept={DataroomFileType.image}
            maxSize={1}
            documentInfo={{
              type: 'DSO Logo'
            }}
          />
        </Grid>
        <Grid item>
          <Avatar
            size={120}
            documentId={getDataroomFileId(sampleImage)}
            variant='square'
            borderRadius={8}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FieldsArray name='file-multiple' control={control}>
          {({ fields, append, remove }) => (
            <Grid container spacing={1}>
              {fields.map((field, index) => {
                return (
                  <Grid item xs={12} key={field.id}>
                    <TypedField
                      customRenderer
                      name={['file-multiple', index, 'value']}
                      control={control}
                      component={FileUpload}
                      label='Upload File'
                      valueExtractor={plainValueExtractor}
                      accept={DataroomFileType.document}
                      fullWidth
                      maxSize={10}
                      documentInfo={{
                        type: 'Report Document'
                      }}
                      remove={() => remove(index)}
                    />
                  </Grid>
                )
              })}
              <Grid item xs={12}>
                <Button
                  onClick={() => append({ value: {} })}
                  variant='outlined'
                  startIcon={<Icon name='plus' />}
                  sx={{ width: '100%' }}
                >
                  Add More
                </Button>
              </Grid>
            </Grid>
          )}
        </FieldsArray>
      </Grid>
    </Grid>
  )
}
