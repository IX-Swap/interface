import React from 'react'
import { render } from 'test-utils'
import { LabelledValue } from 'components/LabelledValue'
import { WAViewContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WAViewContent'
import * as useWithdrawalAddressByIdHook from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressById'
import { generateQueryResult } from '__fixtures__/useQuery'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import { QueryStatus } from 'react-query'
import { history } from 'config/history'
import { generatePath, Route } from 'react-router-dom'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('WithdrawalAddressViewContent', () => {
  beforeEach(() => {
    history.push(
      generatePath(WithdrawalAddressesRoute.view, {
        withdrawalAddressId: withdrawalAddress._id
      })
    )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    jest
      .spyOn(useWithdrawalAddressByIdHook, 'useWithdrawalAddressById')
      .mockReturnValue(generateQueryResult({ data: withdrawalAddress }))

    render(<WAViewContent />)
  })

  it('passes correct withdrawal address id to the useWithdrawalAddressById hook', () => {
    jest
      .spyOn(useWithdrawalAddressByIdHook, 'useWithdrawalAddressById')
      .mockImplementation(
        jest.fn(() => generateQueryResult({ data: withdrawalAddress }))
      )

    render(
      <Route path={WithdrawalAddressesRoute.view}>
        <WAViewContent />
      </Route>
    )

    expect(
      useWithdrawalAddressByIdHook.useWithdrawalAddressById
    ).toHaveBeenCalledWith(withdrawalAddress._id)
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
      { label: 'Blockchain Address', value: withdrawalAddress.address },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      { label: 'Memo', value: withdrawalAddress.memo },
      {}
    )
  })
})
