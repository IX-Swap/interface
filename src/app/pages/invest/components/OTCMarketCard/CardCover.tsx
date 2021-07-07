import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import useStyles from 'app/pages/invest/components/OTCMarketCard/CardCover.style'

export interface CardCoverProps {
  type: 'Primary' | 'OTC'
  data: DigitalSecurityOffering
  viewURL: string
}

export const CardCover = (props: CardCoverProps) => {
  const { data, type } = props
  const classes = useStyles()

  return (
    <Box>
      <Grid container direction='column' className={classes.cover}>
        <Grid item>
          <Typography className={classes.title}>{data.tokenName}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.company}>
            {/* TODO Add value for OTC when backend api extends */}
            {data.corporate.companyLegalName}
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
