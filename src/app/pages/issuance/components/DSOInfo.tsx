import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { DSONameAndStructure } from 'app/pages/invest/components/DSONameAndStructure'
import { useTheme } from '@material-ui/core/styles'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'

export const DSOInfo = () => {
  const theme = useTheme()
  const {
    params: { dsoId }
  } = useIssuanceRouter()

  const { data } = useDSOById(dsoId)

  if (data === undefined) {
    return null
  }

  return (
    <Grid container justify='center' direction='column' alignItems='center'>
      <Box
        border={1}
        borderRadius='borderRadius'
        borderColor={
          data.status.toLowerCase() === 'approved'
            ? theme.palette.success.main
            : theme.palette.error.main
        }
        p={0.5}
        pl={2.5}
        pr={2.5}
        mb={4}
        color={
          data.status.toLowerCase() === 'approved'
            ? theme.palette.success.main
            : theme.palette.error.main
        }
      >
        <Typography variant='body1'>{data.status}</Typography>
      </Box>
      <DSONameAndStructure dso={data} corporate={data.corporate} />
    </Grid>
  )
}
