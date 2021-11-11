/* eslint-disable @typescript-eslint/no-unused-vars */
import { useHistory } from 'react-router-dom'
import { urlParams } from 'config/appURL'
import {
  getCurrentLocationData,
  stripColonFromURLParam
} from 'hooks/location/utils'
import { useEffect } from 'react'

export const useDataFromURL = () => {
  const { replace, location } = useHistory()
  const { pathname } = location

  useEffect(() => {
    const { service, feature, params } = getCurrentLocationData(pathname)
    const state: any = {}

    if (params.length > 0) {
      if (service === 'authorizer') {
        const [itemId, action] = params
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
          state[stripColonFromURLParam(urlParams.balanceId)] = balanceId
          break
        }

        case 'offerings': {
          if (service === 'invest') {
            const [issuerId, dsoId, action] = params
            state[stripColonFromURLParam(urlParams.issuerId)] = issuerId
            state[stripColonFromURLParam(urlParams.dsoId)] = dsoId
          } else {
            const [issuerId, dsoId, action] = params
            state[stripColonFromURLParam(urlParams.dsoId)] = dsoId
            state[stripColonFromURLParam(urlParams.issuerId)] = issuerId
          }

          break
        }

        case 'withdrawal-addresses': {
          const [withdrawalAddressId, action] = params
          state[stripColonFromURLParam(urlParams.withdrawalAddressId)] =
            withdrawalAddressId
          break
        }

        case 'users': {
          const [userId] = params
          state[stripColonFromURLParam(urlParams.userId)] = userId
          break
        }

        default: {
        }
      }
    }

    replace({ state, search: location.search })
  }, [pathname]) // eslint-disable-line
}
