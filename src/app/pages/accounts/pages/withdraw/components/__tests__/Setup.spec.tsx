import React from 'react'
import { render } from 'test-utils'
import { Setup } from 'app/pages/accounts/pages/withdraw/components/Setup'
import { bank } from '__fixtures__/authorizer'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { Form } from 'components/form/Form'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
import { generateQueryResult } from '__fixtures__/useQuery'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'
import { OTPWithdraw } from 'app/pages/accounts/pages/withdraw/components/OTPWithdraw'

jest.mock('app/pages/accounts/pages/banks/hooks/useBanksData')
jest.mock('app/pages/accounts/pages/withdraw/components/OTPWithdraw', () => ({
  OTPWithdraw: jest.fn(() => null)
}))
const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('Setup', () => {
  beforeEach(() => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ map: { [bank._id]: bank } })
    )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('render disabled OTP if bank account is not selected', () => {
    const useVirtualAccountsResponse = generateQueryResult({
      data: virtualAccountsSample[0],
      isLoading: false
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountsResponse as any)
    render(
      <Form>
        <Setup />
      </Form>
    )
    expect(OTPWithdraw).toBeCalledWith(
      expect.objectContaining({
        disabled: true
      }),
      {}
    )
  })
})
