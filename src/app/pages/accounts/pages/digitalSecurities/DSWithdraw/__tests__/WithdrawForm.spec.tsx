import React from 'react'
import { render, cleanup } from 'test-utils'
import * as balances from 'hooks/balance/useAllBalances'
import { WithdrawForm } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawForm'
import { asset } from '__fixtures__/authorizer'
import {
  generateInfiniteQueryResult,
  generateMutationResult
} from '__fixtures__/useQuery'
import { fireEvent, waitFor } from '@testing-library/react'
import * as useWithdrawDSHook from 'app/pages/accounts/pages/banks/hooks/useWithdrawDS'
import { history } from 'config/history'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'

describe('WithdrawForm', () => {
  const withdrawDS = jest.fn()
  const balanceId = 'testId'

  beforeEach(() => {
    history.push(DSRoute.deposit, { balanceId })
    jest
      .spyOn(balances, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balanceId]: asset } })
      )
    jest
      .spyOn(useWithdrawDSHook, 'useWithdrawDS')
      .mockReturnValue([withdrawDS, generateMutationResult({})])
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<WithdrawForm />)
  })

  it('renders Form without error', async () => {
    // TODO: find a way to pass yup validation on submit
    const renderChildren = () => (
      <>
        <input name='amount' id='amount' defaultValue={100} />
        <input
          name='recipientWallet'
          id='recipientWallet'
          defaultValue='recipientWallet'
        />
        <input name='otp' id='otp' defaultValue='123456' />
        <button type='submit'>Submit</button>
      </>
    )
    const { getByText } = render(
      <WithdrawForm>{renderChildren()}</WithdrawForm>
    )
    const buttonElement = getByText(/submit/i)
    fireEvent.click(buttonElement)

    await waitFor(() => expect(withdrawDS).toHaveBeenCalledTimes(0))
  })
})
