import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { AppRouterLink } from 'components/AppRouterLink'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { renderStringToHTML, truncateString } from 'app/components/DSO/utils'
import { DSOCardContent } from 'app/components/DSO/components/DSOOfferCard/DSOCardContent'
import useStyles from './DSOOfferCard.styles'

export interface DSOOfferCardProps {
  dso: DigitalSecurityOffering
  viewURL: string
}
export const DSOOfferCard = (props: DSOOfferCardProps) => {
  const { dso, viewURL } = props
  const classes = useStyles()

  const introduction = truncateString(dso.introduction, 120, true)
  const capitalStructure = truncateString(dso.capitalStructure, 10, false)

  return (
    <Box px={2}>
      <Card className={classes.root} variant='outlined'>
        <Grid
          className={classes.cover}
          container
          spacing={3}
          direction='column'
        >
          <Grid item>
            <DSOLogo
              size={80}
              dsoId={dso._id}
              variant='rounded'
              className={classes.logo}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.title}>{dso.tokenName}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.introduction}>
              {renderStringToHTML(introduction)}
              <AppRouterLink
                to={viewURL}
                params={{ dsoId: dso._id, issuerId: dso.createdBy }}
                underline='hover'
                color='primary'
              >
                Learn More
              </AppRouterLink>
            </Typography>
          </Grid>
        </Grid>
        <CardContent className={classes.content}>
          <DSOCardContent dso={dso} />
        </CardContent>
        <Typography className={classes.capitalStructure}>
          {capitalStructure}
        </Typography>
      </Card>
    </Box>
  )
}
