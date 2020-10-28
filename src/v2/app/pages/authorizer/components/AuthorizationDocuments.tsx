import React from 'react'
import { Grid } from '@material-ui/core'
import { DataroomFile, FormArray } from 'v2/types/dataroomFile'
import { DataroomFeature } from 'v2/types/authorizer'
import { useFormContext } from 'react-hook-form'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { TypedField } from 'v2/components/form/TypedField'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'
import { plainValueExtractor } from 'v2/helpers/forms'
import { DataroomUploaderWithFileTypeSelector } from 'v2/components/dataroom/DataroomUploaderWithFileTypeSelector'
import { AuthorizationDocument } from 'v2/app/pages/authorizer/components/AuthorizationDocument'

export interface AuthorizationDocumentsProps {
  resourceId: string
  feature: typeof DataroomFeature[keyof typeof DataroomFeature]
}

export const AuthorizationDocuments = (props: AuthorizationDocumentsProps) => {
  const { resourceId, feature } = props
  const { control } = useFormContext<{ documents: FormArray<DataroomFile> }>()

  return (
    <FieldsArray name='documents' control={control}>
      {({ fields, append, remove }) => (
        <Grid container direction='column' spacing={4}>
          <Grid item>
            <DataroomUploaderWithFileTypeSelector
              append={append}
              documentInfo={{ feature, resourceId }}
            />
          </Grid>
          <Grid item container wrap='wrap'>
            {fields.map((field, index) => (
              <Grid item key={field.id}>
                {/* @ts-ignore */}
                <TypedField
                  customRenderer
                  key={field.id}
                  control={control}
                  component={DataroomUploader}
                  label='Document'
                  name={['documents', index, 'value']}
                  render={AuthorizationDocument}
                  defaultValue={fields[index].document}
                  valueExtractor={plainValueExtractor}
                  onDelete={() => remove(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </FieldsArray>
  )
}
