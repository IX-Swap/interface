import React from 'react'
import { TextField, Grid, Button } from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import RouterIcon from '@material-ui/icons/Router'

import {
  deployToken,
  useTokenDeployState,
  useTokenDeployDispatch
} from '../../../../context/TokenDeployContext'

export default function TokenDeployForm (props) {
  const tokenDeployState = useTokenDeployState()
  const tokenDeployDispatch = useTokenDeployDispatch()

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative'
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700]
      }
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    }
  }))

  const [values, setValues] = React.useState({
    name: '',
    symbol: '',
    decimals: 0
  })
  const classes = useStyles()

  const buttonClassname = clsx({
    [classes.buttonSuccess]: tokenDeployState.success
  })

  const handleButtonClick = () => {
    if (!tokenDeployState.isLoading) {
      deployToken(
        tokenDeployDispatch,
        values.name,
        values.symbol,
        values.decimals
      ).then(() => {
        setValues({ name: '', symbol: '', decimals: '' })
      })
    }
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <form>
      <Grid container spacing={7}>
        <Grid item xs={12}>
          <TextField
            id='dso-name'
            label='Digital Security Name'
            required
            helperText='Enter the title of your Digital Security, eg: InvestaX Preferred Equity'
            onChange={handleChange('name')}
            value={values.name}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='dso-symbol'
            label='Ticker Symbol'
            required
            helperText='Enter the unique symbol to identity your Digital Security, eg: SGIX01'
            onChange={handleChange('symbol')}
            value={values.symbol}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='dso-decimals'
            label='Unit Decimal Places'
            helperText='Optionally specify the decimal places: example, 2 = 1.00, Default: 0'
            onChange={handleChange('decimals')}
            value={values.decimals}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 30 }}>
          <div className={classes.root}>
            <div className={classes.wrapper}>
              <Fab
                aria-label='save'
                color='primary'
                className={buttonClassname}
              >
                {tokenDeployState.success ? <CheckIcon /> : <RouterIcon />}
              </Fab>
              {tokenDeployState.isLoading && (
                <CircularProgress size={68} className={classes.fabProgress} />
              )}
            </div>
            <div className={classes.wrapper}>
              <Button
                variant='contained'
                color='primary'
                className={buttonClassname}
                disabled={tokenDeployState.isLoading}
                onClick={handleButtonClick}
              >
                Deploy Contract
              </Button>
            </div>
            {tokenDeployState.error || tokenDeployState.message}
          </div>
        </Grid>
      </Grid>
    </form>
  )
}
