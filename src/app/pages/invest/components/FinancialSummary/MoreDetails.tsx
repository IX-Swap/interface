import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Popper,
  Typography
} from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import { DetailsItem } from 'app/pages/invest/components/FinancialSummary/DetailsItem'
import { useFinancialMetrics } from 'app/pages/invest/hooks/useFinancialMetrics'
import React from 'react'

export const MoreDetails = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl !== null ? null : event.currentTarget)
  }

  const { data } = useFinancialMetrics()

  return (
    <>
      <Button color='primary' size='small' onClick={handleClick}>
        <Box style={{ fontSize: 14, textTransform: 'capitalize' }}>
          More Details
        </Box>
        <ArrowDropDown />
      </Button>
      <Popper
        id='financial-details'
        open={anchorEl !== null}
        anchorEl={anchorEl}
        placement='bottom'
        modifiers={[
          {
            name: 'flip',
            enabled: false
          }
        ]}
        style={{ zIndex: 10 }}
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
              <DetailsItem label='Open' value={data?.open ?? '0.00'} />
            </Grid>
            <Grid item>
              <DetailsItem label='Day Range' value='-' />
            </Grid>
            <Grid item>
              <DetailsItem label='52 Week Range' value='-' />
            </Grid>
            <Grid item>
              <DetailsItem
                label='Market Cap'
                value={data?.marketCap ?? '0.00'}
              />
            </Grid>
            <Grid item>
              <DetailsItem
                label='Shares Outstanding'
                value={data?.sharesOustanding ?? '0.00'}
              />
            </Grid>
            <Grid item>
              <DetailsItem
                label='Public Float'
                value={data?.publicFloat ?? '0.00'}
              />
            </Grid>
            <Grid item>
              <DetailsItem label='Beta' value={data?.beta ?? '0.00'} />
            </Grid>
            <Grid item>
              <DetailsItem label='EPS' value={data?.eps ?? '0.00'} />
            </Grid>
            <Grid item>
              <DetailsItem
                label='Rev. Per Employee'
                value={data?.reservePerEmployee ?? '0.00'}
              />
            </Grid>
            <Grid item>
              <DetailsItem label='P/E Ratio' value={data?.peRatio ?? '0.00'} />
            </Grid>
            <Grid item>
              <DetailsItem
                label='Short Interest'
                value={data?.shortInterest ?? '0.00'}
              />
            </Grid>
            <Grid item>
              <DetailsItem
                label='% of Float Shorted'
                value={data?.percentOfFloatShorted ?? '0.00'}
              />
            </Grid>
            <Grid item>
              <DetailsItem
                label='Average Volume'
                value={data?.averageVolume ?? '0.00'}
              />
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
