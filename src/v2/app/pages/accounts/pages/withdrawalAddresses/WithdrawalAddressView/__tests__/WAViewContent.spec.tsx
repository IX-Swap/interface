import React from 'react'
import { render, cleanup } from 'test-utils'
import { LabelledValue } from 'v2/components/LabelledValue'
import { WAViewContent } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WAViewContent'
import * as useWithdrawalAddressesRouterHook from 'v2/app/pages/accounts/pages/withdrawalAddresses/router'
import * as useWithdrawalAddressByIdHook from 'v2/app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressById'
import { generateQueryResult } from '__fixtures__/useQuery'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import { QueryStatus } from 'react-query'

jest.mock('v2/components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('WithdrawalAddressViewContent', () => {
  beforeEach(() => {
    jest
      .spyOn(useWithdrawalAddressesRouterHook, 'useWithdrawalAddressesRouter')
      .mockReturnValue({
        params: { withdrawalAddress: withdrawalAddress._id }
      } as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useWithdrawalAddressByIdHook, 'useWithdrawalAddressById')
      .mockReturnValue(generateQueryResult({ data: withdrawalAddress }))
    render(<WAViewContent />)
  })

  it('does not render LabelledValue if data not loaded', () => {
    jest
      .spyOn(useWithdrawalAddressByIdHook, 'useWithdrawalAddressById')
      .mockReturnValue(
        generateQueryResult({
          data: withdrawalAddress,
          queryStatus: QueryStatus.Loading
        })
      )
    render(<WAViewContent />)

    expect(LabelledValue).not.toHaveBeenCalled()
  })

  it('does not render LabelledValue if data is undefined', () => {
    jest
      .spyOn(useWithdrawalAddressByIdHook, 'useWithdrawalAddressById')
      .mockReturnValue(generateQueryResult({ data: undefined }))
    render(<WAViewContent />)

    expect(LabelledValue).not.toHaveBeenCalled()
  })

  it('renders LabelledValue with correct props', () => {
    jest
      .spyOn(useWithdrawalAddressByIdHook, 'useWithdrawalAddressById')
      .mockReturnValue(generateQueryResult({ data: withdrawalAddress }))

    render(<WAViewContent />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      { label: 'Blockchain Network', value: withdrawalAddress.network.name },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Address Label', value: withdrawalAddress.label },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      { label: 'Withdrawal Address', value: withdrawalAddress.address },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      { label: 'Memo', value: withdrawalAddress.memo },
      {}
    )
  })
})
