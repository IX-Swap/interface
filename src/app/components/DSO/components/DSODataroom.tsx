import React, { Fragment } from 'react'
import { FieldsArray } from 'components/form/FieldsArray'
import { Grid, Typography } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { DataroomUploaderWithFileTypeSelector } from 'components/dataroom/DataroomUploaderWithFileTypeSelector'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { SelectionHelper } from 'components/SelectionHelper'
import { SelectableDataroomUploader } from 'components/dataroom/SelectableDataroomUploader'
import { SelectableDataroomHeader } from 'components/dataroom/SelectableDataroomHeader'
import { DataroomDeleteSelected } from 'components/dataroom/DataroomDeleteSelected'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DSOSubscriptionDocument } from 'app/components/DSO/components/DSOSubscriptionDocument'
import { itemComparator, SelectedDocument } from 'helpers/dataroom'

export const DSODataroom = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <SelectionHelper<SelectedDocument> itemComparator={itemComparator}>
      <FormSectionHeader title='Upload Documents' />

      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Typography variant='h5'>Subscription Document</Typography>
          <DSOSubscriptionDocument />
        </Grid>

        <Grid item>
          <Typography variant='h5'>Dataroom</Typography>
        </Grid>

        <Grid item>
          <FieldsArray name='documents' control={control}>
            {({ fields, append, remove }) => (
              <Fragment>
                {fields.length > 0 && <SelectableDataroomHeader />}
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
                <DataroomUploaderWithFileTypeSelector append={append} />

                <DataroomDeleteSelected
                  name='documents'
                  style={{ marginTop: 20 }}
                />

                <FormError name='documents' render={TextError} />
              </Fragment>
            )}
          </FieldsArray>
        </Grid>
      </Grid>
    </SelectionHelper>
  )
}
