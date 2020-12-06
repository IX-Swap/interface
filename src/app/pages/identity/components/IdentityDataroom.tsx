import React from 'react'
import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableRow
} from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { FieldsArray } from 'components/form/FieldsArray'
import { useFormContext } from 'react-hook-form'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { IdentityDataroomUploader } from 'components/dataroom/IdentityDataroomUploader'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'

export const IdentityDataroom = () => {
  const { control } = useFormContext<{ documents: FormArray<DataroomFile> }>()

  return (
    <FieldsArray name='documents' control={control}>
      {({ fields }) => (
        <Grid container direction='column' spacing={2}>
          <TableContainer>
            <Table>
              <DataroomHeader />
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={index}>
                    {/* @ts-ignore  */}
                    <TypedField
                      customRenderer
                      key={field.id}
                      control={control}
                      component={IdentityDataroomUploader}
                      label='Document'
                      name={['documents', index, 'value']}
                      valueExtractor={plainValueExtractor}
                      defaultValue={fields[index].value}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </FieldsArray>
  )
}
