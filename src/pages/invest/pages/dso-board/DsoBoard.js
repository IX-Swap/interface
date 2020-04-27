import React, { useEffect } from 'react'
import { Grid, Box, CircularProgress } from '@material-ui/core'
import DsoCard from './DsoCard'

import {
  INVEST_STATUS,
  useInvestState,
  useInvestDispatch,
  getDsoList
} from 'context/InvestContext'

export default function DsoBoard ({ history }) {
  const { dsoList, isDsoListReady } = useDsoBoardLogic()
  return (
    <Grid container jusity='center' spacing={3}>
      {!isDsoListReady ? (
        <Box p={3} display='flex'>
          <CircularProgress size={48} />
        </Box>
      ) : (
        <Grid container spacing={3} justify='center'>
          {dsoList.map((dso, id) => {
            if (dso.status) {
              return (
                <Grid key={id} item xs={12} md={9} lg={9}>
                  <DsoCard history={history} dso={dso} />
                </Grid>
              )
            } else {
              return null
            }
          })}
        </Grid>
      )}
    </Grid>
  )
}

const useDsoBoardLogic = () => {
  const { status: investStatus, dsoList, ...invest } = useInvestState()
  const isDsoListReady = ![
    INVEST_STATUS.INIT,
    INVEST_STATUS.GETTING,
    INVEST_STATUS.SAVING
  ].includes(investStatus)
  const error = invest.error
  const investDispatch = useInvestDispatch()

  useEffect(() => {
    // fetch deals data for initial values
    if (investStatus === INVEST_STATUS.INIT) {
      getDsoList(investDispatch)
    }
  }, [investStatus, investDispatch])

  return { isDsoListReady, dsoList, error }
}
