import React from 'react'
import { Grid } from '@material-ui/core'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { DSOCardWrapperSkeleton } from './DSOCardWrapperSkeleton'

export interface DSOCardWrapperProps {
  children: JSX.Element
  isLoading: boolean
}

export const DSOCardWrapper = ({
  children,
  isLoading
}: DSOCardWrapperProps) => {
  return (
    <Grid item xs={12} md={3}>
      <InsightCard>
        {isLoading ? <DSOCardWrapperSkeleton /> : children}
      </InsightCard>
    </Grid>
  )
}

DSOCardWrapper.defaultProps = {
  isLoading: true
}
