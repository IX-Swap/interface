import React from 'react'
import { Grid, List, ListItem } from '@material-ui/core'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { FieldsArray } from 'components/form/FieldsArray'
import { useFormContext } from 'react-hook-form'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { IdentityDataroomUploader } from 'components/dataroom/IdentityDataroomUploader'

export const IdentityDataroom = () => {
  const { control } = useFormContext<{ documents: FormArray<DataroomFile> }>()

  return (
    <FieldsArray name='documents' control={control}>
      {({ fields }) => (
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <DataroomHeader />
          </Grid>
          <Grid item container>
            <List style={{ width: '100%' }} disablePadding>
              {fields.map((field, index) => (
                <ListItem divider={index !== fields.length - 1}>
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
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      )}
    </FieldsArray>
  )
}
