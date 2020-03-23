import React, { useEffect } from 'react'
import { Grid, Box, CircularProgress } from '@material-ui/core'
import {
  INVEST_STATUS,
  useInvestState,
  useInvestDispatch,
  getDso
} from '../../../../context/InvestContext'
export default function DealView () {
  // const { dso, areDealsReady, error } = useDealViewLogic()
  return (
    <Grid component='article' container spacing={3}>
      DealsView
    </Grid>
  )
}

// function useDealViewLogic () {
//   const {
//     status: investStatus,
//     offering,
//     deals,
//     dealIndex,
//     ...invest
//   } = useInvestState()
//   const areDealsReady = ![INVEST_STATUS.INIT, INVEST_STATUS.GETTING].includes(
//     investStatus
//   )
//   const error = invest.error
//   const investDispatch = useInvestDispatch()

//   useEffect(() => {
//     // fetch deals data for initial values
//     if (investStatus === INVEST_STATUS.INIT) {
//       getOffering(investDispatch).catch(() => {})
//     }
//   }, [investStatus])

//   return { areDealsReady, deals, error }
// }
