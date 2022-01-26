import { alpha } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

export interface Props {
  value: number
  transaction: 'buy' | 'sell'
  barOrigin: 'left' | 'right'
}

export const useStyles = makeStyles(theme => {
  const getBar = ({ value, transaction, barOrigin }: Props) => {
    const barColor =
      transaction === 'sell'
        ? alpha(theme.palette.error.main, 0.12)
        : alpha(theme.palette.success.main, 0.12)
    return `linear-gradient(${
      barOrigin === 'right' ? '270deg' : '90deg'
    }, ${barColor} ${value}%, rgba(255,255,255,0) ${value}%, rgba(255,255,255,0) 100%)`
  }
  return {
    tableRow: {
      position: 'relative',
      background: getBar
    }
  }
})
