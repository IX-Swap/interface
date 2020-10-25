import React from 'react'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { Grid, List, ListItem } from '@material-ui/core'
import { DataroomHeader } from 'v2/components/dataroom/DataroomHeader'
import { TypedField } from 'v2/components/form/TypedField'
import { plainValueExtractor } from 'v2/helpers/forms'
import { DataroomUploaderWithFileTypeSelector } from 'v2/components/dataroom/DataroomUploaderWithFileTypeSelector'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'
import { DefaultDataroomUploader } from 'v2/components/dataroom/DefaultDataroomUploader'

export const DSODataroom = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <FieldsArray name='documents' control={control}>
      {({ fields, append, remove }) => (
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <DataroomHeader />
          </Grid>
          <Grid item container direction='column'>
            <List disablePadding>
              {fields.map((field, index) => (
                <ListItem
                  key={field.id}
                  divider={index !== fields.length - 1}
                  style={{ minHeight: 50 }}
                >
                  {/* @ts-ignore */}
                  <TypedField
                    customRenderer
                    key={field.id}
                    control={control}
                    component={DefaultDataroomUploader}
                    label='Document'
                    name={['documents', index, 'document']}
                    defaultValue={fields[index].document}
                    valueExtractor={plainValueExtractor}
                    onDelete={() => remove(index)}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item>
            <DataroomUploaderWithFileTypeSelector append={append} />
          </Grid>
        </Grid>
      )}
    </FieldsArray>
  )
}
