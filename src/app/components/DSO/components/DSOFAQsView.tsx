import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { Expandable } from 'app/components/Expandable/Expandable'

export interface DSOFAQsViewProps {
  dso: DigitalSecurityOffering
}

export const DSOFAQsView = ({ dso }: DSOFAQsViewProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h5'>Most Asked Questions</Typography>
      </Grid>

      {dso.faqs.map((item, i) => {
        return (
          <Grid item xs={12} key={item.question}>
            <Expandable
              mainComponent={
                <Typography fontWeight={500} variant='subtitle1'>
                  {item.question}
                </Typography>
              }
              expandedComponent={
                <Typography
                  fontWeight={400}
                  color='textSecondary'
                  variant='body1'
                >
                  {item.answer}
                </Typography>
              }
              px={4}
              py={3}
              spacing={3}
              showArrow
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
