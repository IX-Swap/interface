import React from 'react'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { Grid, List } from '@material-ui/core'
import { TypedField } from 'v2/components/form/TypedField'
import { plainValueExtractor } from 'v2/helpers/forms'
import { DataroomUploaderWithFileTypeSelector } from 'v2/components/dataroom/DataroomUploaderWithFileTypeSelector'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'
import { SelectionHelper } from 'v2/components/SelectionHelper'
import { SelectableDataroomUploader } from 'v2/components/dataroom/SelectableDataroomUploader'
import { SelectableDataroomHeader } from 'v2/components/dataroom/SelectableDataroomHeader'
import { DataroomDeleteSelected } from 'v2/components/dataroom/DataroomDeleteSelected'
import {
  itemComparator,
  SelectedDocument
} from 'v2/app/pages/accounts/pages/banks/components/BankDocuments'

export const DSODataroom = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <SelectionHelper<SelectedDocument> itemComparator={itemComparator}>
      <FieldsArray name='documents' control={control}>
        {({ fields, append, remove }) => (
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <SelectableDataroomHeader />
            </Grid>
            <Grid item container direction='column'>
              <List disablePadding component='div'>
                {fields.map((field, index) => (
                  // @ts-expect-error
                  <TypedField
                    customRenderer
                    variant='row'
                    key={field.id}
                    control={control}
                    component={SelectableDataroomUploader}
                    label='Document'
                    name={['documents', index, 'value']}
                    defaultValue={fields[index].value}
                    valueExtractor={plainValueExtractor}
                    onDelete={() => remove(index)}
                  />
                ))}
              </List>
            </Grid>
            <Grid item container justify='space-between' alignItems='center'>
              <DataroomDeleteSelected name='documents' />
              <DataroomUploaderWithFileTypeSelector append={append} />
            </Grid>
          </Grid>
        )}
      </FieldsArray>
    </SelectionHelper>
  )
}
