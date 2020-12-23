import React, { ComponentType, createElement, memo } from 'react'
import { Container, Grid } from '@material-ui/core'
import { useStyles } from 'app/components/LayoutWithSidebar.styles'
import { privateClassNames } from 'helpers/classnames'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { SidebarWrapper } from 'ui/Sidebar/SidebarWrapper'
import { useAppState } from 'app/hooks/useAppState'
import {
  SidebarToggle,
  SidebarToggleRenderProps
} from 'app/components/SidebarToggle'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { RootContainer } from 'ui/RootContainer'

export interface LayoutWithSidebarProps {
  sidebar: ComponentType<any>
  content: ComponentType<any>
  sidebarToggle: ComponentType<SidebarToggleRenderProps>
  secret?: boolean
}

export const LayoutWithSidebar = memo(
  (props: LayoutWithSidebarProps) => {
    const { sidebar, content, sidebarToggle, secret = false } = props
    const classes = useStyles()
    const { isSidebarOpened } = useAppState()
    const { isTablet } = useAppBreakpoints()
    const showSidebar = !isTablet || isSidebarOpened
    const containerClass = secret
      ? privateClassNames(classes.container)
      : classes.container

    return (
      <Grid container direction='column' className={containerClass}>
        <Grid item className={classes.header}>
          <Container>
            <PageHeader />
          </Container>
        </Grid>
        <Grid item container className={classes.wrapper}>
          {isTablet && (
            <Grid item>
              <SidebarToggle render={sidebarToggle} />
            </Grid>
          )}
          {showSidebar && (
            <Grid item>
              <SidebarWrapper>{createElement(sidebar)}</SidebarWrapper>
            </Grid>
          )}
          <Grid className={classes.content}>
            <RootContainer>{createElement(content)}</RootContainer>
          </Grid>
        </Grid>
      </Grid>
    )
  },
  () => true
)
