import { TaxDeclarationView } from 'app/pages/_identity/components/IndividualIdentityView/TaxDeclarationView/TaxDeclarationView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'

describe('TaxDeclarationView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TaxDeclarationView data={individual} />)
  })

  it('renders correct label and content when singaporeOnly is false', () => {
    const { getByText } = render(<TaxDeclarationView data={individual} />)

    expect(getByText('Singapore')).toBeTruthy()
    expect(
      getByText(
        'NO, I’m currently tax resident in the following list of countries/ jurisdictions (including Singapore, if applicable):'
      )
    ).toBeTruthy()
  })

  it('renders correct label and content when singaporeOnly is true', () => {
    const { getByText } = render(
      <TaxDeclarationView
        data={{
          ...individual,
          taxResidencies: [
            {
              residentOfSingapore: true
            }
          ]
        }}
      />
    )

    expect(getByText('My Singapore NRIC/FIN is:')).toBeTruthy()
    expect(
      getByText(
        'YES, I’m currently only tax resident in Singapore and do not have a foreign tax residency.'
      )
    ).toBeTruthy()
  })
})
