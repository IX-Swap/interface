import { act, renderHook } from '@testing-library/react-hooks'
import * as useWithdrawalAddressesMock from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddresses'
import { waitFor } from 'test-utils'
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
        expect(result?.current.found).toEqual(true)
      })
    })
  })
  it('returns false for undefined', async () => {
    await act(async () => {
      const { result } = renderHook(() => useWithdrawalAddressAdded())
      await waitFor(() => {
        expect(result?.current.found).toEqual(false)
      })
    })
  })
  it('returns false for address which is not whitelisted', async () => {
    await act(async () => {
      const { result } = renderHook(() => useWithdrawalAddressAdded('123456'))
      await waitFor(() => {
        expect(result?.current.found).toEqual(false)
      })
    })
  })
})
