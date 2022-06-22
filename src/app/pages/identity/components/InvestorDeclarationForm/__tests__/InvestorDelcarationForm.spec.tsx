import React from 'react'
import { render } from 'test-utils'
import { InvestorDeclarationForm } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorDeclarationForm'
import { CorporateDocuments } from 'app/pages/identity/components/InvestorDeclarationForm/CorporateDocuments/CorporateDocuments'
import { Form } from 'components/form/Form'

jest.mock(
  'app/pages/identity/components/InvestorDeclarationForm/CorporateDocuments/CorporateDocuments',
  () => ({
    CorporateDocuments: jest.fn(() => null)
  })
)

describe('InvestorDeclarationForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(
      <Form>
        <InvestorDeclarationForm />
      </Form>
    )

    expect(container).toMatchSnapshot()
  })

  it('renders corporate documents when identityType is corporate', () => {
    render(
      <Form>
        <InvestorDeclarationForm identityType={'corporate'} />
      </Form>
    )
    expect(CorporateDocuments).toHaveBeenCalled()
  })
})
