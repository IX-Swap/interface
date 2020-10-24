import React from 'react'
import { Grid } from '@material-ui/core'
import { DataroomHeader } from 'v2/app/pages/identity/components/dataroom/DataroomHeader'
import { EditableField } from 'v2/components/form/EditableField'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { useFormContext } from 'react-hook-form'
import { DataroomFile, FormArray } from 'v2/types/dataroomFile'
import { IdentityDataroomUploader } from 'v2/components/form/IdentityDataroomUploader'

export const IdentityDataroom = () => {
  const { control } = useFormContext<{ documents: FormArray<DataroomFile> }>()

  return (
    <FieldsArray name='documents' control={control}>
      {({ fields }) => (
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <DataroomHeader />
          </Grid>
          <Grid item container direction='column'>
            {fields.map((field, index) => (
              <Grid item key={field.id}>
                <EditableField
                  key={field.id}
                  control={control}
                  label='Document'
                  name={['documents', index, 'value']}
                  valueExtractor={plainValueExtractor}
                  defaultValue={fields[index].value}
                  customRenderer={IdentityDataroomUploader}
                  customRendererProps={}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </FieldsArray>
  )
}
