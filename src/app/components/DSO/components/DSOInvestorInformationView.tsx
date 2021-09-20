import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DSOTeamView } from 'app/components/DSO/DSOPreview/DSOTeamView'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { DigitalSecurityOffering } from 'types/dso'
import { VSpacer } from 'components/VSpacer'
import useStyles from 'app/components/DSO/components/styles'

export interface DSOInvestorInformationViewProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorInformationView = (
  props: DSOInvestorInformationViewProps
) => {
  const { dso } = props
  const classes = useStyles()

  return (
    <Grid container direction='column' spacing={5}>
      <Grid item className={classes.newDSOViewItemStyles}>
        <Typography
          variant={'h4'}
          color={'primary'}
          style={{ fontWeight: 700 }}
        >
          Company Profile
        </Typography>
        <VSpacer size={'small'} />
        {renderStringToHTML(dso.introduction)}
      </Grid>

      <VSpacer size={'medium'} />

      <Grid item className={classes.newDSOViewItemStyles}>
        <Typography
          variant={'h4'}
          color={'primary'}
          style={{ fontWeight: 700 }}
        >
          Business Model
        </Typography>
        <VSpacer size={'small'} />
        {renderStringToHTML(dso.businessModel)}
      </Grid>

      <VSpacer size={'medium'} />

      <Grid item className={classes.newDSOViewItemStyles}>
        <Typography
          variant={'h4'}
          color={'primary'}
          style={{ fontWeight: 700 }}
        >
          Use of Proceeds
        </Typography>
        <VSpacer size={'small'} />
        {renderStringToHTML(dso.useOfProceeds)}
      </Grid>

      <VSpacer size={'medium'} />

      <Grid item className={classes.newDSOViewItemStyles}>
        <Typography
          variant={'h4'}
          color={'primary'}
          style={{ fontWeight: 700 }}
        >
          Fundraising Milestone
        </Typography>
        <VSpacer size={'small'} />
        {renderStringToHTML(dso.fundraisingMilestone)}
      </Grid>

      <VSpacer size={'medium'} />

      <Grid item className={classes.newDSOViewItemStyles}>
        <DSOTeamView dso={dso} isNewThemeOn />
      </Grid>
    </Grid>
  )
}
