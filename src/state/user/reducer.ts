import { TradeAuthorization } from '@ixswap1/v2-sdk'
import { createReducer } from '@reduxjs/toolkit'
import { SupportedLocale } from 'constants/locales'
import { SecToken } from 'types/secToken'
import { DEFAULT_DEADLINE_FROM_NOW } from '../../constants/misc'
import { updateVersion } from '../global/actions'
import {
  addSerializedPair,
  addSerializedToken,
  authorizeSecToken,
  clearUserData,
  fetchUserSecTokenList,
  passAccreditation,
  removeSerializedPair,
  removeSerializedToken,
  saveAccount,
  saveUserSecTokens,
  SerializedPair,
  SerializedToken,
  toggleURLWarning,
  updateHideClosedPositions,
  updateMatchesDarkMode,
  updateUnderstoodPlayground,
  updateUserDarkMode,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserLocale,
  updateUserSingleHopOnly,
  updateUserSlippageTolerance,
  getMe,
  RawGetMePayload,
} from './actions'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number

  userDarkMode: boolean | null // the user's choice for dark mode or light mode
  matchesDarkMode: boolean // whether the dark mode media query matches

  userLocale: SupportedLocale | null

  userExpertMode: boolean

  userSingleHopOnly: boolean // only allow swaps on direct pairs

  // hides closed (inactive) positions across the app
  userHideClosedPositions: boolean

  // user defined slippage tolerance in bips, used in all txns
  userSlippageTolerance: number | 'auto'
  userSlippageToleranceHasBeenMigratedToAuto: boolean // temporary flag for migration status

  // deadline set by user in minutes, used in all txns
  userDeadline: number
  account: string
  userSecTokens: SecToken[]
  loadingSecTokenRequest: boolean
  secTokenError: string | null
  loadingAccreditation: boolean
  accreditationError: string | null
  secTokenAuthorizations: {
    [address: string]: TradeAuthorization
  }
  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken
    }
  }

  pairs: {
    [chainId: number]: {
      // keyed by token0Address:token1Address
      [key: string]: SerializedPair
    }
  }

  timestamp: number
  URLWarningVisible: boolean
  hasUnderstoodPlayground: boolean
  errorMe: string | null
  isLoadingMe: boolean
  me: RawGetMePayload
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`
}

export const initialState: UserState = {
  userDarkMode: true,
  matchesDarkMode: true,
  userExpertMode: false,
  userLocale: null,
  userSingleHopOnly: false,
  userHideClosedPositions: false,
  userSlippageTolerance: 'auto',
  userSlippageToleranceHasBeenMigratedToAuto: true,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  pairs: {},
  account: '',
  timestamp: currentTimestamp(),
  URLWarningVisible: true,
  loadingSecTokenRequest: false,
  secTokenError: null,
  accreditationError: null,
  loadingAccreditation: false,
  userSecTokens: [],
  secTokenAuthorizations: {},
  hasUnderstoodPlayground: false,
  errorMe: null,
  isLoadingMe: false,
  me: {} as RawGetMePayload,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateVersion, (state) => {
      // slippage isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (
        typeof state.userSlippageTolerance !== 'number' ||
        !Number.isInteger(state.userSlippageTolerance) ||
        state.userSlippageTolerance < 0 ||
        state.userSlippageTolerance > 5000
      ) {
        state.userSlippageTolerance = 'auto'
      } else {
        if (
          !state.userSlippageToleranceHasBeenMigratedToAuto &&
          [10, 50, 100].indexOf(state.userSlippageTolerance) !== -1
        ) {
          state.userSlippageTolerance = 'auto'
          state.userSlippageToleranceHasBeenMigratedToAuto = true
        }
      }

      // deadline isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (
        typeof state.userDeadline !== 'number' ||
        !Number.isInteger(state.userDeadline) ||
        state.userDeadline < 60 ||
        state.userDeadline > 180 * 60
      ) {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW
      }

      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(updateUserDarkMode, (state, action) => {
      state.userDarkMode = action.payload.userDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateMatchesDarkMode, (state, action) => {
      state.matchesDarkMode = action.payload.matchesDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserExpertMode, (state, action) => {
      state.userExpertMode = action.payload.userExpertMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserLocale, (state, action) => {
      state.userLocale = action.payload.userLocale
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserSlippageTolerance, (state, action) => {
      state.userSlippageTolerance = action.payload.userSlippageTolerance
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserDeadline, (state, action) => {
      state.userDeadline = action.payload.userDeadline
      state.timestamp = currentTimestamp()
    })
    .addCase(saveAccount, (state, action) => {
      state.account = action.payload.account
    })
    .addCase(saveUserSecTokens, (state, action) => {
      state.userSecTokens = action.payload.tokenList
    })
    .addCase(updateUserSingleHopOnly, (state, action) => {
      state.userSingleHopOnly = action.payload.userSingleHopOnly
    })
    .addCase(updateHideClosedPositions, (state, action) => {
      state.userHideClosedPositions = action.payload.userHideClosedPositions
    })
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
      state.timestamp = currentTimestamp()
    })
    .addCase(removeSerializedToken, (state, { payload: { address, chainId } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[chainId] = state.tokens[chainId] || {}
      delete state.tokens[chainId][address]
      state.timestamp = currentTimestamp()
    })
    .addCase(addSerializedPair, (state, { payload: { serializedPair } }) => {
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const chainId = serializedPair.token0.chainId
        state.pairs[chainId] = state.pairs[chainId] || {}
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair
      }
      state.timestamp = currentTimestamp()
    })
    .addCase(removeSerializedPair, (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
      if (state.pairs[chainId]) {
        // just delete both keys if either exists
        delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)]
        delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)]
      }
      state.timestamp = currentTimestamp()
    })
    .addCase(toggleURLWarning, (state) => {
      state.URLWarningVisible = !state.URLWarningVisible
    })

    .addCase(fetchUserSecTokenList.pending, (state) => {
      state.loadingSecTokenRequest = true
      state.secTokenError = null
    })
    .addCase(fetchUserSecTokenList.fulfilled, (state, { payload: { tokenList } }) => {
      state.loadingSecTokenRequest = false
      state.secTokenError = null
      state.userSecTokens = tokenList
    })
    .addCase(fetchUserSecTokenList.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingSecTokenRequest = false
      state.secTokenError = errorMessage
    })
    .addCase(passAccreditation.pending, (state) => {
      state.loadingAccreditation = true
      state.accreditationError = null
    })
    .addCase(passAccreditation.fulfilled, (state) => {
      state.loadingAccreditation = false
      state.accreditationError = null
    })
    .addCase(passAccreditation.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingAccreditation = false
      state.accreditationError = errorMessage
    })
    .addCase(authorizeSecToken.pending, (state) => {
      state.loadingSecTokenRequest = true
      state.secTokenError = null
    })
    .addCase(authorizeSecToken.fulfilled, (state) => {
      state.loadingSecTokenRequest = false
      state.secTokenError = null
    })
    .addCase(authorizeSecToken.rejected, (state, { payload: { errorMessage } }) => {
      state.loadingSecTokenRequest = false
      state.secTokenError = errorMessage
    })
    .addCase(clearUserData, (state) => {
      state.secTokenAuthorizations = {}
      state.userSecTokens = []
      state.me = {} as RawGetMePayload
    })
    .addCase(updateUnderstoodPlayground, (state, { payload: { understood } }) => {
      state.hasUnderstoodPlayground = understood
    })
    .addCase(getMe.pending, (state) => {
      state.isLoadingMe = true
      state.errorMe = null
    })
    .addCase(getMe.fulfilled, (state, { payload: { data } }) => {
      state.isLoadingMe = false
      state.errorMe = null
      state.me = data
    })
    .addCase(getMe.rejected, (state, { payload: { errorMessage } }) => {
      state.isLoadingMe = false
      state.errorMe = errorMessage
    })
)
