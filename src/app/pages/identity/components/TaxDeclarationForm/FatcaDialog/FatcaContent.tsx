import { Box, Typography } from '@mui/material'
import React from 'react'
import { useStyles } from 'app/pages/identity/components/TaxDeclarationForm/FatcaDialog/Fatca.styles'

export const FatcaContent = () => {
  const style = useStyles()
  return (
    <Box>
      <Typography className={style.text}>
        1. You were born in US, Puerto Rico, Guam or the &nbsp;&nbsp;&nbsp; US
        Virgin Islands;
      </Typography>
      <Typography className={style.text}>
        2. Your parent is a US citizen;
      </Typography>
      <Typography className={style.text}>
        3. You have been naturalized as a US citizen.
      </Typography>
    </Box>
  )
}
