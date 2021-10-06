import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'

import application from './application/reducer'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import transactions from './transactions/reducer'
import swap from './swap/reducer'
import mint from './mint/reducer'
import lists from './lists/reducer'
import burn from './burn/reducer'
import multicall from './multicall/reducer'
import deposit from './deposit/reducer'
import withdraw from './withdraw/reducer'
import auth from './auth/reducer'
import secTokens from './secTokens/reducer'
import eventLog from './eventLog/reducer'
import admin from './admin/reducer'
import swapHelper from './swapHelper/reducer'
import vesting from './vesting/reducer'
import staking from './stake/reducer'
import unstaking from './stake/unstake/reducer'
import stakingPoolSize from './stake/poolSizeReducer'

import brokerDealer from './brokerDealer/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists', 'auth', 'swap', 'swapHelper']

const store = configureStore({
  reducer: {
    admin,
    application,
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    lists,
    deposit,
    withdraw,
    auth,
    secTokens,
    eventLog,
    vesting,
    staking,
    unstaking,
    stakingPoolSize,
    brokerDealer,
    swapHelper,
  },
  middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS, debounce: 1000 })],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
