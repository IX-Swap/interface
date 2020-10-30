import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { Grid, List } from '@material-ui/core'
import { TypedField } from 'v2/components/form/TypedField'
import { plainValueExtractor } from 'v2/helpers/forms'
import { BankFormValues } from 'v2/app/pages/accounts/types'
import { SelectionHelper } from 'v2/components/SelectionHelper'
import { DataroomUploadAndAppend } from 'v2/components/dataroom/DataroomUploadAndAppend'
import { DataroomDeleteSelected } from 'v2/components/dataroom/DataroomDeleteSelected'
import { SelectableDataroomUploader } from 'v2/components/dataroom/SelectableDataroomUploader'
import { SelectableDataroomHeader } from 'v2/components/dataroom/SelectableDataroomHeader'
import { UploadButton } from 'v2/components/dataroom/UploadButton'

export interface SelectedDocument {
  id: string
  index: number
}

export const itemComparator = (a: SelectedDocument, b: SelectedDocument) => {
  return a.id === b.id
}

export const BankDocuments = () => {
  const { control } = useFormContext<BankFormValues>()

  return (
    <SelectionHelper<SelectedDocument> itemComparator={itemComparator}>
      <Grid container direction='column' spacing={2}>
        <FieldsArray name='supportingDocuments' control={control}>
          {({ fields, append, remove }) => (
            <>
              {fields.length > 0 && (
                <Grid item>
                  <SelectableDataroomHeader />
                </Grid>
              )}
              <Grid item container direction='column'>
                <Grid item>
                  <List disablePadding component='div'>
                    {fields.map((field, index) => (
                      // @ts-expect-error
                      <TypedField
                        customRenderer
                        key={field.id}
                        control={control}
                        component={SelectableDataroomUploader}
                        variant='row'
                        index={index}
                        label='Document'
                        name={['supportingDocuments', index, 'value']}
                        defaultValue={fields[index].value}
                        valueExtractor={plainValueExtractor}
                        onDelete={() => remove(index)}
                      />
                    ))}
                  </List>
                </Grid>
                <Grid item container justify='space-between'>
                  <DataroomDeleteSelected name='supportingDocuments' />
                  <DataroomUploadAndAppend
                    multiple
                    label='Uploader'
                    append={file => append({ value: file })}
                    render={UploadButton}
                    documentInfo={{
                      type: 'Supporting Document',
                      title: 'Supporting Document'
                    }}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </FieldsArray>
      </Grid>
    </SelectionHelper>
  )
}
