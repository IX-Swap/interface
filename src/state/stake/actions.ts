import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { StakingStatus, Tier } from 'state/stake/reducer'

export const saveStakingStatus = createAction<{ status: StakingStatus }>('stake/saveStakingStatus')
export const selectTier = createAction<{ tier: Tier }>('stake/selectTier')
export const getIsStakingPaused = createAction<{ isPaused: boolean }>('stake/isPaused')
export const changeAccount = createAction<{ newAccount: string }>('stake/changeAccount')
export const checkAllowance = createAction<{ allowanceAmount: number }>('stake/checkAllowance')
export const updateIXSBalance = createAction<{ IXSAmount: string }>('stake/updateIXSBalance')
export const setTransactionInProgress = createAction<{ value: boolean }>('stake/setTransactionInProgress')
export const setShowCardFromOtherChain = createAction<{ showCard: boolean }>('stake/setShowCardFromOtherChain')
export const setTiersFromOtherChain = createAction<{ tiers: Tier[] }>('stake/setTiersFromOtherChain')

export const increaseAllowance: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: any }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/increaseAllowance/pending'),
  fulfilled: createAction('stake/increaseAllowance/fulfilled'),
  rejected: createAction('stake/increaseAllowance/rejected'),
}

export const stake: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ txStatus: number }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/staking/pending'),
  fulfilled: createAction('stake/staking/fulfilled'),
  rejected: createAction('stake/staking/rejected'),
}

export const getStakings: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ transactions: any }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/getStakings/pending'),
  fulfilled: createAction('stake/getStakings/fulfilled'),
  rejected: createAction('stake/getStakings/rejected'),
}

export const getRewards: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ transactions: any }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/getRewards/pending'),
  fulfilled: createAction('stake/getRewards/fulfilled'),
  rejected: createAction('stake/getRewards/rejected'),
}
export const getPayouts: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ transactions: any }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/getPayouts/pending'),
  fulfilled: createAction('stake/getPayouts/fulfilled'),
  rejected: createAction('stake/getPayouts/rejected'),
}
export const getAvailableClaim: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ transactions: any }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/getAvailableClaim/pending'),
  fulfilled: createAction('stake/getAvailableClaim/fulfilled'),
  rejected: createAction('stake/getAvailableClaim/rejected'),
}
export const getOneWeekHistoricalPoolSize: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: string }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/getOneWeekHistoricalPoolSize/pending'),
  fulfilled: createAction('stake/getOneWeekHistoricalPoolSize/fulfilled'),
  rejected: createAction('stake/getOneWeekHistoricalPoolSize/rejected'),
}

export const getOneMonthHistoricalPoolSize: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: string }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/getOneMonthHistoricalPoolSize/pending'),
  fulfilled: createAction('stake/getOneMonthHistoricalPoolSize/fulfilled'),
  rejected: createAction('stake/getOneMonthHistoricalPoolSize/rejected'),
}

export const getTwoMonthsHistoricalPoolSize: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: string }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/getTwoMonthsHistoricalPoolSize/pending'),
  fulfilled: createAction('stake/getTwoMonthsHistoricalPoolSize/fulfilled'),
  rejected: createAction('stake/getTwoMonthsHistoricalPoolSize/rejected'),
}

export const getThreeMonthsHistoricalPoolSize: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: string }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('stake/getThreeMonthsHistoricalPoolSize/pending'),
  fulfilled: createAction('stake/getThreeMonthsHistoricalPoolSize/fulfilled'),
  rejected: createAction('stake/getThreeMonthsHistoricalPoolSize/rejected'),
}
