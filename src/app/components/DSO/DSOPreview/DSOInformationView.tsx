import React, { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { LabelledValue } from 'components/LabelledValue'
import useStyles from 'app/components/DSO/components/styles'
import { VSpacer } from 'components/VSpacer'

export interface DSOInformationViewProps {
  dso: DigitalSecurityOffering
  isNewThemeOn?: boolean
}

export const DSOInformationView = ({
  dso,
  isNewThemeOn = false
}: DSOInformationViewProps) => {
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={2}
      direction='column'
      className={isNewThemeOn ? classes.newDSOViewItemStyles : ''}
    >
      {isNewThemeOn ? (
        <Fragment>
          <Grid item>
            <Typography
              variant={'h4'}
              color={'primary'}
              style={{ fontWeight: 700 }}
            >
              Information Profile
            </Typography>
            <VSpacer size={'small'} />
          </Grid>

          <Grid container item>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Company Information'
                value={renderStringToHTML(dso.introduction)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Business Model'
                value={renderStringToHTML(dso.businessModel)}
              />
            </Grid>
          </Grid>

          <Grid container item>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Use of Proceeds'
                value={renderStringToHTML(dso.useOfProceeds)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Fundraising Milestones'
                value={renderStringToHTML(dso.fundraisingMilestone)}
              />
            </Grid>
          </Grid>
        </Fragment>
      ) : (
        <Fragment>
          <Grid item>
            <LabelledValue
              label='Company Information'
              value={renderStringToHTML(dso.introduction)}
              align='justify'
            />
          </Grid>

          <Grid item>
            <LabelledValue
              label='Business Model'
              value={renderStringToHTML(dso.businessModel)}
              align='justify'
            />
          </Grid>

          <Grid item>
            <LabelledValue
              label='Use of Proceeds'
              value={renderStringToHTML(dso.useOfProceeds)}
              align='justify'
            />
          </Grid>

          <Grid item>
            <LabelledValue
              label='Fundraising Milestones'
              value={renderStringToHTML(dso.fundraisingMilestone)}
              align='justify'
            />
          </Grid>
        </Fragment>
      )}
    </Grid>
  )
}
