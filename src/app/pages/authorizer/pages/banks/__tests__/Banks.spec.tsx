import React from 'react'
import { render, cleanup } from 'test-utils'
import { Banks } from 'app/pages/authorizer/pages/banks/Banks'

jest.mock('app/__tests__/BankPreview/BankPreview', () => ({
  BankPreview: jest.fn(() => null)
}))

jest.mock('app/pages/authorizer/__tests__/AuthorizerView', () => ({
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
