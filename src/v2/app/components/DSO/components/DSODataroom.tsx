import React from 'react'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { Box, Grid, List } from '@material-ui/core'
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
import { FormError } from 'v2/components/form/FormError'
import { TextError } from 'v2/components/TextError'

export const DSODataroom = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <SelectionHelper<SelectedDocument> itemComparator={itemComparator}>
      <FieldsArray name='documents' control={control}>
        {({ fields, append, remove }) => (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SelectableDataroomHeader />
            </Grid>
            <Grid item container xs={12}>
              <List disablePadding component='div' style={{ width: '100%' }}>
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
            <Grid
              item
              xs={12}
              container
              justify='space-between'
              alignItems='center'
            >
              <DataroomDeleteSelected name='documents' />
              <Box display='flex' alignItems='center'>
                <FormError name='documents' render={TextError} />
                <DataroomUploaderWithFileTypeSelector append={append} />
              </Box>
            </Grid>
          </Grid>
        )}
      </FieldsArray>
    </SelectionHelper>
  )
}
