import React from 'react'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { FilterList } from '@material-ui/icons'
import { ToggleButton } from '@material-ui/lab'
import { SidebarToggleRenderProps } from 'app/components/SidebarToggle'

export interface FiltersToggleProps extends SidebarToggleRenderProps {}

export const FiltersToggle = (props: FiltersToggleProps) => {
  const { toggle, isOpened } = props

  return (
    <Container>
      <Grid container justify='flex-end'>
        <Grid item>
          <ToggleButton onClick={toggle} selected={isOpened}>
            <FilterList />
            <Box px={0.5} />
            <Typography>{isOpened ? 'Hide' : 'Show'} Filters</Typography>
          </ToggleButton>
        </Grid>
      </Grid>
    </Container>
  )
}
