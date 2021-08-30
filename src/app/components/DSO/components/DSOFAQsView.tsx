import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export interface DSOFAQsViewProps {
  dso: DigitalSecurityOffering
  isTitleVisible?: boolean
}

export const DSOFAQsView = (props: DSOFAQsViewProps) => {
  const { dso, isTitleVisible = false } = props

  return (
    <Grid container direction='column' spacing={5}>
      {isTitleVisible && (
        <Grid item>
          <FormSectionHeader title='FAQs' />
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
