import React, { ComponentType, createElement } from 'react'
import { Grid } from '@mui/material'
import { useStyles } from './LayoutWithFilter.styles'
import { privateClassNames } from 'helpers/classnames'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
// import { SidebarWrapper } from 'ui/Sidebar/SidebarWrapper'
import { RootContainer } from 'ui/RootContainer'

export interface LayoutWithFilterProps {
  title?: string
  filter: ComponentType<any>
  content: ComponentType<any>
  secret?: boolean
}

export const LayoutWithFilter = (props: LayoutWithFilterProps) => {
  const {
    title,
    // filter,
    content,
    secret = false
  } = props
  const classes = useStyles()

  const containerClass = secret
    ? privateClassNames(classes.container)
    : classes.container

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title={title} />
      </Grid>
      <RootContainer className={containerClass}>
        <Grid container direction='column'>
          {/* <Grid item>
            <SidebarWrapper>{createElement(filter)}</SidebarWrapper>
          </Grid> */}
          <Grid className={classes.content}>{createElement(content)}</Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
