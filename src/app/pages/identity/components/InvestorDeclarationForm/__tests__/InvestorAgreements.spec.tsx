import { InvestorAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/InvestorAgreements'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('InvestorAgreements', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot when type is corporate', () => {
    const { container } = render(
      <Form>
        <InvestorAgreements type='corporate' />
      </Form>
    )

    expect(container).toMatchSnapshot()
  })

  it('should match snapshot when type is individual', () => {
    const { container } = render(
      <Form>
        <InvestorAgreements type='individual' />
      </Form>
    )

    expect(container).toMatchSnapshot()
  })
})
