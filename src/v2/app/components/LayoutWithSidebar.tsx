import React, { ComponentType, createElement, memo } from 'react'
import { Container, Grid } from '@material-ui/core'
import { useStyles } from 'v2/app/components/LayoutWithSidebar.styles'

export interface LayoutWithSidebarProps {
  sidebar: ComponentType<any>
  content: ComponentType<any>
}

export const LayoutWithSidebar = memo(
  (props: LayoutWithSidebarProps) => {
    const { sidebar, content } = props
    const classes = useStyles()

    return (
      <Grid container>
        <Grid item xs={3} className={classes.sidebar}>
          <Container>{createElement(sidebar)}</Container>
        </Grid>
        <Grid item xs={9}>
          <Container>{createElement(content)}</Container>
        </Grid>
      </Grid>
    )
  },
  () => true
)
