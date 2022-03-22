import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import useStyles from 'app/pages/invest/components/OTCMarketCard/CardCover.style'
import { DSOFavorite } from 'app/components/DSOFavorite'
import { dsoQueryKeys } from 'config/queryKeys'

export interface CardCoverProps {
  type: 'Primary' | 'OTC' | 'TopOffers'
  data: DigitalSecurityOffering
  viewURL: string
}

export const CardCover = (props: CardCoverProps) => {
  const { data, type } = props
  const classes = useStyles()
  const queryKeys = []

  if (type === 'Primary') {
    queryKeys.push(dsoQueryKeys.getPromoted)
  }

  if (type === 'TopOffers') {
    queryKeys.push(dsoQueryKeys.getPromoted)
    queryKeys.push(dsoQueryKeys.getApprovedList)
  }

  return (
    <Box>
      <Grid container direction='column' className={classes.cover}>
        {type !== 'OTC' ? (
          <Grid item className={classes.favorite}>
            <DSOFavorite dependentQueryKeys={queryKeys} dso={data} />
          </Grid>
        ) : null}
        <Grid item>
          <Typography className={classes.title}>{data.tokenName}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.company}>
            {/* TODO Add value for OTC when backend api extends */}
          </Typography>
        </Grid>
        <Grid item>
          <DSOLogo
            uri={type === 'OTC' ? '/dataroom/raw/' : undefined}
            size={62}
            dsoId={type === 'Primary' ? data._id : data.logo}
            variant='rounded'
            className={classes.logo}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
