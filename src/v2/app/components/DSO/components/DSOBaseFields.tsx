import React from 'react'
import { Grid } from '@material-ui/core'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'
import { UserAvatar } from 'v2/app/components/UserAvatar'
import { DSOCorporateName } from 'v2/app/components/DSO/components/DSOCorporateName'
import { DSOCurrencyName } from 'v2/app/components/DSO/components/DSOCurrencyName'

export interface DSOBaseFieldsProps {
  isEditing: boolean
  dsoOwnerId: string
}

export const DSOBaseFields = (props: DSOBaseFieldsProps) => {
  const { isEditing, dsoOwnerId } = props
  const { EditableField } = useDSOForm()

  return (
    <Grid
      container
      direction='row'
      alignItems='flex-start'
      spacing={2}
      style={{ marginBottom: 20, marginTop: 20 }}
    >
      <Grid item>
        <UserAvatar
          name='logo'
          isEditing={isEditing}
          ownerId={dsoOwnerId}
          size={80}
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
          fieldType='DatePicker'
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
          viewRenderer={<DSOCorporateName />}
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
          label='Currency'
          name='currency'
          viewRenderer={<DSOCurrencyName />}
        />
      </Grid>
    </Grid>
  )
}
