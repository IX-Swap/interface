import React from 'react'
import { TextField, Grid, Button }from '@material-ui/core'
import axios from 'axios'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import RouterIcon from '@material-ui/icons/Router';

export default function NewDsoForm() {
  
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
  }));
  // local
  const [values, setValues] = React.useState({
    name: '',
    symbol: '',
    decimals: ''
  })

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      createDsoRequest()
        .then(() => {
          setSuccess(true)
          setLoading(false)
        })
    }
  };
  
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const createDsoRequest = async () => {
    const payload = { 
      name: values.name, 
      symbol: values.symbol, 
      decimals: values.decimals 
    }

    // const result = await axios.post('http://localhost:3456/contracts/deploy', payload)
    // console.log(result)

  }

  const handleSubmit = prop => event => {
    console.log(prop, event)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={7}>
        <Grid item xs={12}>
          <TextField
            id="dso-name"
            label="DSO Name"
            required
            helperText="Enter the title of your Digital Security offering, eg: InvestaX Preferred Equity"
            onChange={handleChange('name')}
            value={values.amount}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="dso-symbol"
            label="DSO Ticker Symbol"
            required
            helperText="Enter the unique symbol to identity your Digital Security offering, eg: SGIX01"
            onChange={handleChange('symbol')}
            values={values.symbol}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="dso-decimals"
            label="DSO Share unit Decimal Places"
            helperText="Optionally specify the decimal places of each token or share, eg 2 (1.00) Default: 0"
            onChange={handleChange('decimals')}
            value={values.decimals}
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
                onClick={handleButtonClick}
              >
                {success ? <CheckIcon /> : <RouterIcon />}
              </Fab>
              {loading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                className={buttonClassname}
                disabled={loading}
                onClick={() => handleButtonClick()}
              >
                Deploy DSO Contract
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}