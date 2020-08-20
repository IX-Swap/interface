/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Banks, renderBank } from 'v2/app/authorizer/banks/Banks'
import BankView from 'v2/app/components/bank-preview'
import { bank } from '__fixtures__/authorizer'

jest.mock('v2/app/components/bank-preview', () => jest.fn(() => null))

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
      expect(bankView).toEqual(<BankView bank={bank} />)
    })
  })
})
