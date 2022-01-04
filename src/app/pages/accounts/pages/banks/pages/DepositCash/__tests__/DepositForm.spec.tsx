import { fireEvent } from '@testing-library/react'
import React from 'react'
import { render } from 'test-utils'
import * as useDepositCashHook from 'app/pages/accounts/pages/banks/hooks/useDepositCash'
import { DepositForm } from 'app/pages/accounts/pages/banks/pages/DepositCash/DepositForm'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('DepositForm', () => {
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
