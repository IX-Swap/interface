/**  * @jest-environment jsdom-sixteen  */
import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render, cleanup } from 'test-utils'

import * as useDepositCashHook from 'v2/app/pages/accounts/pages/banks/hooks/useDepositCash'
import { DepositForm } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositForm'

const mutateFn = jest.fn()

jest.spyOn(useDepositCashHook, 'useDepositCash').mockReturnValue({
  mutate: mutateFn
})

describe('DepositForm', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders Form without error', async () => {
    const button = <button type='submit'>Submit</button>

    const { findByText } = render(<DepositForm>{button}</DepositForm>)
    const buttonElement = await findByText('Submit')

    fireEvent.click(buttonElement)
    // TODO: to be implemented
    await waitFor(() => {
      expect(mutateFn).toHaveBeenCalledTimes(0)
    })
  })
})
