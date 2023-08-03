import React from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { useUpcomingSTOs } from 'app/pages/issuance/hooks/useUpcomingSTOs'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderListingStatus } from 'helpers/tables'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { useTheme } from '@emotion/react'

interface UpcomingSTO {
  logo: string
  tokenName: string
  tokenSymbol: string
  launchDate: string
  status: string
}

const tableCellStyles = {
  paddingLeft: 0,
  paddingRight: 0,
  borderTop: '1px solid #EDF2FA',
  borderBottom: 0
}

export const UpcomingSTOs = () => {
  const LIMIT = 3
  const { data, isLoading } = useUpcomingSTOs(LIMIT)
  const theme = useTheme()

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (typeof data === 'undefined') {
    return null
  }

  return (
    <FieldContainer>
      <Typography variant='h5' color={'otpInput.color'}>
        Calendar
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: '15px' }}>
        <Table aria-label='Upcoming STOs'>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyles}>
                <Typography color={'text.secondary'}>STO</Typography>
              </TableCell>
              <TableCell align='right' sx={tableCellStyles}>
                <Typography color={'text.secondary'}>Status</Typography>
              </TableCell>
              <TableCell align='right' sx={tableCellStyles}>
                <Typography color={'text.secondary'}>Date</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((sto: UpcomingSTO) => (
              <TableRow sx={tableCellStyles} key={sto.tokenSymbol}>
                <TableCell sx={tableCellStyles}>
                  <Box display={'flex'} gap={1} alignItems={'center'}>
                    <DSOLogo
                      size={36}
                      uri={'/dataroom/raw/'}
                      dsoId={sto.logo}
                      variant='circular'
                      sx={{
                        border: `1px solid ${
                          theme.palette.menu.border as string
                        }`
                      }}
                    />
                    <Typography color={'otpInput.color'} ml={1}>
                      {sto.tokenName}
                    </Typography>
                    <Typography color={'#778194'} sx={{ opacity: 0.5 }}>
                      {sto.tokenSymbol}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align='right' sx={tableCellStyles}>
                  {renderListingStatus(sto.status, 'small')}
                </TableCell>
                <TableCell align='right' sx={tableCellStyles}>
                  <Typography color={'text.secondary'}>
                    {formatDateToMMDDYY(sto.launchDate)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FieldContainer>
  )
}
