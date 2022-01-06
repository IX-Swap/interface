import { InvestorDeclarationView } from 'app/pages/identity/components/IndividualIdentityView/InvestorDeclarationView/InvestorDeclarationView'
import React from 'react'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'

describe('InvestorDeclarationView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DeclarationList title correctly when identityType is individual', () => {
    const { getByText } = render(
      <InvestorDeclarationView data={individual} identityType='individual' />
    )

    expect(
      getByText('I declare that I am an individual "Accredited Investor"')
    ).toBeTruthy()
  })

  it('renders DeclarationList title correctly when identityType is corporate', () => {
    const { getByText } = render(
      <InvestorDeclarationView data={individual} identityType='corporate' />
    )

    expect(
      getByText('I declare that I am a corporate "Accredited Investor"')
    ).toBeTruthy()
  })

  it('renders accreditedInvestorOptOut when it has values', () => {
    const { getByText } = render(
      <InvestorDeclarationView
        data={{
          ...individual,
          declarations: {
            ...individual.declarations,
            investorsStatus: {
              ...individual.declarations.investorsStatus,
              allServices: true
            }
          }
        }}
        identityType='corporate'
      />
    )

    expect(getByText('Accredited Investor Opt-Out Form')).toBeTruthy()
  })

  it('does not render accreditedInvestorOptOut when it has no values', () => {
    const { queryByText } = render(
      <InvestorDeclarationView data={individual} identityType='individual' />
    )

    expect(queryByText('Accredited Investor Opt-Out Form')).toBeFalsy()
  })
})
