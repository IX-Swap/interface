import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'

const Filters = () => {
  const { isTablet } = useAppBreakpoints()
  return (
    <Grid
      container
      spacing={3}
      justifyContent={isTablet ? 'center' : 'flex-end'}
      wrap={isTablet ? undefined : 'nowrap'}
      width={isTablet ? '100%' : 700}
    >
      <Grid item xs={12} md={6}>
        <TextField placeholder='Search' fullWidth />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField placeholder='Another Field' fullWidth />
      </Grid>
      <Grid item xs={6} md={2}>
        <Button variant='contained' fullWidth>
          Action
        </Button>
      </Grid>
    </Grid>
  )
}

interface BackProps {
  alignment?: 'end' | 'start'
}
const Back = ({ alignment = 'start' }: BackProps) => {
  const { isTablet } = useAppBreakpoints()

  return (
    <Box width='100%' height='100%' justifyContent={`flex-${alignment}`}>
      <Button variant='outlined' startIcon={<Icon name='arrow-left' />}>
        <Box component='span' whiteSpace='nowrap'>
          {isTablet ? '' : 'Back to Previous Page'}
        </Box>
      </Button>
    </Box>
  )
}

const DataTitle = () => {
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      spacing={0}
      height='100%'
    >
      <Grid item>
        <Typography variant='h5' whiteSpace='nowrap'>
          Data Label
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='subtitle1'>2,300</Typography>
      </Grid>
    </Grid>
  )
}

export const PageHeaderKit = () => {
  return (
    <UIKitThemeWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PageHeader title='Default' noMargin showBreadcrumbs={false} />
        </Grid>
        <Grid item xs={12}>
          <PageHeader
            title='With End Component'
            noMargin
            endComponent={<Filters />}
            showBreadcrumbs={false}
          />
        </Grid>
        <Grid item xs={12}>
          <PageHeader
            noMargin
            startComponent={<Back />}
            titleComponent={<DataTitle />}
            alignment='center'
            showBreadcrumbs={false}
          />
        </Grid>
        <Grid item xs={12}>
          <PageHeader
            noMargin
            endComponent={<Back alignment='end' />}
            title='End Back Button'
            showBreadcrumbs={false}
          />
        </Grid>
      </Grid>
    </UIKitThemeWrapper>
  )
}
