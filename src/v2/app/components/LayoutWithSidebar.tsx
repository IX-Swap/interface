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
      <Grid container className={classes.container}>
        <Grid className={classes.sidebar}>{createElement(sidebar)}</Grid>
        <Grid className={classes.content}>
          <Container>{createElement(content)}</Container>
        </Grid>
      </Grid>
    )
  },
  () => true
)
