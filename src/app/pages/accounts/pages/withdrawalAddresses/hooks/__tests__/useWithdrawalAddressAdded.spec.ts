import { act, renderHook } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import * as useParsedDataHook from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import * as useWithdrawalAddressesMock from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddresses'
import { user } from '__fixtures__/user'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import { useWithdrawalAddressAdded } from '../useWithdrawalAddressAdded'

describe('useWithdrawalAddressAdded', () => {
  const parsedDataFn = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useWithdrawalAddressesMock, 'useWithdrawalAddresses')
      .mockReturnValue({
        data: {
          list: [withdrawalAddress],
          map: { id123: withdrawalAddress }
        }
      } as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns true for existing address', async () => {
    await act(async () => {
      const { result } = renderHook(() =>
        useWithdrawalAddressAdded('0x67ed490d810c41263758e7355cef720ffed68cbc')
      )
      await waitFor(() => {
        expect(result?.current).toEqual(true)
      })
    })
  })
  it('returns false for undefined', async () => {
    await act(async () => {
      const { result } = renderHook(() => useWithdrawalAddressAdded())
      await waitFor(() => {
        expect(result?.current).toEqual(false)
      })
    })
  })
  it('returns false for address which is not whitelisted', async () => {
    await act(async () => {
      const { result } = renderHook(() => useWithdrawalAddressAdded('123456'))
      await waitFor(() => {
        expect(result?.current).toEqual(false)
      })
    })
  })
})
