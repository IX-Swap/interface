import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useFormError } from 'hooks/useFormError'
import { themeColors } from 'themes/app/colors'
import { UIRadio } from 'components/UIRadio/UIRadio'

export interface YesOrNoProps {
  name: string
  value: 'yes' | 'no' | undefined
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
        justifyContent='center'
        direction='column'
        alignItems='center'
      >
        <Typography variant='inherit' color={textColor}>
          Yes
        </Typography>
        <UIRadio
          value='yes'
          checked={value === 'yes'}
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
        justifyContent='center'
        direction='column'
        alignItems='center'
      >
        <Typography variant='inherit' color={textColor}>
          No
        </Typography>
        <UIRadio
          value='no'
          name={name}
          checked={value === 'no'}
          onChange={onChange}
          disabled={disabled}
          style={radioStyle}
        />
      </Grid>
    </Grid>
  )
}
