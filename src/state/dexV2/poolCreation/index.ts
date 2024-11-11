import { createSlice } from '@reduxjs/toolkit'
import { set, sum } from 'lodash'

import { bnum } from 'lib/utils'
import { PoolSeedToken, StepIds } from 'pages/DexV2/Pool/types'

export interface DexV2State {
  activeStep: StepIds
  seedTokens: PoolSeedToken[]
  initialFee: string
}

const initialState: DexV2State = {
  seedTokens: [] as PoolSeedToken[],
  activeStep: StepIds.ChooseWeights,
  initialFee: '0.003',
}

const poolCreationSlice = createSlice({
  name: 'poolCreation',
  initialState,
  reducers: {
    setPoolCreationState(state, action) {
      const newState = { ...state, ...action.payload }

      return newState
    },
    setTokenWeight(state, action) {
      const seedTokens = state.seedTokens
      const targetToken = seedTokens[action.payload.id]
      targetToken.weight = action.payload.weight
    },
    setTokenLocked(state, action) {
      const seedTokens = state.seedTokens
      const targetToken = seedTokens[action.payload.id]
      targetToken.isLocked = action.payload.isLocked
    },
    distributeWeights: (state) => {
      const seedTokens = state.seedTokens
      // get all the locked weights and sum those bad boys
      let lockedPct = sum(seedTokens.filter((w) => w.isLocked).map((w) => w.weight / 100))

      // makes it so that new allocations are set as 0
      if (lockedPct > 1) lockedPct = 1
      const pctAvailableToDistribute = bnum(1).minus(lockedPct)
      const unlockedWeights = seedTokens.filter((w) => !w.isLocked)
      const evenDistributionWeight = pctAvailableToDistribute.div(unlockedWeights.length)

      const error = pctAvailableToDistribute.minus(evenDistributionWeight.times(unlockedWeights.length))
      const isErrorDivisible = error.mod(unlockedWeights.length).eq(0)
      const distributableError = isErrorDivisible ? error.div(unlockedWeights.length) : error

      const normalisedWeights = unlockedWeights.map((_, i) => {
        const evenDistributionWeight4DP = Number(evenDistributionWeight.toFixed(4))
        const errorScaledTo4DP = Number(distributableError.toString()) * 1e14
        if (!isErrorDivisible && i === 0) {
          return evenDistributionWeight4DP + errorScaledTo4DP
        } else if (isErrorDivisible) {
          return evenDistributionWeight4DP + errorScaledTo4DP
        } else {
          return evenDistributionWeight4DP
        }
      })

      unlockedWeights.forEach((tokenWeight, i) => {
        tokenWeight.weight = Number((normalisedWeights[i] * 100).toFixed(2))
      })
    },
    resetPoolCreationState: () => initialState,
  },
})

export const { setPoolCreationState, resetPoolCreationState, setTokenWeight, setTokenLocked, distributeWeights } =
  poolCreationSlice.actions
export default poolCreationSlice.reducer