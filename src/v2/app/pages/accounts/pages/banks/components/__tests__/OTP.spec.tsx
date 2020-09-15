/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { OTP } from 'v2/app/pages/accounts/pages/banks/components/OTP'

jest.mock('v2/components/form/typed/TextInput', () => {
  const TextInput = jest.fn(() => <div data-testid='textinput'></div>)
  return {
    createTypedTextInput: jest.fn(() => TextInput)
  }
})

describe('OTP', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders TextInput without error', () => {
    const { queryByTestId } = render(<OTP />)

    const input = queryByTestId('textinput')

    expect(input).not.toBeNull()
  })
})
