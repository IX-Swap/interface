import React, { Fragment } from 'react'
import { FieldsArray } from 'components/form/FieldsArray'
import { Grid, Typography } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { useFormContext } from 'react-hook-form'
import { SelectableDataroomUploader } from 'components/dataroom/SelectableDataroomUploader'
import { SelectableDataroomHeader } from 'components/dataroom/SelectableDataroomHeader'
import { DataroomDeleteSelected } from 'components/dataroom/DataroomDeleteSelected'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { DataroomUploadAndAppend } from 'components/dataroom/DataroomUploadAndAppend'
import { UploadButton } from 'components/dataroom/UploadButton'
import { SelectionHelper } from 'components/SelectionHelper'
import { itemComparator, SelectedDocument } from 'helpers/dataroom'

export interface ListingDocumentUploaderProps {
  name: string
  label: string
  helperText: string
}

export const ListingDocumentUploader = ({
  name,
  helperText,
  label
}: ListingDocumentUploaderProps) => {
  const { control } = useFormContext()

  return (
    <SelectionHelper<SelectedDocument> itemComparator={itemComparator}>
      <Grid item>
        <Typography variant='h5'>{label}</Typography>
        <FieldsArray name={name} control={control}>
          {({ fields, append, remove }) => (
            <Fragment>
              {fields.length > 0 && <SelectableDataroomHeader />}
              {fields.map((field, index) => {
                return (
                  // @ts-expect-error
                  <TypedField
                    customRenderer
                    variant='row'
                    key={field.id}
                    control={control}
                    component={SelectableDataroomUploader}
                    label='Document'
                    name={[name, index, 'value']}
                    defaultValue={fields[index].value}
                    valueExtractor={plainValueExtractor}
                    onDelete={() => remove(index)}
                  />
                )
              })}

              <Grid
                container
                justifyContent={
                  fields.length <= 0 ? 'space-between' : 'flex-end'
                }
                alignItems={'center'}
              >
                {fields.length <= 0 ? (
                  <Grid item>
                    <Typography variant={'body1'}>{helperText}</Typography>
                  </Grid>
                ) : null}
                <Grid item>
                  <DataroomUploadAndAppend
                    multiple
                    label='Uploader'
                    append={file => append({ value: file })}
                    documentInfo={{
                      type: label
                    }}
                    render={UploadButton}
                  />
                </Grid>
              </Grid>

              <DataroomDeleteSelected name={name} style={{ marginTop: 20 }} />

              <FormError name='documents' render={TextError} />
            </Fragment>
          )}
        </FieldsArray>
      </Grid>
    </SelectionHelper>
  )
}
