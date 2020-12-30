import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { renderStringToHTML } from 'app/components/DSO/utils'
import useStyles from './DSOCardCover.styles'
import { Button } from '@material-ui/core'

export interface DSOCardCoverProps {
  dso: DigitalSecurityOffering
  viewURL: string
}

export const DSOCardCover = (props: DSOCardCoverProps) => {
  const { dso, viewURL } = props
  const classes = useStyles()

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
          <Typography>
            <div className={classes.introduction}>
              {renderStringToHTML(dso.introduction)}
            </div>
          </Typography>
        </Grid>
        <Grid item>
          <Button
            component={AppRouterLinkComponent}
            to={viewURL}
            params={{ dsoId: dso._id, issuerId: dso.createdBy }}
            variant='outlined'
            color='primary'
          >
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
