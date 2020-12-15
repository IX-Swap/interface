import React from 'react'
import { Typography } from '@material-ui/core'

export const W8BEN = () => {
  return (
    <>
      <Typography
        component='span'
        color='primary'
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() =>
          window.open('https://www.irs.gov/pub/irs-pdf/fw8ben.pdf')
        }
      >
        W-8BEN
      </Typography>
      <Typography component='span'>/</Typography>
      <Typography
        component='span'
        color='primary'
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() =>
          window.open('https://www.irs.gov/pub/irs-pdf/fw8bene.pdf')
        }
      >
        W-8BEN-E
      </Typography>
    </>
  )
}
