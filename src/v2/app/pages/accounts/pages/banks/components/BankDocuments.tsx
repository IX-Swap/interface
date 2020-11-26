import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { Box, Grid, List } from '@material-ui/core'
import { TypedField } from 'v2/components/form/TypedField'
import { plainValueExtractor } from 'v2/helpers/forms'
import { BankFormValues } from 'v2/app/pages/accounts/types'
import { SelectionHelper } from 'v2/components/SelectionHelper'
import { DataroomUploadAndAppend } from 'v2/components/dataroom/DataroomUploadAndAppend'
import { DataroomDeleteSelected } from 'v2/components/dataroom/DataroomDeleteSelected'
import { SelectableDataroomUploader } from 'v2/components/dataroom/SelectableDataroomUploader'
import { SelectableDataroomHeader } from 'v2/components/dataroom/SelectableDataroomHeader'
import { UploadButton } from 'v2/components/dataroom/UploadButton'
import { FormError } from 'v2/components/form/FormError'
import { TextError } from 'v2/components/TextError'

export interface SelectedDocument {
  id: string
  index: number
}

export const itemComparator = (a: SelectedDocument, b: SelectedDocument) => {
  return a.id === b.id
}

const fieldName = 'supportingDocuments' as const

export const BankDocuments = () => {
  const { control } = useFormContext<BankFormValues>()

  return (
    <SelectionHelper<SelectedDocument> itemComparator={itemComparator}>
      <Grid container direction='column' spacing={2}>
        <FieldsArray name={fieldName} control={control}>
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
                        name={[fieldName, index, 'value']}
                        defaultValue={fields[index].value}
                        valueExtractor={plainValueExtractor}
                        onDelete={() => remove(index)}
                      />
                    ))}
                  </List>
                </Grid>
                <Grid item container justify='space-between'>
                  <DataroomDeleteSelected name={fieldName} />
                  <Box display='flex' alignItems='center'>
                    <FormError name={fieldName} render={TextError} />
                    <DataroomUploadAndAppend
                      multiple
                      label='Uploader'
                      append={file => {
                        append({ value: file })
                        void control.trigger(fieldName)
                      }}
                      render={UploadButton}
                      documentInfo={{
                        type: 'Supporting Document',
                        title: 'Supporting Document'
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </FieldsArray>
      </Grid>
    </SelectionHelper>
  )
}
