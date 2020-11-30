import React, { ComponentType, createElement, memo } from 'react'
import { Container, Grid } from '@material-ui/core'
import { useStyles } from 'v2/app/components/LayoutWithSidebar.styles'
import { privateClassNames } from 'v2/helpers/classnames'

export interface LayoutWithSidebarProps {
  sidebar: ComponentType<any>
  content: ComponentType<any>
  secret?: boolean
}

export const LayoutWithSidebar = memo(
  (props: LayoutWithSidebarProps) => {
    const { sidebar, content, secret = false } = props
    const classes = useStyles()

    const containerClass = secret
      ? privateClassNames(classes.container)
      : classes.container

    return (
      <Grid container className={containerClass}>
        <Grid className={classes.sidebar}>{createElement(sidebar)}</Grid>
        <Grid className={classes.content}>
          <Container>{createElement(content)}</Container>
        </Grid>
      </Grid>
    )
  },
  () => true
)
