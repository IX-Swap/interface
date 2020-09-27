import React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { DSOAvatar } from 'v2/app/components/DSO/components/DSOAvatar'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'

export interface DSOBaseFieldsProps {
  isEditing: boolean
  dsoOwnerId: string
}

export const DSOBaseFields = (props: DSOBaseFieldsProps) => {
  const { isEditing, dsoOwnerId } = props
  const { EditableField, FormValue } = useDSOForm()

  return (
    <Grid container direction='row' spacing={2}>
      <Grid item>
        <EditableField
          fieldType='DocumentUploader'
          isEditing={isEditing}
          title='DSO Logo'
          label='Logo'
          name='logo'
          valueExtractor={documentValueExtractor}
          canDelete={false}
          uploadComponent={
            <IconButton component='span'>
              <PhotoCamera />
            </IconButton>
          }
          viewRenderer={
            <FormValue name='logo'>
              {logo => <DSOAvatar imageId={logo} dsoOwnerId={dsoOwnerId} />}
            </FormValue>
          }
          editRenderer={input => (
            <FormValue name='logo'>
              {logo => (
                <DSOAvatar
                  imageId={logo}
                  dsoOwnerId={dsoOwnerId}
                  button={input}
                />
              )}
            </FormValue>
          )}
        />
      </Grid>

      <Grid item>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          label='Token Name'
          name='tokenName'
        />
      </Grid>

      <Grid item>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          label='Symbol'
          name='tokenSymbol'
        />
      </Grid>

      <Grid item>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          label='Launch Date'
          name='launchDate'
        />
      </Grid>

      <Grid item>
        <EditableField
          fieldType='CorporateSelect'
          isEditing={isEditing}
          label='Corporate'
          name='corporate'
        />
      </Grid>

      <Grid item>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          label='Issuer Name'
          name='issuerName'
        />
      </Grid>

      <Grid item>
        <EditableField
          fieldType='AssetSelect'
          assetType='Currency'
          isEditing={isEditing}
          label='Asset'
          name='currency'
        />
      </Grid>
    </Grid>
  )
}
