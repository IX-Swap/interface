/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  BankForm,
  BankFormProps
} from 'v2/app/pages/accounts/pages/banks/components/BankForm'

const testFn = jest.fn()

describe('BankForm', () => {
  const props: BankFormProps = {
    submitButtonLabel: 'submit',
    onSubmit: testFn
  }

  afterEach(async () => {
    await cleanup()
  })

  it('renders with props correctly', () => {
    render(<BankForm {...props} />)

    expect(testFn).toHaveBeenCalledTimes(0)
  })
})
