import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { DataroomFileTypeSelect } from 'components/dataroom/DataroomFileTypeSelect'
import { DataroomFile } from 'types/dataroomFile'
import { UploadDocumentInfo } from 'hooks/useUploadFile'
import { DataroomDocumentType } from 'config/dataroom'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { Icon } from 'ui/Icons/Icon'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { VSpacer } from 'components/VSpacer'
import { useFormContext } from 'react-hook-form'

export interface DSODataroomUploaderProps {
  fields: any[]
  append: (value: { value: DataroomFile }) => any
  remove?: (index: number) => any
  documentInfo?: UploadDocumentInfo
  control?: any
}

export const DSODataroomUploader = (props: DSODataroomUploaderProps) => {
  const { append, fields, documentInfo = {}, control, remove } = props
  const [fileType, setFileType] = useState<DataroomDocumentType>(
    DataroomDocumentType.Other
  )

  const { clearErrors, errors, trigger } = useFormContext()

  return (
    <Grid container direction={'column'} spacing={5}>
      <Grid item>
        <DataroomFileTypeSelect
          variant='outlined'
          value={fileType}
          onChange={event =>
            setFileType(event.target.value as DataroomDocumentType)
          }
        />
      </Grid>

      <Grid item container direction={'column'}>
        {fields.map((item, i) => (
          <>
            <TypedField
              customRenderer
              control={control}
              component={FileUpload}
              fullWidth
              label={
                <Box display={'flex'} alignItems={'center'}>
                  <Icon name={'file'} />
                  <Box ml={2}>Upload file</Box>
                </Box>
              }
              name={['documents', i, 'value']}
              defaultValue={fields[i].value}
              valueExtractor={plainValueExtractor}
              documentInfo={{
                type: fileType,
                title: fileType,
                ...documentInfo
              }}
              onRemoveCallback={async () => {
                if (fields.length === 1) {
                  await trigger('documents')
                }
                remove?.(i)
              }}
            />
            <VSpacer size='small' />
          </>
        ))}

        <FileUpload
          // control={control}
          fullWidth
          label={
            <Box display={'flex'} alignItems={'center'}>
              <Icon name={'file'} />
              <Box ml={2}>Upload file</Box>
            </Box>
          }
          name={'dataroom'}
          documentInfo={{
            type: fileType,
            title: fileType,
            ...documentInfo
          }}
          onSuccessUploadCallback={async (file: any) => {
            console.log('successful callback', errors)
            await clearErrors()
            append({ value: file })
          }}
          neverComplete
        />
      </Grid>
    </Grid>
  )
}
