import React from 'react'
import * as useTaxResidencies from 'app/pages/_identity/components/TaxDeclarationForm/hooks/useTaxResidencies'
import { SingaporeOnlyFields } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/SingaporeOnlyFields'
import { Form } from 'components/form/Form'
import { render, cleanup } from 'test-utils'

describe('SingaporeOnlyFields', () => {
  beforeEach(() => {
    const objResponse = { singaporeOnly: true }

    jest
      .spyOn(useTaxResidencies, 'useTaxResidencies')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <SingaporeOnlyFields />
      </Form>
    )
  })

  it('renders components correctly', () => {
    const { getByLabelText } = render(
      <Form>
        <SingaporeOnlyFields />
      </Form>
    )

    const yesRadio = getByLabelText(
      'YES, I’m currently only tax resident in Singapore and do not have a foreign tax residency.'
    ) as HTMLInputElement
    const taxIdInput = getByLabelText('NRIC/FIN') as HTMLInputElement

    expect(yesRadio.checked).toBeTruthy()
    expect(taxIdInput).not.toBeDisabled()
  })
})
