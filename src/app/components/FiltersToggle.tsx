import React from 'react'
import { Box, Container, Grid, Typography, ToggleButton } from '@mui/material'
import { FilterList } from '@mui/icons-material'
import { SidebarToggleRenderProps } from 'app/components/SidebarToggle'

export interface FiltersToggleProps extends SidebarToggleRenderProps {}

export const FiltersToggle = (props: FiltersToggleProps) => {
  const { toggle, isOpened } = props

  return (
    <Container>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <ToggleButton onClick={toggle} selected={isOpened} value=''>
            <FilterList />
            <Box px={0.5} />
            <Typography>{isOpened ? 'Hide' : 'Show'} Filters</Typography>
          </ToggleButton>
        </Grid>
      </Grid>
    </Container>
  )
}
