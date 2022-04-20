import React from 'react'
import { Box } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { FirstTable } from 'ui/UIKit/TablesKit/FirstTable/FirstTable'
import { ThirdTable } from 'ui/UIKit/TablesKit/ThirdTable/ThirdTable'
import { SecondTable } from 'ui/UIKit/TablesKit/SecondTable/SecondTable'
import { VSpacer } from 'components/VSpacer'

export const TablesKit = () => {
  const getStyles = (theme: Theme) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#f8f8f8' : '#132A57',
    padding: 30,
    height: '100vh',
    overflow: 'auto'
  })

  return (
    <UIKitThemeWrapper>
      {(theme: Theme) => (
        <Box style={getStyles(theme)}>
          <FirstTable />
          <VSpacer size={'medium'} />
          <SecondTable />
          <VSpacer size={'medium'} />
          <ThirdTable />
        </Box>
      )}
    </UIKitThemeWrapper>
  )
}
