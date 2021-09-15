import { Paper, Typography } from '@material-ui/core'
import { LandingPageItemProps } from 'app/components/LandingPage/LandingPageItem'
import React from 'react'
import OrangeEllipse from 'assets/ellipse-314.svg'
import PurpleSquare from 'assets/purple-square.svg'
import PurpleEllipse from 'assets/purple-ellipse.svg'
import BlueEllipse from 'assets/blue-ellipse.svg'
import { AppRouterLink } from 'components/AppRouterLink'
import { getCurrentLocationData } from 'hooks/location/utils'
import { safeGeneratePath } from 'helpers/router'
import { VSpacer } from 'components/VSpacer'
import { useAuthorizerPendingItems } from 'app/pages/authorizer/hooks/useAuthorizerPendingItems'

export const DataCard = (props: LandingPageItemProps) => {
  const {
    link: { path, label },
    variant = 1
  } = props
  const category = getCurrentLocationData(safeGeneratePath(path, {})).feature
  const { total, status } = useAuthorizerPendingItems(category as any)
  const getBg = () => {
    let bg
    switch (variant) {
      case 1:
        bg = `url("${OrangeEllipse}") no-repeat bottom right, linear-gradient(180deg, #E94D3E 0%, #EAA140 100%)`
        break
      case 2:
        bg = `url("${PurpleSquare}") no-repeat bottom right, linear-gradient(180deg, #3E82E9 0%, #548AF3 100%)`
        break
      case 3:
        bg = `url("${PurpleEllipse}") no-repeat bottom right, linear-gradient(180deg, #1D1EB4 0%, #B6288E 100%)`
        break
      case 4:
        bg = `url("${BlueEllipse}") no-repeat bottom right, linear-gradient(180deg, #4764ED 0%, #6DCCF7 100%)`
        break
      default:
        bg = `url("${OrangeEllipse}") no-repeat bottom right, linear-gradient(180deg, #E94D3E 0%, #EAA140 100%)`
        break
    }
    return bg
  }
  return (
    <AppRouterLink to={path}>
      <Paper
        elevation={0}
        style={{
          height: 270,
          width: 170,
          margin: '0 auto',
          background: getBg(),
          boxShadow: '0px 4px 12px rgba(170, 170, 170, 0.25)',
          padding: '24px 16px'
        }}
      >
        <Typography variant='h6' style={{ color: '#FFF', fontSize: '14px' }}>
          {label}
        </Typography>
        <VSpacer size='small' />
        <Typography variant='h6' style={{ color: '#FFF', fontSize: '14px' }}>
          Pending Items
        </Typography>
        {status !== 'loading' && (
          <Typography variant='h6' style={{ color: '#FFF', fontSize: '64px' }}>
            {total > 999 ? 999 : total}
          </Typography>
        )}
      </Paper>
    </AppRouterLink>
  )
}
