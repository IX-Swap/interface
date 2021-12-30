import React from 'react'
import { render } from 'test-utils'
import { Banks } from 'app/pages/authorizer/pages/banks/Banks'

jest.mock('app/components/BankPreview/BankPreview', () => ({
  BankPreview: jest.fn(() => null)
}))

jest.mock('app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
}))

describe('Banks', () => {
  afterEach(async () => {})

  it.skip('renders without throwing', async () => {
    render(<Banks />)
  })
})
