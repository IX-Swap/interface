import React from 'react'
import { render, cleanup } from 'test-utils'
import { Banks } from 'app/pages/authorizer/pages/banks/Banks'

jest.mock('app/components/BankPreview/BankPreview', () => ({
  BankPreview: jest.fn(() => null)
}))

jest.mock('app/pages/authorizer/components/AuthorizerView', () => ({
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
