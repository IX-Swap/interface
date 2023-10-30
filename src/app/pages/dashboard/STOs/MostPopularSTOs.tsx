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
  Box,
  Link
} from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { useMostPopularSTOs } from 'app/pages/issuance/hooks/useMostPopularSTOs'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
// import { formatDecimal } from 'helpers/numbers'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { useTheme } from '@emotion/react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'

interface PopularSTO {
  _id: string
  user: string
  logo: string
  tokenName: string
  tokenSymbol: string
  currency: {
    symbol: symbol
  }
  insight: {
    raisedTotal: number
  }
}

const tableCellStyles = {
  paddingLeft: 0,
  paddingRight: 0,
  borderTop: '1px solid #EDF2FA',
  borderBottom: 0
}

export const MostPopularSTOs = () => {
  const LIMIT = 3
  const { data, isLoading } = useMostPopularSTOs(LIMIT)
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
        Most Popular
      </Typography>
      <Typography color={'text.secondary'} mt={2}>
        Discover which STOs are trending among investors.
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: '15px' }}>
        <Table aria-label='Most Popular STOs'>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyles}>
                <Typography color={'text.secondary'}>STO</Typography>
              </TableCell>
              {/* <TableCell align='right' sx={tableCellStyles}>
                <Typography color={'text.secondary'}>
                  Total Raised Amount
                </Typography>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((sto: PopularSTO) => (
              <TableRow sx={tableCellStyles} key={sto.tokenSymbol}>
                <TableCell sx={tableCellStyles}>
                  <Box display={'flex'} gap={1} alignItems={'center'}>
                    <Link
                      component={AppRouterLinkComponent}
                      to={InvestRoute.view}
                      params={{ dsoId: sto._id, issuerId: sto.user }}
                    >
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
                    </Link>
                    <Typography color={'otpInput.color'} ml={1}>
                      {sto.tokenName}
                    </Typography>
                    <Typography color={'#778194'} sx={{ opacity: 0.5 }}>
                      {sto.tokenSymbol}
                    </Typography>
                  </Box>
                </TableCell>
                {/* <TableCell
                  align='right'
                  sx={{ ...tableCellStyles, color: '#6ABC10' }}
                >
                  {formatDecimal(sto.insight.raisedTotal ?? 0)}{' '}
                  {sto.currency.symbol}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FieldContainer>
  )
}
