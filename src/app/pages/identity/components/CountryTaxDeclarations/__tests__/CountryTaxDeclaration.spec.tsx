import { CountryTaxDeclaration } from 'app/pages/_identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'

describe('CountryTaxDeclaration', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CountryTaxDeclaration taxResidencies={corporate.taxResidencies} />)
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
