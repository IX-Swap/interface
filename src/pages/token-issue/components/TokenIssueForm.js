import React from 'react'
import { TextField, Grid, Button }from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import RouterIcon from '@material-ui/icons/Router'

import {
  issueTokens,
  useTokenIssueState,
  useTokenIssueDispatch
} from '../../../context/TokenIssueContext'

export default function TokenIssueForm (props) {
  const tokenIssueState = useTokenIssueState()
  const tokenIssueDispatch = useTokenIssueDispatch()

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }))

  const [values, setValues] = React.useState({
    tokenHolder: '',
    symbol: '',
    amount: 0
  })
  const classes = useStyles()

  const buttonClassname = clsx({
    [classes.buttonSuccess]: tokenIssueState.success,
  });

  const handleButtonClick = () => {
    if (!tokenIssueState.isLoading) {
      issueTokens(
        tokenIssueDispatch,
        values.tokenHolder,
        values.symbol,
        values.amount
      ).then(() => {
        setValues( { tokenHolder: '', symbol: '', amount: ''})
      })
    }
  };
  
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <form>
      <Grid container spacing={7}>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item>
              <TextField
                id="token-symbol"
                label="Symbol"
                required
                helperText="The symbol of the token contract."
                onChange={handleChange('symbol')}
                value={values.symbol}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                id="token-amount"
                label="Amount"
                required
                helperText="The amount of tokens to be issued."
                onChange={handleChange('amount')}
                value={values.amount}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="token-holder"
            label="Recipient's Address"
            required
            helperText="
              The account address to which the tokens will 
              be issued. The default account address is: 
              0x05d3e6b6b6ce037c96cafb9a8259451bf23f3e02"
            onChange={handleChange('tokenHolder')}
            value={values.tokenHolder}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 30 }}>
          <div className={classes.root}>
            <div className={classes.wrapper}>
              <Fab
                aria-label="save"
                color="primary"
                className={buttonClassname}
              >
                {tokenIssueState.success ? <CheckIcon /> : <RouterIcon />}
              </Fab>
              {tokenIssueState.isLoading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                className={buttonClassname}
                disabled={tokenIssueState.isLoading}
                onClick={handleButtonClick}
              >
                Issue Tokens
              </Button>
            </div>
            { tokenIssueState.error || tokenIssueState.message }
          </div>
        </Grid>
      </Grid>
    </form>
  );
}