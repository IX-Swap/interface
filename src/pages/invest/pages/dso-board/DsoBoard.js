import React, { useEffect } from 'react'
import { Grid, Box, CircularProgress } from '@material-ui/core'
import DsoCard from './DsoCard'

import {
  INVEST_STATUS,
  useInvestState,
  useInvestDispatch,
  getDsoList
} from '../../../../context/InvestContext'

export default function DsoBoard ({ history }) {
  const { dsoList, isDsoListReady, error } = useDsoBoardLogic()
  return (
    <Grid component='article' container spacing={3}>
      {!isDsoListReady ? (
        <Box p={3} display='flex' justifyContent='center'>
          <CircularProgress size={48} />
        </Box>
      ) : (
        dsoList.map((dso, id) => {
          return (
            <Grid key={id} item xs={12} md={12} lg={5}>
              <DsoCard history={history} dso={dso} />
            </Grid>
          )
        })
      )}
    </Grid>
  )
}

const useDsoBoardLogic = () => {
  const { status: investStatus, dsoList, ...invest } = useInvestState()
  const isDsoListReady = ![INVEST_STATUS.INIT, INVEST_STATUS.GETTING].includes(
    investStatus
  )
  const error = invest.error
  const investDispatch = useInvestDispatch()

  useEffect(() => {
    // fetch deals data for initial values
    if (investStatus === INVEST_STATUS.INIT) {
      getDsoList(investDispatch).catch(() => {})
    }
  }, [investStatus])

  return { isDsoListReady, dsoList, error }
}
