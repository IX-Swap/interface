import React from 'react'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { Grid } from '@material-ui/core'
import { DataroomHeader } from 'v2/app/pages/identity/components/dataroom/DataroomHeader'
import { EditableField } from 'v2/components/form/EditableField'
import { NewDataroomUploader } from 'v2/components/form/NewDataroomUploader'
import { DataroomFileRow } from 'v2/components/form/DataroomFileRow'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { DataroomUploaderWithFileTypeSelector } from 'v2/components/form/DataroomUploaderWithFileTypeSelector'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'

export const DSODataroom = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Dataroom' item xs={12}>
      <FieldsArray name='documents' control={control}>
        {({ fields, append, remove }) => (
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <DataroomHeader />
            </Grid>
            <Grid item container direction='column'>
              {fields.map((field, index) => (
                <Grid item key={field.id}>
                  {/* @ts-ignore */}
                  <EditableField
                    key={field.id}
                    control={control}
                    component={NewDataroomUploader}
                    label='Document'
                    name={`documents[${index}].document` as any}
                    render={DataroomFileRow}
                    defaultValue={fields[index].document}
                    valueExtractor={plainValueExtractor}
                    onDelete={() => remove(index)}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item>
              <DataroomUploaderWithFileTypeSelector append={append} />
            </Grid>
          </Grid>
        )}
      </FieldsArray>
    </DSOContainer>
  )
}
