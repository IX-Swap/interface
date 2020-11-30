import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldsArray } from 'components/form/FieldsArray'
import { Box, Grid, List } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { BankFormValues } from 'app/pages/accounts/types'
import { SelectionHelper } from 'components/SelectionHelper'
import { DataroomUploadAndAppend } from 'components/dataroom/DataroomUploadAndAppend'
import { DataroomDeleteSelected } from 'components/dataroom/DataroomDeleteSelected'
import { SelectableDataroomUploader } from 'components/dataroom/SelectableDataroomUploader'
import { SelectableDataroomHeader } from 'components/dataroom/SelectableDataroomHeader'
import { UploadButton } from 'components/dataroom/UploadButton'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'

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
