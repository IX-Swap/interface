import React, { ComponentType, createElement } from 'react'
import { Grid } from '@mui/material'
import { useStyles } from 'app/components/LayoutWithSidebar.styles'
import { privateClassNames } from 'helpers/classnames'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { SidebarWrapper } from 'ui/Sidebar/SidebarWrapper'
import { useAppState } from 'app/hooks/useAppState'
import {
  SidebarToggle,
  SidebarToggleRenderProps
} from 'app/components/SidebarToggle'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { RootContainer } from 'ui/RootContainer'

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
  const { isSidebarOpened } = useAppState()
  const { isTablet } = useAppBreakpoints()
  const showSidebar = !isTablet || isSidebarOpened
  const containerClass = secret
    ? privateClassNames(classes.container)
    : classes.container

  return (
    <RootContainer className={containerClass}>
      <Grid container direction='column'>
        <Grid item className={classes.header}>
          <PageHeader isNew={false} title={title} />
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
  )
}
