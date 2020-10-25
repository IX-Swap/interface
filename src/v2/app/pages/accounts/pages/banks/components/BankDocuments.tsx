import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { Button, Grid, List, ListItem } from '@material-ui/core'
import { DataroomHeader } from 'v2/components/dataroom/DataroomHeader'
import { TypedField } from 'v2/components/form/TypedField'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'
import { plainValueExtractor } from 'v2/helpers/forms'
import { BankFormValues } from 'v2/app/pages/accounts/types'
import { DefaultDataroomUploader } from 'v2/components/dataroom/DefaultDataroomUploader'

export const BankDocuments = () => {
  const { control } = useFormContext<BankFormValues>()

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <DataroomHeader />
      </Grid>
      <FieldsArray name='supportingDocuments' control={control}>
        {({ fields, append, remove }) => (
          <Grid item container direction='column'>
            <Grid item>
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
                      name={['supportingDocuments', index, 'value']}
                      defaultValue={fields[index].document}
                      valueExtractor={plainValueExtractor}
                      onDelete={() => remove(index)}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item container justify='flex-end'>
              <DataroomUploader
                name=''
                label=''
                value={{} as any}
                documentInfo={{
                  type: 'Supporting Document',
                  title: 'Supporting Document'
                }}
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
    </Grid>
  )
}
