import React, { useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  useEtherBalanceDispatch,
  useEtherBalanceState,
  getEtherBalance
} from '../../../context/EtherBalanceContext'
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

export default function EtherBalance () {
  const classes = useStyles()

  const etherBalanceState = useEtherBalanceState()
  const etherBalanceDispatch = useEtherBalanceDispatch()

  const [addressValue, setAddressValue] = useState('')

  function callEtherBalanceAction (address) {
    setAddressValue(address)
    getEtherBalance(etherBalanceDispatch, address)
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
          </form>
          {etherBalanceState.error ? (
            etherBalanceState.error
          ) : (
            <pre>{JSON.stringify(etherBalanceState.data, null, 2)}</pre>
          )}
        </Widget>
      </Grid>
    </Grid>
  )
}
