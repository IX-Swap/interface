import React, { useState } from 'react'
import {
  Grid,
  Paper,
  Box,
  makeStyles,
  TextField,
  FormControl,
  Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 400,
    padding: 20
  },
  askButton: {
    width: 130,
    backgroundColor: '#C00808',
    color: 'white',
    '&:hover': {
      backgroundColor: '#C00838'
    }
  },
  bidButton: {
    width: 130,
    backgroundColor: '#166814',
    color: 'white',
    '&:hover': {
      backgroundColor: '#164814'
    }
  },
  textField: {
    height: 10,
    width: 50
  }
}))

export default function Orderbook () {
  const classes = useStyles()
  return (
    <Grid item>
      <Paper elevation={0} className={classes.paper}>
        <Box>
          <OrderForm />
        </Box>
      </Paper>
    </Grid>
  )
}

function OrderForm () {
  const classes = useStyles()

  const { price, amount } = useOrderbookLogic()
  return (
    <Grid container justify='space-between'>
      <Grid item>
        <Button className={classes.bidButton}>
          <b>BUY</b>
        </Button>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            id='order-amount'
            label='AMOUNT'
            style={{ width: 150 }}
            type='number'
            size='small'
            value={amount}
            InputLabelProps={{
              shrink: true
            }}
            variant='outlined'
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            id='order-price'
            style={{ width: 150 }}
            label='PRICE'
            type='price'
            value={price}
            size='small'
            InputLabelProps={{
              shrink: true
            }}
            variant='outlined'
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Button className={classes.askButton}>
          <b>SELL</b>
        </Button>
      </Grid>
    </Grid>
  )
}

function useOrderbookLogic () {
  const [price, setPrice] = useState()
  const [amount] = useState()

  const handlePrice = ev => setPrice(ev.target.price)
  const handleAmount = ev => handleAmount(ev.target.price)

  return { price, amount, handleAmount, handlePrice }
}
