import React from 'react'
import cn from 'classnames'
import { Box, Typography, useTheme } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { Asset } from 'types/tokenBalance'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { ReactComponent as USDTIcon } from 'assets/icons/stablecoins/usdt.svg'
import { ReactComponent as USDCIcon } from 'assets/icons/stablecoins/usdc.svg'

interface SecurityTokenSelectItemProps {
  sto: Asset
}

export const SecurityTokenSelectItem = ({
  sto
}: SecurityTokenSelectItemProps) => {
  const theme = useTheme()

  const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      color: `${theme.palette.primary.main} !important`,
      '&:hover': {
        '& $child': {
          color: 'inherit !important'
        },
        '& $network': {
          backgroundColor: theme.palette.paginationItem.borderHover
        }
      }
    },
    child: {},
    logo: { border: `1px solid ${theme.palette.menu.border}` },
    symbol: { color: theme.palette.tooltip.color },
    network: {
      backgroundColor: '#F0F2F7B2',
      borderRadius: '4px',
      color: theme.palette.tooltip.color,
      padding: '4px 8px'
    }
  }))

  const classes = useStyles()
  const Icon = sto?.symbol === 'USDC' ? USDCIcon : USDTIcon

  return (
    <Box className={classes.container}>
      {sto?.symbol === 'USDC' || sto?.symbol === 'USDT' ? (
        <Icon style={{ height: 22 }} />
      ) : (
        <DSOLogo
          size={22}
          uri={'/dataroom/raw/'}
          dsoId={sto?.logo}
          variant='circular'
          className={classes.logo}
        />
      )}

      <Typography className={cn([classes.symbol, classes.child])}>
        {sto?.symbol}
      </Typography>
      <Typography className={classes.child}>{sto?.name}</Typography>
      <Box className={cn([classes.network, classes.child])}>
        {sto?.network?.name}
      </Box>
    </Box>
  )
}
