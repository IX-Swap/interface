import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { useStyles } from 'app/pages/invest/components/VirtualAccountBalance/VirtualAccountBalance.styles'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { VirtualAccount } from 'types/virtualAccount'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const VirtualAccountBalance = () => {
  const { list, isLoading } = useVirtualAccount()
  const [selected, setSelected] = useState<'SGD' | 'USD'>('SGD')
  const classes = useStyles()
  const { isMiniLaptop } = useAppBreakpoints()

  const handleSelect = (event: SelectChangeEvent<unknown>) => {
    setSelected(event.target.value as 'SGD' | 'USD')
  }

  useEffect(() => {
    setSelected(
      list !== undefined && list.length > 0 ? list[0].currency : 'SGD'
    )
  }, [isLoading, list])

  if (list === undefined || list.length < 1 || isLoading) {
    return null
  }

  const selectedAccount = list.find(
    (item: VirtualAccount) => item.currency === selected
  )

  const menuItems = list.map(item => (
    <SelectItem key={item._id} value={item.currency}>
      {item.currency}
    </SelectItem>
  ))

  return (
    <Card elevation={0} className={classes.container}>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={2} alignContent='center'>
          <Grid item xs={12} md={4}>
            <Typography className={classes.textContent}>
              Account Number:{' '}
              <Box component='span' fontWeight='bold' ml={1}>
                {selectedAccount?.accountNumber} ({selectedAccount?.currency})
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography className={classes.textContent}>
              Available Balance:{' '}
              <Box component='span' fontWeight='bold' ml={1}>
                {selectedAccount?.currency} {selectedAccount?.balance.available}
              </Box>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            container
            spacing={1}
            justifyContent={isMiniLaptop ? 'flex-start' : 'flex-end'}
          >
            <Grid item>
              <FormControl variant='outlined'>
                <Select
                  value={selected}
                  onChange={handleSelect}
                  className={classes.currencySelect}
                >
                  {menuItems}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to={AccountsRoute.depositCash}
                variant='outlined'
                className={classes.depositLink}
                disableRipple
              >
                DEPOSIT
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
