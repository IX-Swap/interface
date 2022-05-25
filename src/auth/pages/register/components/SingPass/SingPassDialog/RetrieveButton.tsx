import { Button, FormControlLabel, Grid } from '@mui/material'
import { generateSingPassAuthorizeUrl } from 'hooks/utils'
import React, { useState } from 'react'
import { UICheckbox } from 'ui/UICheckbox/UICheckbox'

export interface RetrieveButtonProps {
  hideCheckBox?: boolean
  label?: string
}

export const RetrieveButton = ({
  hideCheckBox = false,
  label = ' Retrieve Myinfo with Singpass'
}: RetrieveButtonProps) => {
  const authoriseUrl = generateSingPassAuthorizeUrl()

  const [checked, setCheked] = useState(false)
  const handleClick = () => {
    setCheked(!checked)
  }

  return (
    <Grid container spacing={1}>
      {!hideCheckBox ? (
        <Grid item xs={12}>
          <FormControlLabel
            sx={{
              '.MuiFormControlLabel-label': {
                color: '#0E1E3F'
              },
              '.MuiSvgIcon-root': {
                fill: '#DBE2EC',
                bgcolor: 'transparent'
              }
            }}
            onClick={handleClick}
            control={<UICheckbox checked={checked} sx={{ height: 40 }} />}
            label='Include Notice of Assessment (NOA) to verify your accredited investor status'
          />
        </Grid>
      ) : null}

      <Grid item xs={12}>
        <Button
          sx={{
            '&.Mui-disabled': {
              bgcolor: '#F0F2F7',
              color: '#A2ACBF'
            }
          }}
          fullWidth
          disabled={!checked && !hideCheckBox}
          variant='contained'
          href={authoriseUrl}
        >
          {label}
        </Button>
      </Grid>
    </Grid>
  )
}
