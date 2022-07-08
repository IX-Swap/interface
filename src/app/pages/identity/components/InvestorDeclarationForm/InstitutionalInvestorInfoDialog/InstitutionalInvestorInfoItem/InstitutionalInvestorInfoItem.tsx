import React, { ReactElement } from 'react'
import { Grid, Typography } from '@mui/material'

interface InstitutionalInvestorInfoItemProps {
  index: number | string
  text: string
  children?: ReactElement
}

export const InstitutionalInvestorInfoItem = ({
  index,
  text,
  children
}: InstitutionalInvestorInfoItemProps) => {
  return (
    <Grid item>
      <Typography color={'text.secondary'} fontWeight={500}>
        <Grid container flexWrap={'nowrap'}>
          <Grid item mr={0.5}>
            {typeof index === 'number' ? `${index}.` : index}
          </Grid>
          <Grid item container direction={'column'} spacing={2}>
            <Grid item>{text}</Grid>
            {children !== undefined && (
              <Grid item container direction={'column'} spacing={2}>
                {children}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Typography>
    </Grid>
  )
}
