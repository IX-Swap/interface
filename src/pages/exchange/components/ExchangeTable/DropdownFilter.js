import React from 'react'

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles'

import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'

const DropdownFilter = props => {
  const { setSide, setPair } = props
  const classes = useStyles()
  const { items = [] } = props

  const sides = [
    {
      side: 'BID',
      label: 'Sell'
    },
    {
      side: 'ASK',
      label: 'Buy'
    }
  ]

  const _handleSetPair = evt => {
    const target = evt.target
    const value = target.value

    setPair(value)
  }

  const _handleSetSide = evt => {
    const target = evt.target
    const value = target.value

    setSide(value)
  }

  return (
    <section className={classes.dropdownFilter}>
      <Typography className={classes.filterTitle} variant='h3'>
        Pair
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='grouped-native-select'>Pair</InputLabel>
        <Select defaultValue='' id='grouped-select' onChange={_handleSetPair}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {items.map(option => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography className={classes.filterTitle} variant='h3'>
        Side
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='grouped-select'>All</InputLabel>
        <Select defaultValue='' id='grouped-select' onChange={_handleSetSide}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {sides.map(option => (
            <MenuItem key={option.side} value={option.side}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </section>
  )
}

export default DropdownFilter
