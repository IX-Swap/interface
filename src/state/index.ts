import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'
import admin from './admin/reducer'
import application from './application/reducer'
import auth from './auth/reducer'
import brokerDealer from './brokerDealer/reducer'
import burn from './burn/reducer'
import deposit from './deposit/reducer'
import eventLog from './eventLog/reducer'
import faucet from './faucet/reducer'
import { updateVersion } from './global/actions'
import lists from './lists/reducer'
import mint from './mint/reducer'
import multicall from './multicall/reducer'
import nft from './nft/reducer'
import pool from './pool/reducer'
import secTokens from './secTokens/reducer'
import stakingPoolSize from './stake/poolSizeReducer'
import staking from './stake/reducer'
import unstaking from './stake/unstake/reducer'
import swap from './swap/reducer'
import swapHelper from './swapHelper/reducer'
import transactions from './transactions/reducer'
import user from './user/reducer'
import vesting from './vesting/reducer'
import withdraw from './withdraw/reducer'
import assetForm from './nft/assetForm.reducer'
import collectionForm from './nft/collectionForm.reducer'
import secCatalog from './secCatalog/reducer'
import kyc from './kyc/reducer'

const PERSISTED_KEYS: string[] = ['auth', 'lists', 'swap', 'swapHelper', 'transactions', 'user']

const combinedReducer = combineReducers({
  admin,
  application,
  assetForm,
  auth,
  brokerDealer,
  burn,
  collectionForm,
  deposit,
  eventLog,
  faucet,
  kyc,
  lists,
  mint,
  multicall,
  nft,
  pool,
  secCatalog,
  secTokens,
  staking,
  stakingPoolSize,
  swap,
  swapHelper,
  transactions,
  unstaking,
  user,
  vesting,
  withdraw,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'clearStore') {
    state = undefined
  }
  return combinedReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS, debounce: 1000 })],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
