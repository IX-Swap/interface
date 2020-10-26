/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Banks } from 'v2/app/pages/authorizer/pages/banks/Banks'

jest.mock('v2/app/components/BankPreview/BankPreview', () => ({
  BankPreview: jest.fn(() => null)
}))

jest.mock('v2/app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
}))

describe('Banks', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<Banks />)
  })
})
