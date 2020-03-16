import React, { useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Widget from '../../../components/Widget'
import {
  getTransactionInfo,
  useTransactionInfoDispatch,
  useTransactionInfoState
} from '../../../context/TransactionInfoContext'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 700
    }
  },
  panel: {
    marginTop: '25px'
  }
}))

export default function TransactionInfo (props) {
  const classes = useStyles()

  const transactionInfoDispatch = useTransactionInfoDispatch()
  const transactionInfoState = useTransactionInfoState()
  const [txInfoValue, setTxInfoValue] = useState('')

  function getTxInfo (inputValue) {
    setTxInfoValue(inputValue)
    const stringLength = inputValue.split('').length
    if (stringLength > 50) {
      getTransactionInfo(transactionInfoDispatch, inputValue)
    } else if (stringLength > 33 && stringLength < 45) {
      const payload = {
        account: inputValue,
        page: 1
      }
      getTransactionInfo(transactionInfoDispatch, payload)
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid item className={classes.panel}>
        <Widget disableWidgetMenu>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              id='outlined-basic'
              label='Transaction Hash'
              value={txInfoValue}
              onChange={e => getTxInfo(e.target.value)}
              margin='normal'
              placeholder='0x..'
              type='string'
              fullWidth
            />
          </form>
          {transactionInfoState.error ? (
            transactionInfoState.error
          ) : (
            <pre>{JSON.stringify(transactionInfoState.data, null, 2)}</pre>
          )}
        </Widget>
      </Grid>
    </Grid>
  )
}
