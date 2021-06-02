import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Popper,
  Typography
} from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'
import { DetailsItem } from 'app/pages/exchange/components/FinancialSummary/DetailsItem'
import React from 'react'

export const MoreDetails = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl !== null ? null : event.currentTarget)
  }

  return (
    <>
      <Button color='primary' size='small' onClick={handleClick}>
        <Box style={{ fontSize: 14, textTransform: 'capitalize' }}>
          More Details
        </Box>{' '}
        <ArrowDropDown />
      </Button>
      <Popper
        id='financial-details'
        open={anchorEl !== null}
        anchorEl={anchorEl}
      >
        <Paper
          elevation={3}
          style={{
            width: 280,
            padding: 16,
            maxHeight: 'calc(100vh - 140px)',
            overflow: 'scroll'
          }}
        >
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Typography variant='subtitle1'>More Details</Typography>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <DetailsItem label='Open' value='$1800.00' />
            </Grid>
            <Grid item>
              <DetailsItem label='Day Range' value='$1810.29 - 1830.00' />
            </Grid>
            <Grid item>
              <DetailsItem label='52 Week Range' value='168.73 - 1900.54' />
            </Grid>
            <Grid item>
              <DetailsItem label='Market Cap' value='$123.03B' />
            </Grid>
            <Grid item>
              <DetailsItem label='Shares Outstanding' value='959.43M' />
            </Grid>
            <Grid item>
              <DetailsItem label='Public Float' value='771.7M' />
            </Grid>
            <Grid item>
              <DetailsItem label='Beta' value='1.32' />
            </Grid>
            <Grid item>
              <DetailsItem label='EPS' value='$0.63' />
            </Grid>
            <Grid item>
              <DetailsItem label='Rev. Per Employee' value='$445.78K' />
            </Grid>
            <Grid item>
              <DetailsItem label='P/E Ratio' value='1,121.13' />
            </Grid>
            <Grid item>
              <DetailsItem label='Short Interest' value='51.13M' />
            </Grid>
            <Grid item>
              <DetailsItem label='% of Float Shorted' value='6.63%' />
            </Grid>
            <Grid item>
              <DetailsItem label='Average Volume' value='33.93M' />
            </Grid>
            <Grid item>
              <DetailsItem label='Yield' value='N/A' />
            </Grid>
            <Grid item>
              <DetailsItem label='Dividend' value='N/A' />
            </Grid>
          </Grid>
        </Paper>
      </Popper>
    </>
  )
}
