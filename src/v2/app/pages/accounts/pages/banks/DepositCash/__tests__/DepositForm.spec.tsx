/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import { DepositForm } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositForm'

jest.mock('v2/components/form/Form', () => ({
  Form: () => <div data-testid='form'></div>
}))
jest.mock('react-hook-form')

describe('DepositForm', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    const { queryByTestId } = render(<DepositForm />)
    expect(queryByTestId('form')).not.toBeNull()
  })
})
