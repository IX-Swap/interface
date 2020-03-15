import React, { useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  useTokenBalanceDispatch,
  useTokenBalanceState,
  getTokenBalance
} from '../../../context/TokenBalanceContext'
import Widget from '../../../components/Widget/Widget'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 700
    }
  },
  panel: {
    marginTop: '25px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))

export default function TokenBalance () {
  const classes = useStyles()

  const tokenBalanceState = useTokenBalanceState()
  const tokenBalanceDispatch = useTokenBalanceDispatch()

  const [addressValue, setAddressValue] = useState('')
  const [symbolValue, setSymbolValue] = useState('')

  function callTokenBalanceAction (address, symbol) {
    setAddressValue(address)
    setSymbolValue(symbol)
    getTokenBalance(tokenBalanceDispatch, address, symbol)
  }
  return (
    <Grid container>
      <Grid item className={classes.panel}>
        <Widget disableWidgetMenu>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              id='outlined-basic'
              label='Get ether balance of address'
              value={addressValue}
              onChange={e => callEtherBalanceAction(e.target.value)}
              margin='normal'
              placeholder='0x..'
              type='string'
              fullWidth
            />
            <TextField
              id='outlined-basic'
              label='Token Symbol'
              value={symbolValue}
              onChange={e => callTokenBalanceAction(e.target.value)}
              margin='normal'
              placeholder='0x..'
              type='string'
              fullWidth
            />
          </form>
          {tokenBalanceState.error ? (
            tokenBalanceState.error
          ) : (
            <pre>{JSON.stringify(tokenBalanceState.data, null, 2)}</pre>
          )}
        </Widget>
      </Grid>
    </Grid>
  )
}
