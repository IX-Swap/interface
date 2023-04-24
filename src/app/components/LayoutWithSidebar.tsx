import React, { ComponentType, createElement } from 'react'
import { Grid } from '@mui/material'
import { useStyles } from 'app/components/LayoutWithSidebar.styles'
import { privateClassNames } from 'helpers/classnames'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { SidebarWrapper, SidebarWrapperKyc } from 'ui/Sidebar/SidebarWrapper'
import { useAppState } from 'app/hooks/useAppState'
import {
  SidebarToggle,
  SidebarToggleRenderProps
} from 'app/components/SidebarToggle'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { RootContainer } from 'ui/RootContainer'
import { useHistory } from 'react-router-dom'

export interface LayoutWithSidebarProps {
  title?: string
  sidebar: ComponentType<any>
  content: ComponentType<any>
  sidebarToggle: ComponentType<SidebarToggleRenderProps>
  secret?: boolean
}

export const LayoutWithSidebar = (props: LayoutWithSidebarProps) => {
  const { title, sidebar, content, sidebarToggle, secret = false } = props
  const classes = useStyles()
  const { location } = useHistory()
  const { isSidebarOpened } = useAppState()
  const { isTablet } = useAppBreakpoints()
  const showSidebar = !isTablet || isSidebarOpened
  const containerClass = secret
    ? privateClassNames(classes.container)
    : classes.container

  return (
    <>
      {location?.pathname?.includes('individuals') ? (
        <RootContainer className={containerClass}>
          <Grid container direction='column'>
            <Grid item xs={12}>
              <PageHeader title={title} />
            </Grid>
            <Grid item container className={classes.container}>
              <Grid item>
                <SidebarWrapperKyc>{createElement(sidebar)}</SidebarWrapperKyc>
              </Grid>
              <Grid className={classes.content}>{createElement(content)}</Grid>
            </Grid>
          </Grid>
        </RootContainer>
      ) : (
        <RootContainer className={containerClass}>
          <Grid container direction='column'>
            <Grid item className={classes.header}>
              <PageHeader styled={false} title={title} />
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
              <Grid className={classes.content}>{createElement(content)}</Grid>
            </Grid>
          </Grid>
        </RootContainer>
      )}
    </>
  )
}
