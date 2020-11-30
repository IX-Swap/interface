import React from 'react'
import { Grid } from '@material-ui/core'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { DataroomFeature } from 'types/authorizer'
import { useFormContext } from 'react-hook-form'
import { FieldsArray } from 'components/form/FieldsArray'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { DataroomUploaderWithFileTypeSelector } from 'components/dataroom/DataroomUploaderWithFileTypeSelector'
import { SelectionHelper } from 'components/SelectionHelper'
import {
  itemComparator,
  SelectedDocument
} from 'app/pages/accounts/pages/banks/components/BankDocuments'
import { SelectableDataroomUploader } from 'components/dataroom/SelectableDataroomUploader'
import { DataroomDeleteSelected } from 'components/dataroom/DataroomDeleteSelected'

export interface AuthorizationDocumentsProps {
  resourceId: string
  feature: typeof DataroomFeature[keyof typeof DataroomFeature]
}

export const AuthorizationDocuments = (props: AuthorizationDocumentsProps) => {
  const { resourceId, feature } = props
  const { control } = useFormContext<{ documents: FormArray<DataroomFile> }>()

  return (
    <SelectionHelper<SelectedDocument> itemComparator={itemComparator}>
      <FieldsArray name='documents' control={control}>
        {({ fields, append, remove }) => (
          <Grid container direction='column' spacing={4}>
            <Grid item container justify='space-between'>
              <DataroomUploaderWithFileTypeSelector
                append={append}
                documentInfo={{ feature, resourceId }}
              />
              <DataroomDeleteSelected name='documents' />
            </Grid>
            <Grid item container wrap='wrap'>
              {fields.map((field, index) => (
                <Grid item key={field.id}>
                  {/* @ts-ignore */}
                  <TypedField
                    customRenderer
                    key={field.id}
                    control={control}
                    component={SelectableDataroomUploader}
                    label='Document'
                    name={['documents', index, 'value']}
                    index={index}
                    defaultValue={fields[index].value}
                    valueExtractor={plainValueExtractor}
                    onDelete={() => remove(index)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </FieldsArray>
    </SelectionHelper>
  )
}
