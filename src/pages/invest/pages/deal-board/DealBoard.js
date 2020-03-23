import React, { useEffect } from 'react'
import { Grid, Box, CircularProgress } from '@material-ui/core'
import DealCard from './DealCard'

import {
  INVEST_STATUS,
  useInvestState,
  useInvestDispatch,
  getDeals
} from '../../../../context/InvestContext'

export default function DealBoard () {
  const { deals, areDealsReady, error } = useDealBoardLogic()
  return (
    <Grid component='article' container spacing={3}>
      {!areDealsReady ? (
        <Box p={3} display='flex' justifyContent='center'>
          <CircularProgress size={48} />
        </Box>
      ) : (
        deals.map((deal, id) => {
          return (
            <Grid key={id} item xs={12} md={12} lg={6}>
              <DealCard deal={deal} />
            </Grid>
          )
        })
      )}
    </Grid>
  )
}

const useDealBoardLogic = () => {
  const { status: investStatus, deals, ...invest } = useInvestState()
  const areDealsReady = ![INVEST_STATUS.INIT, INVEST_STATUS.GETTING].includes(
    investStatus
  )
  const error = invest.error
  const investDispatch = useInvestDispatch()

  useEffect(() => {
    // fetch deals data for initial values
    if (investStatus === INVEST_STATUS.INIT) {
      getDeals(investDispatch).catch(() => {})
    }
  }, [investStatus])

  return { areDealsReady, deals, error }
}
