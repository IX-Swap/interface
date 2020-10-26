import React from 'react'
import { Grid, Radio } from '@material-ui/core'
import { DeclarationValue } from 'v2/app/pages/identity/const/declarations'

export interface YesOrNoProps {
  name: string
  value: DeclarationValue | undefined
  disabled?: boolean
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
}

export const YesOrNo = (props: YesOrNoProps): JSX.Element => {
  const { name, value, disabled = false, onChange } = props

  return (
    <Grid container>
      <Grid
        container
        item
        xs={6}
        justify='center'
        direction='column'
        alignItems='center'
      >
        Yes
        <Radio
          value='Yes'
          checked={value === 'Yes'}
          name={name}
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
      <Grid
        container
        item
        xs={6}
        justify='center'
        direction='column'
        alignItems='center'
      >
        No
        <Radio
          value='No'
          name={name}
          checked={value === 'No'}
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  )
}
