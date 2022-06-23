import { TaxDeclarationView } from 'app/pages/identity/components/IndividualIdentityView/TaxDeclarationView/TaxDeclarationView'
import React from 'react'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'

describe('TaxDeclarationView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
      getByText('Are you currently solely a tax resident of Singapore?')
    ).toBeTruthy()
  })
})
