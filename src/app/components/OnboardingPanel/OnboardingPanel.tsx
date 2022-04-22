import React from 'react'
import classnames from 'classnames'
import { Grid, Box, Drawer, IconButton } from '@mui/material'
import { useStyles } from 'app/components/OnboardingPanel/OnboardingPanel.styles'
import { ChevronRight, ChevronLeft } from '@mui/icons-material'
import { useOnboardingPanel } from 'app/hooks/onboarding/useOnboardingPanel'
import { BottomPanel } from 'app/components/OnboardingPanel/BottomPanel'
import { TopPanel } from 'app/components/OnboardingPanel/TopPanel'

export const OnboardingPanel = () => {
  const { panel, drawer, drawerPaper, drawerClose, drawerOpen, toggleButton } =
    useStyles()

  const { open, setOpen } = useOnboardingPanel()

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <Drawer
      variant='permanent'
      open={open}
      anchor='right'
      className={drawer}
      classes={{
        paper: classnames(drawerPaper, {
          [drawerClose]: !open,
          [drawerOpen]: open
        })
      }}
    >
      <Box className={panel}>
        <IconButton
          size='small'
          className={toggleButton}
          onClick={handleToggle}
        >
          {open ? (
            <ChevronRight style={{ width: 32, height: 32 }} />
          ) : (
            <ChevronLeft style={{ width: 32, height: 32 }} />
          )}
        </IconButton>
        <Grid container direction='column'>
          <Grid item>
            <TopPanel />
          </Grid>
          <Grid item>
            <BottomPanel />
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  )
}
