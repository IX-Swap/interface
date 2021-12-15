import React from 'react'
import { Grid } from '@material-ui/core'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'

export interface DSOCardWrapperProps {
  children: JSX.Element
  hasValue: boolean
}

export const DSOCardWrapper = ({ children, hasValue }: DSOCardWrapperProps) => {
  if (!hasValue) {
    return null
  }

  return (
    <Grid item xs={12} md={3}>
      <InsightCard>{children}</InsightCard>
    </Grid>
  )
}
