import { OptInAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { OptOutInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog'

jest.mock(
  'app/pages/identity/__tests__/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog',
  () => ({
    OptOutInfoDialog: jest.fn(() => null)
  })
)

describe('OptInAgreements', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OptInAgreements />)
  })

  it('renders OptOutInfoDialog when showOptOutDialog is true', () => {
    render(<OptInAgreements showOptOutDialog={true} />)

    expect(OptOutInfoDialog).toHaveBeenCalled()
  })
})
