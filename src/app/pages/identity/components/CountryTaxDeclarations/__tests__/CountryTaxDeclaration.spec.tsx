import { CountryTaxDeclaration } from 'app/pages/identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import React from 'react'
import { render } from 'test-utils'

describe('CountryTaxDeclaration', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders null when taxResidencies is undefined', () => {
    const { container } = render(<CountryTaxDeclaration />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders props correctly', () => {
    const { getByText } = render(
      <CountryTaxDeclaration
        taxResidencies={[
          {
            countryOfResidence: 'Singapore',
            taxIdentificationNumber: '123'
          }
        ]}
      />
    )
    expect(getByText('Singapore')).toBeTruthy()
    expect(getByText('123')).toBeTruthy()
  })

  it('renders reason block when taxResidence has reason prop', () => {
    const { getByText } = render(
      <CountryTaxDeclaration
        taxResidencies={[
          {
            reason: 'A'
          }
        ]}
      />
    )
    expect(getByText(/reason a/i)).toBeTruthy()
  })

  it('renders custom reason correctly', () => {
    const { getByText } = render(
      <CountryTaxDeclaration
        taxResidencies={[
          {
            reason: 'B',
            customReason: 'This is a custom reason.'
          }
        ]}
      />
    )
    expect(getByText('This is a custom reason.')).toBeTruthy()
  })
})
