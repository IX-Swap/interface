import { Grid, Typography, Box } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import {
  HoldingsTables,
  tabs
} from 'app/pages/accounts/components/HoldingsTables/HoldingsTables'
import { VSpacer } from 'components/VSpacer'
import React, { useState } from 'react'
import { RootContainer } from 'ui/RootContainer'
import { useTheme } from '@mui/styles'

export const MyHoldings = () => {
  const theme = useTheme()
  const [headerContent, setHeaderContent] = useState<{
    title: string
    subtitle: string
  }>({
    title: tabs[0].headerTitle,
    subtitle: tabs[0].description
  })

  return (
    <Grid container direction='column' spacing={3} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='IX Exchange Orders' showBreadcrumbs />
      </Grid>
      <Grid item marginTop={-1}>
        <RootContainer padding={0}>
          <Box
            p={3}
            bgcolor={theme.palette.backgrounds.light}
            sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
          >
            <Typography variant='h5'>{headerContent.title}</Typography>
            <VSpacer size='small' />
            <Typography variant='body1' color={'text.secondary'}>
              {headerContent.subtitle}
            </Typography>
          </Box>
          <HoldingsTables setHeaderContent={setHeaderContent} />
        </RootContainer>
      </Grid>
    </Grid>
  )
}
