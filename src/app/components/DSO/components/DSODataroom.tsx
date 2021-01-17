import React from 'react'
import { FieldsArray } from 'components/form/FieldsArray'
import { Box, Grid, Table, TableBody, TableContainer } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { DataroomUploaderWithFileTypeSelector } from 'components/dataroom/DataroomUploaderWithFileTypeSelector'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { SelectionHelper } from 'components/SelectionHelper'
import { SelectableDataroomUploader } from 'components/dataroom/SelectableDataroomUploader'
import { SelectableDataroomHeader } from 'components/dataroom/SelectableDataroomHeader'
import { DataroomDeleteSelected } from 'components/dataroom/DataroomDeleteSelected'
import {
  itemComparator,
  SelectedDocument
} from 'app/pages/accounts/pages/banks/components/BankDocuments'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export const DSODataroom = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <SelectionHelper<SelectedDocument> itemComparator={itemComparator}>
      <FormSectionHeader title='Dataroom' />
      <FieldsArray name='documents' control={control}>
        {({ fields, append, remove }) => (
          <TableContainer>
            <Table style={{ tableLayout: 'fixed', marginBottom: 20 }}>
              <SelectableDataroomHeader />
              <TableBody>
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
              </TableBody>
            </Table>
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
          </TableContainer>
        )}
      </FieldsArray>
    </SelectionHelper>
  )
}
