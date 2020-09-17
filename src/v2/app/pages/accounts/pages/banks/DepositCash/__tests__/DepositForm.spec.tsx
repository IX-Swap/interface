/**  * @jest-environment jsdom-sixteen  */
import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useDepositCashHook from 'v2/app/pages/accounts/pages/banks/hooks/useDepositCash'
import { DepositForm } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositForm'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('DepositForm', () => {
  const depositCash = jest.fn()
  const depositCode = 'despositcode'

  beforeEach(() => {
    jest
      .spyOn(useDepositCashHook, 'useDepositCash')
      .mockReturnValue([depositCash, generateMutationResult({})])
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders without error', () => {
    render(<DepositForm depositCode={depositCode} />)
  })

  it('renders Form without error', async () => {
    // TODO: find a way to pass yup validation on submit
    const renderChildren = () => (
      <>
        <input name='amount' id='amount' defaultValue={100} />
        <input name='asset' id='amount' defaultValue='asset' />
        <input name='otp' id='amount' defaultValue='123456' />
        <button type='submit'>Submit</button>
      </>
    )
    const { getByText } = render(
      <DepositForm depositCode={depositCode}>{renderChildren()}</DepositForm>
    )
    const buttonElement = getByText('Submit')
    fireEvent.click(buttonElement)

    await waitFor(() => {
      expect(depositCash).toHaveBeenCalledTimes(0)
    })
  })
})
