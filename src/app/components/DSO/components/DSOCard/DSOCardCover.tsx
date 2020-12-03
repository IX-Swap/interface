import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { AppRouterLink } from 'components/AppRouterLink'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { renderStringToHTML, truncateString } from 'app/components/DSO/utils'
import useStyles from './DSOCardCover.styles'

export interface DSOCardCoverProps {
  dso: DigitalSecurityOffering
  viewURL: string
}
export const DSOCardCover = (props: DSOCardCoverProps) => {
  const { dso, viewURL } = props
  const classes = useStyles()

  const introduction = truncateString(dso.introduction, 100, true)

  return (
    <Box p={1.5} display='flex' alignSelf='strech'>
      <Grid container spacing={3} direction='column' className={classes.cover}>
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
    </Box>
  )
}
