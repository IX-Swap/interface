import React, { useState } from 'react'
import {
  Grid,
  Paper,
  Box,
  TextField,
  FormControl,
  Button,
  // TableCell,
  // TableRow,
  // TableBody,
  // Table,
  // TableContainer,
  // TableHead,
  Typography,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'
import useStyles from 'pages/exchange/styles'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@material-ui/core/styles'

export default function Orderbook ({ state, setMarket }) {
  const {
    handleChange,
    handleChangeIndex,
    theme,
    classes,
    value
  } = useOrderbookLogic()

  return (
    <Paper className={[classes.root, classes.paper]} elevation={0}>
      <AppBar position='static' color='default' elevation={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='BUY' {...a11yProps(0)} />
          <Tab label='SELL' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Buy />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Sell />
        </TabPanel>
      </SwipeableViews>
    </Paper>
  )
}

function Buy () {
  const classes = useStyles()

  const { price, amount } = useOrderbookLogic()
  return (
    <Grid container justify='space-between'>
      <Grid item>
        <Box m={1}>
          <Button className={classes.bidButton}>
            <b>BUY</b>
          </Button>
        </Box>
      </Grid>
      <Grid item>
        <Box m={1}>
          <FormControl>
            <TextField
              id='order-amount'
              label='AMOUNT'
              style={{ width: 200 }}
              type='number'
              size='small'
              value={amount}
              InputLabelProps={{
                shrink: true
              }}
              variant='outlined'
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item>
        <Box m={1}>
          <FormControl>
            <TextField
              id='order-price'
              style={{ width: 200 }}
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
        </Box>
      </Grid>
    </Grid>
  )
}

function Sell () {
  const classes = useStyles()

  const { price, amount } = useOrderbookLogic()
  return (
    <Grid container justify='space-between'>
      <Grid item>
        <Box m={1}>
          <FormControl>
            <TextField
              id='order-amount'
              label='AMOUNT'
              style={{ width: 200 }}
              type='number'
              size='small'
              value={amount}
              InputLabelProps={{
                shrink: true
              }}
              variant='outlined'
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item>
        <Box m={1}>
          <FormControl>
            <TextField
              id='order-price'
              style={{ width: 200 }}
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
        </Box>
      </Grid>
      <Grid item>
        <Box m={1}>
          <Button className={classes.askButton}>
            <b>SELL</b>
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

function useOrderbookLogic () {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const [price, setPrice] = useState()
  const [amount] = useState()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = index => {
    setValue(index)
  }

  const handlePrice = ev => setPrice(ev.target.price)
  const handleAmount = ev => handleAmount(ev.target.price)

  return {
    price,
    amount,
    handleAmount,
    handlePrice,
    handleChange,
    handleChangeIndex,
    value,
    classes,
    theme
  }
}

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}
