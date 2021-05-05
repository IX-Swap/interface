import { Box, Grid, Typography } from '@material-ui/core'
import { EvidenceOfAccreditationList } from 'app/pages/identity/components/UploadDocumentsForm/EvidenceOfAccreditationList'
import { VSpacer } from 'components/VSpacer'
import React from 'react'

export const EvidenceOfAccreditationHelper = () => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Typography>
          <Box component='span' fontWeight='bold'>
            Net Personal Assets
          </Box>{' '}
          Copy of latest investment portfolio holdings, e.g. bank, broker, fund
          manager account statemnts, copy bank statement, CPF statement
        </Typography>
        <VSpacer size='small' />
        <Typography>
          <Box component='span' fontWeight='bold'>
            Income
          </Box>{' '}
          Copy of pay slip, copy of bank statement with salary credit
        </Typography>
      </Grid>
      <Grid item>
        <EvidenceOfAccreditationList />
      </Grid>
    </Grid>
  )
}
