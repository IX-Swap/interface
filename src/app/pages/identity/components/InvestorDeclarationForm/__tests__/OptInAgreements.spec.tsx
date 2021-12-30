import { OptInAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import React from 'react'
import { render } from 'test-utils'
import { OptOutInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog'

jest.mock(
  'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog',
  () => ({
    OptOutInfoDialog: jest.fn(() => null)
  })
)

describe('OptInAgreements', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<OptInAgreements />)
  })

  it('renders OptOutInfoDialog when showOptOutDialog is true', () => {
    render(<OptInAgreements showOptOutDialog={true} />)

    expect(OptOutInfoDialog).toHaveBeenCalled()
  })
})
