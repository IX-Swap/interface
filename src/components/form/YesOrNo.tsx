import React from 'react'
import { Grid, Radio, Typography } from '@material-ui/core'
import { DeclarationValue } from 'app/pages/identity/const/declarations'
import { useFormError } from 'hooks/useFormError'
import { themeColors } from 'themes/default'

export interface YesOrNoProps {
  name: string
  value: DeclarationValue | undefined
  disabled?: boolean
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
}

export const YesOrNo = (props: Partial<YesOrNoProps>): JSX.Element => {
  const { name, value, disabled = false, onChange } = props
  const { hasError } = useFormError(name as string)
  const textColor = hasError ? 'error' : 'initial'
  const radioStyle = hasError ? { color: themeColors.error } : {}

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
        <Typography variant='inherit' color={textColor}>
          Yes
        </Typography>
        <Radio
          value='Yes'
          checked={value === 'Yes'}
          name={name}
          onChange={onChange}
          disabled={disabled}
          style={radioStyle}
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
        <Typography variant='inherit' color={textColor}>
          No
        </Typography>
        <Radio
          value='No'
          name={name}
          checked={value === 'No'}
          onChange={onChange}
          disabled={disabled}
          style={radioStyle}
        />
      </Grid>
    </Grid>
  )
}
