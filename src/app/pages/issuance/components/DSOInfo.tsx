import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { DSONameAndStructure } from 'app/pages/invest/components/DSONameAndStructure'
import { DigitalSecurityOffering } from 'types/dso'
import { CorporateIdentity } from 'types/identity'
import { useTheme } from '@material-ui/core/styles'

export interface DSOInfoProps {
  dso: DigitalSecurityOffering
  corporate: CorporateIdentity
}

export const DSOInfo: React.FC<DSOInfoProps> = ({
  dso,
  corporate
}: DSOInfoProps) => {
  const theme = useTheme()
  return (
    <Grid container justify='center' direction='column' alignItems='center'>
      <Box
        border={1}
        borderRadius='borderRadius'
        borderColor={
          dso.status.toLowerCase() === 'approved'
            ? theme.palette.success.main
            : theme.palette.error.main
        }
        p={0.5}
        pl={2.5}
        pr={2.5}
        mb={6}
        color={
          dso.status.toLowerCase() === 'approved'
            ? theme.palette.success.main
            : theme.palette.error.main
        }
      >
        <Typography variant='body1'>{dso.status}</Typography>
      </Box>
      <DSONameAndStructure dso={dso} corporate={corporate} />
    </Grid>
  )
}
