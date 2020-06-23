import React, { useState } from 'react'

import {
  AppBar,
  Tabs,
  Tab,
  FormControl,
  TextField,
  Grid,
  Button,
  Typography,
  Box,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody
} from '@material-ui/core'

import useStyles from './styles'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles'

export default function Orderbook ({ book }) {
  const { handleChange, theme, classes, value } = useOrderbookLogic()

  return (
    <Paper className={classes.paper} elevation={0}>
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
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Buy />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Sell />
      </TabPanel>
      <Grid container spacing={3} justify='center'>
        <Grid item sm={5} md={5} lg={5}>
          <BuySide side={book.bid} />
        </Grid>
        <Grid item sm={5} md={5} lg={5}>
          <SellSide side={book.ask} />
        </Grid>
      </Grid>
    </Paper>
  )
}

function Buy () {
  const classes = useStyles()

  const { price, amount } = useOrderbookLogic()
  return (
    <Grid container justify='center'>
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
        </Box>
      </Grid>
      <Grid item>
        <Box m={1}>
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
        </Box>
      </Grid>
    </Grid>
  )
}

function Sell () {
  const classes = useStyles()

  const { price, amount } = useOrderbookLogic()
  return (
    <Grid container justify='center'>
      <Grid item>
        <Box m={1}>
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
        </Box>
      </Grid>
      <Grid item>
        <Box m={1}>
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

function BuySide ({ side }) {
  const classes = useStyles()

  return (
    <Grid container justify='center'>
      <TableContainer>
        <Table
          size='small'
          aria-label='list of the markets'
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              <TableCell align='right'>
                <b>AMOUNT</b>
              </TableCell>
              <TableCell align='right'>
                <b>PRICE</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {side.map((o, i) => (
              <TableRow key={i} className={classes.tableRow}>
                <TableCell align='right'>{o.amount}</TableCell>
                <TableCell align='right'>{o.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

function SellSide ({ side }) {
  const classes = useStyles()

  return (
    <Grid container justify='center'>
      <TableContainer>
        <Table
          size='small'
          aria-label='list of the markets'
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              <TableCell align='left'>
                <b>PRICE</b>
              </TableCell>
              <TableCell align='left'>
                <b>AMOUNT</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {side.map((o, i) => (
              <TableRow key={i} className={classes.tableRow}>
                <TableCell align='left'>{o.price}</TableCell>
                <TableCell align='left'>{o.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

  const handlePrice = ev => setPrice(ev.target.price)
  const handleAmount = ev => handleAmount(ev.target.price)

  return {
    price,
    amount,
    handleAmount,
    handlePrice,
    handleChange,
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
