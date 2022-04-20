import React from 'react'
import { Grid } from '@mui/material'
import { Dropdown } from 'app/components/Header/components/Dropdown/Dropdown'
import { TwoFADropdownTrigger } from 'app/components/Header/components/TwoFADropdown/TwoFADropdownTrigger'
import { TwoFADropdownContent } from 'app/components/Header/components/TwoFADropdown/TwoFADropdownContent/TwoFADropdownContent'

export const TwoFADropdown = () => {
  return (
    <Grid item>
      <Dropdown trigger={TwoFADropdownTrigger} content={TwoFADropdownContent} />
    </Grid>
  )
}
