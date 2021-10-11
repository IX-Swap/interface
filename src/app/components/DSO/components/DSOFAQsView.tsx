import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { VSpacer } from 'components/VSpacer'
import useStyles from 'app/components/DSO/components/styles'

export interface DSOFAQsViewProps {
  dso: DigitalSecurityOffering
  isTitleVisible?: boolean
  isNewThemeOn?: boolean
}

export const DSOFAQsView = (props: DSOFAQsViewProps) => {
  const classes = useStyles()
  const { dso, isTitleVisible = false, isNewThemeOn = false } = props

  return (
    <Grid
      container
      direction='column'
      spacing={5}
      className={classes.newDSOViewItemStyles}
    >
      {isTitleVisible && (
        <Grid item>
          {isNewThemeOn ? (
            <>
              <Typography
                variant={'h4'}
                color={'primary'}
                style={{ fontWeight: 700 }}
              >
                Frequently Asked Questions
              </Typography>
              <VSpacer size={'small'} />
            </>
          ) : (
            <FormSectionHeader title='FAQs' />
          )}
        </Grid>
      )}

      {dso.faqs.map((item, i) => {
        return (
          <Grid item key={item.question}>
            <Typography variant={'subtitle1'}>
              {i + 1}. {item.question}
            </Typography>
            <Typography
              variant={'body1'}
              style={{ paddingLeft: 16, paddingTop: 16 }}
            >
              {item.answer}
            </Typography>
          </Grid>
        )
      })}
    </Grid>
  )
}
