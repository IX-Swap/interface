import React from 'react'
import { Grid } from '@material-ui/core'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'
import { UserAvatar } from '../../UserAvatar'

export interface DSOBaseFieldsProps {
  isEditing: boolean
  dsoOwnerId: string
}

export const DSOBaseFields = (props: DSOBaseFieldsProps) => {
  const { isEditing, dsoOwnerId } = props
  const { EditableField } = useDSOForm()

  return (
    <Grid container direction='row' spacing={2}>
      <Grid item>
        <UserAvatar name='logo' isEditing={isEditing} ownerId={dsoOwnerId} />
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
