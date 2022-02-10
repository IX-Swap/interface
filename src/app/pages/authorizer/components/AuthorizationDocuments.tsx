import React from 'react'
import { Grid } from '@mui/material'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { DataroomFeature } from 'types/authorizer'
import { useFormContext } from 'react-hook-form'
import { FieldsArray } from 'components/form/FieldsArray'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { DataroomUploaderWithFileTypeSelector } from 'components/dataroom/DataroomUploaderWithFileTypeSelector'
import { SelectionHelper } from 'components/SelectionHelper'
import { SelectableDataroomUploader } from 'components/dataroom/SelectableDataroomUploader'
import { DataroomDeleteSelected } from 'components/dataroom/DataroomDeleteSelected'
import { SelectableDataroomHeader } from 'components/dataroom/SelectableDataroomHeader'
import { itemComparator, SelectedDocument } from 'helpers/dataroom'
import { useQueryCache } from 'react-query'
import { identityQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useParams } from 'react-router-dom'

export interface AuthorizationDocumentsProps {
  resourceId: string
  feature: typeof DataroomFeature[keyof typeof DataroomFeature]
}

export const AuthorizationDocuments = (props: AuthorizationDocumentsProps) => {
  const { user } = useAuth()
  const { userId } = useParams<{ userId: string; identityId: string }>()
  const { resourceId, feature } = props
  const { control } = useFormContext<{ documents: FormArray<DataroomFile> }>()
  const queryCache = useQueryCache()
  const refetchGetIndividualIdentities = () => {
    void queryCache.invalidateQueries([
      identityQueryKeys.getIndividual,
      userId ?? getIdFromObj(user)
    ])
  }

  return (
    <SelectionHelper<SelectedDocument> itemComparator={itemComparator}>
      <FieldsArray name='documents' control={control}>
        {({ fields, append, remove }) => (
          <Grid container direction='column' spacing={3}>
            <Grid item container wrap='wrap'>
              <SelectableDataroomHeader />
              {fields.map((field, index) => (
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
                  onDelete={() => {
                    remove(index)
                    refetchGetIndividualIdentities()
                  }}
                />
              ))}
            </Grid>

            <Grid item container justifyContent='space-between'>
              <DataroomUploaderWithFileTypeSelector
                append={item => {
                  append(item.value)
                  refetchGetIndividualIdentities()
                }}
                documentInfo={{ feature, resourceId }}
              />
            </Grid>

            <Grid item>
              <DataroomDeleteSelected
                name='documents'
                action={refetchGetIndividualIdentities}
              />
            </Grid>
          </Grid>
        )}
      </FieldsArray>
    </SelectionHelper>
  )
}
