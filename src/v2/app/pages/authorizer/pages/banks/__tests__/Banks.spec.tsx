/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Banks, renderBank } from 'v2/app/pages/authorizer/pages/banks/Banks'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { bank } from '__fixtures__/authorizer'

jest.mock('v2/app/components/BankPreview/BankPreview', () => ({
  BankPreview: jest.fn(() => null)
}))

describe('Banks', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<Banks />)
  })

  describe('renderBank', () => {
    it('renders BankView component with correct data', () => {
      const bankView = renderBank(bank)
      expect(bankView).toEqual(<BankPreview data={bank} />)
    })
  })
})
