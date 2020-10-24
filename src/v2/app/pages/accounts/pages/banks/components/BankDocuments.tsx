import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { Button, Grid } from '@material-ui/core'
import { DataroomHeader } from 'v2/app/pages/identity/components/dataroom/DataroomHeader'
import { EditableField } from 'v2/components/form/EditableField'
import { NewDataroomUploader } from 'v2/components/form/NewDataroomUploader'
import { DataroomFileRow } from 'v2/components/form/DataroomFileRow'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
import { BankFormValues } from 'v2/app/pages/accounts/types'

export const BankDocuments = () => {
  const { control } = useFormContext<BankFormValues>()

  return (
    <FieldsArray name='supportingDocuments' control={control}>
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
                  name={['supportingDocuments', index, 'value']}
                  render={DataroomFileRow}
                  defaultValue={fields[index].document}
                  valueExtractor={plainValueExtractor}
                  onDelete={() => remove(index)}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item container justify='flex-end'>
            <NewDataroomUploader
              name=''
              label=''
              value={{} as any}
              documentInfo={{ type: 'Supporting Document' }}
              onChange={file => append({ document: file })}
              render={({ handleUpload }) => (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              )}
            />
          </Grid>
        </Grid>
      )}
    </FieldsArray>
  )
}
