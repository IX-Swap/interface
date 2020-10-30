/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from 'react-router-dom'
import { AppFeature } from 'v2/types/app'
import { urlParams } from 'v2/config/appURL'
import {
  getCurrentLocationData,
  stripColonFromURLParam
} from 'v2/hooks/location/utils'

export const useDataFromURL = () => {
  const { pathname } = useLocation()
  const { service, feature, params } = getCurrentLocationData(pathname)
  const state: any = {}

  if (params.length > 0) {
    if (service === 'authorizer') {
      const [itemId, action] = params
      // debugger
      state[stripColonFromURLParam(urlParams.itemId)] = itemId
    }

    switch (feature) {
      case 'bank-accounts': {
        const [bankId, action] = params
        state[stripColonFromURLParam(urlParams.bankId)] = bankId
        break
      }

      case 'digital-security': {
        const [balanceId, action] = params
        state[stripColonFromURLParam(urlParams.balanceId)] = balanceId
        break
      }

      case 'individuals': {
        const [identityId, action] = params
        state[stripColonFromURLParam(urlParams.identityId)] = identityId
        break
      }

      case 'corporates': {
        const [identityId, action] = params
        state[stripColonFromURLParam(urlParams.identityId)] = identityId
        break
      }

      case 'commitments': {
        const [commitmentId, action] = params
        state[stripColonFromURLParam(urlParams.commitmentId)] = commitmentId
        break
      }

      case 'cash-deposits':
      case 'cash-withdrawals':
      case 'digital-security-withdrawals': {
        const [balanceId, action] = params
        // debugger
        state[stripColonFromURLParam(urlParams.balanceId)] = balanceId
        break
      }

      case 'offerings': {
        if (service === 'invest') {
          const [issuerId, dsoId, action] = params
          state[stripColonFromURLParam(urlParams.issuerId)] = issuerId
          state[stripColonFromURLParam(urlParams.dsoId)] = dsoId
        } else {
          const [dsoId, action] = params
          state[stripColonFromURLParam(urlParams.dsoId)] = dsoId
        }

        break
      }

      default:
        return state
    }
  }

  window.history.pushState(state, 'state')
}
