import { fireEvent } from '@testing-library/react'
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useDepositCashHook from 'v2/app/pages/accounts/pages/banks/hooks/useDepositCash'
import { DepositForm } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositForm'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('DepositForm', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders Form without error', async () => {
    const button = <button type='submit'>Submit</button>
    const mutateFn = jest.fn()
    jest
      .spyOn(useDepositCashHook, 'useDepositCash')
      .mockReturnValue([mutateFn, generateMutationResult({})])

    const { findByText } = render(
      <DepositForm depositCode='123'>{button}</DepositForm>
    )
    const buttonElement = await findByText('Submit')

    fireEvent.click(buttonElement)
    // TODO: to be implemented
    // await waitFor(() => {
    //   expect(mutateFn).toHaveBeenCalledTimes(0)
    // })
  })
})
