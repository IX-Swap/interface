/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Banks, renderBank } from 'v2/app/pages/authorizer/pages/banks/Banks'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { bank } from '__fixtures__/authorizer'
import { DataroomFeature } from 'v2/types/authorizer'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'

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

  describe('renderBank', () => {
    it('renders BankView component with correct data', () => {
      const bankView = renderBank(bank)

      expect(bankView).toEqual(
        <AuthorizerView
          title='About This Bank'
          data={bank}
          feature={DataroomFeature['bank-accounts']}
        >
          <BankPreview data={bank} />
        </AuthorizerView>
      )
    })
  })
})
