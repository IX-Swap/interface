import { Box, Paper, Typography } from '@mui/material'
import { LandingPageItemProps } from 'app/components/LandingPage/LandingPageItem'
import React from 'react'
import OrangeEllipse from 'assets/ellipse-314.svg'
import PurpleSquare from 'assets/purple-square.svg'
import PurpleEllipse from 'assets/purple-ellipse.svg'
import BlueEllipse from 'assets/blue-ellipse.svg'
import DarkPurpleSquare from 'assets/dark-purple-square.svg'
import { AppRouterLink } from 'components/AppRouterLink'
import { getCurrentLocationData } from 'hooks/location/utils'
import { safeGeneratePath } from 'helpers/router'
import { VSpacer } from 'components/VSpacer'
import { useAuthorizerPendingItems } from 'app/pages/authorizer/hooks/useAuthorizerPendingItems'

export const dataCardBgList = [
  `url("${OrangeEllipse}") no-repeat bottom right, linear-gradient(180deg, #E94D3E 0%, #EAA140 100%)`,
  `url("${PurpleSquare}") no-repeat bottom right, linear-gradient(180deg, #3E82E9 0%, #548AF3 100%)`,
  `url("${PurpleEllipse}") no-repeat bottom right, linear-gradient(180deg, #1D1EB4 0%, #B6288E 100%)`,
  `url("${BlueEllipse}") no-repeat bottom right, linear-gradient(180deg, #4764ED 0%, #6DCCF7 100%)`,
  `url("${DarkPurpleSquare}") no-repeat bottom right, linear-gradient(180deg, #1D1EB4 0%, #932AB8 100%)`
]

export const DataCard = (props: LandingPageItemProps) => {
  const {
    link: { path, label },
    variant = 1
  } = props
  const category = getCurrentLocationData(safeGeneratePath(path, {})).feature
  const { total, status } = useAuthorizerPendingItems(category as any)

  return (
    <AppRouterLink to={path}>
      <Paper
        elevation={0}
        style={{
          height: 270,
          width: 170,
          margin: '0 auto',
          background: dataCardBgList[variant],
          boxShadow: '0px 4px 12px rgba(170, 170, 170, 0.25)',
          padding: '24px 16px'
        }}
      >
        <Box height={90}>
          <Typography variant='h6' style={{ color: '#FFF', fontSize: '14px' }}>
            {label}
          </Typography>
          <VSpacer size='small' />
          <Typography variant='h6' style={{ color: '#FFF', fontSize: '14px' }}>
            Pending Items
          </Typography>
        </Box>
        {status !== 'loading' && (
          <Typography variant='h6' style={{ color: '#FFF', fontSize: '64px' }}>
            {total > 999 ? 999 : total}
          </Typography>
        )}
      </Paper>
    </AppRouterLink>
  )
}
