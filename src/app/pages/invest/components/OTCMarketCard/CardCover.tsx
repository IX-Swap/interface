import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
// import { renderStringToHTML } from 'app/components/DSO/utils'
import useStyles from 'app/pages/invest/components/OTCMarketCard/CardCover.style'
// import { Button } from '@material-ui/core'
// import { LabelledValue } from 'components/LabelledValue'
// import { abbreviateNumber, formatMoney } from 'helpers/numbers'
// import { VSpacer } from 'components/VSpacer'

export interface CardCoverProps {
  dso: DigitalSecurityOffering
  viewURL: string
}

export const CardCover = (props: CardCoverProps) => {
  const { dso } = props
  const classes = useStyles()

  return (
    <Box>
      <Grid container direction='column' className={classes.cover}>
        <Grid item>
          <Typography className={classes.title}>{dso.tokenName}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.company}>
            {dso.corporate.companyLegalName}
          </Typography>
        </Grid>
        <Grid item>
          <DSOLogo
            size={62}
            dsoId={dso._id}
            variant='rounded'
            className={classes.logo}
          />
        </Grid>
        {/* <Grid item> */}
        {/*  <Button */}
        {/*    className={classes.link} */}
        {/*    component={AppRouterLinkComponent} */}
        {/*    to={viewURL} */}
        {/*    params={{ dsoId: dso._id, issuerId: dso.createdBy }} */}
        {/*    variant='outlined' */}
        {/*    color='primary' */}
        {/*  > */}
        {/*    Learn More */}
        {/*  </Button> */}
        {/* </Grid> */}
      </Grid>
    </Box>
  )
}
