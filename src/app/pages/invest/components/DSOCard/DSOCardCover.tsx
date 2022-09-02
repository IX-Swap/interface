import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DigitalSecurityOffering } from 'types/dso'
import { dsoQueryKeys } from 'config/queryKeys'
import useStyles from './DSOCardCover.style'
import { DSOCardFavorite } from 'app/pages/invest/components/DSOCard/DSOCardFavorite'

export interface DSOCardCoverProps {
  type: 'Primary' | 'TopOffers'
  data: DigitalSecurityOffering
  viewURL: string
}

export const DSOCardCover = (props: DSOCardCoverProps) => {
  const { data } = props
  const classes = useStyles()
  const queryKeys = [dsoQueryKeys.getPromoted, dsoQueryKeys.getApprovedList]

  return (
    <Grid
      container
      alignItems={'center'}
      justifyContent={'space-between'}
      className={classes.container}
    >
      <Grid item className={classes.wrapperType}>
        <Typography className={classes.type}>
          {data.capitalStructure}
        </Typography>
      </Grid>
      <Grid item>
        <DSOCardFavorite dependentQueryKeys={queryKeys} dso={data} />
      </Grid>
    </Grid>
  )
}
