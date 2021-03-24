import { InformationFields } from 'app/pages/_identity/components/CorporateInformationForm/InformationFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

window.URL.revokeObjectURL = jest.fn()

describe('InformationFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <InformationFields />
      </Form>
    )
  })

  it('renders input correctly', () => {
    const { container } = render(
      <Form>
        <InformationFields />
      </Form>
    )

    const companyLogoInput = container.querySelector(
      'input[name="logo"]'
    ) as HTMLInputElement
    const companyLegalNameInput = container.querySelector(
      'input[name="companyLegalName"]'
    ) as HTMLInputElement
    const legalEntityStatusInput = container.querySelector(
      'input[name="legalEntityStatus"]'
    ) as HTMLInputElement
    const countryOfFormationInput = container.querySelector(
      'input[name="countryOfFormation"]'
    ) as HTMLInputElement
    const registrationNumberInput = container.querySelector(
      'input[name="registrationNumber"]'
    ) as HTMLInputElement
    const otherLegalEntityStatusInput = container.querySelector(
      'input[name="otherLegalEntityStatus"]'
    ) as HTMLInputElement

    expect(companyLogoInput).toBeInTheDocument()
    expect(companyLegalNameInput).toBeInTheDocument()
    expect(legalEntityStatusInput).toBeInTheDocument()
    expect(countryOfFormationInput).toBeInTheDocument()
    expect(registrationNumberInput).toBeInTheDocument()
    expect(otherLegalEntityStatusInput).toBeInTheDocument()
  })

  it('renders Others field disabled if legalEntityStatus is not equal to Others', () => {
    const { container } = render(
      <Form defaultValues={{ legalEntityStatus: 'Not Others' }}>
        <InformationFields />
      </Form>
    )

    const otherLegalEntityStatusInput = container.querySelector(
      'input[name="otherLegalEntityStatus"]'
    ) as HTMLInputElement
    expect(otherLegalEntityStatusInput).toBeDisabled()
  })
})
