import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DigitalSecurityOffering, DsoFAQItem } from 'types/dso'

export interface DSOFAQsViewViewProps {
  dso: DigitalSecurityOffering
}

export const DSOFAQsView = (props: DSOFAQsViewViewProps) => {
  const { dso } = props

  const fakeFAQ: DsoFAQItem[] = [
    {
      question: 'Sample Questions',
      answer:
        'Lorem ipsum dolor sit amet, ' +
        'consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ut labore et dolore magna aliqua.' +
        ' Ut enim ad minim veniam, quis nostrud' +
        ' exercitation ullamco laboris nisi' +
        ' ut aliquip ex ea commodo consequat. ' +
        'Duis aute irure dolor in reprehenderit' +
        ' in voluptate velit esse cillum dolore.'
    },
    {
      question: 'Sample Questions',
      answer:
        'Lorem ipsum dolor sit amet, ' +
        'consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ut labore et dolore magna aliqua.' +
        ' Ut enim ad minim veniam, quis nostrud' +
        ' exercitation ullamco laboris nisi' +
        ' ut aliquip ex ea commodo consequat. ' +
        'Duis aute irure dolor in reprehenderit' +
        ' in voluptate velit esse cillum dolore.'
    },
    {
      question: 'Sample Questions',
      answer:
        'Lorem ipsum dolor sit amet, ' +
        'consectetur adipiscing elit,' +
        ' sed do eiusmod tempor incididunt ' +
        'ut labore et dolore magna aliqua.' +
        ' Ut enim ad minim veniam, quis nostrud' +
        ' exercitation ullamco laboris nisi' +
        ' ut aliquip ex ea commodo consequat. ' +
        'Duis aute irure dolor in reprehenderit' +
        ' in voluptate velit esse cillum dolore.'
    }
  ]

  const realFAQ = dso.faq !== undefined ? dso.faq : fakeFAQ

  return (
    <Grid container direction='column' spacing={5}>
      {realFAQ.map((item, i) => {
        return (
          <Grid item>
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
