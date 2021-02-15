import { UsCitizenshipConfirmation } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('UsCitizenshipConfirmation', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <UsCitizenshipConfirmation />
      </Form>
    )
  })

  it('displays label correctly', () => {
    const { getByText } = render(
      <Form>
        <UsCitizenshipConfirmation />
      </Form>
    )

    expect(
      getByText('Declaration of US Citizenship or US Residence for')
    ).toBeTruthy()
  })

  it('renders form values correctly', () => {
    const { getByLabelText } = render(
      <Form
        defaultValues={{
          declarations: {
            tax: {
              isUsCitizen: 'yes'
            }
          }
        }}
      >
        <UsCitizenshipConfirmation />
      </Form>
    )

    const yesRadio = getByLabelText(
      'I confirm that I am a US citizen* and/or resident in the US for tax purposes and my U.S. federal Taxpayer Identifying Number (US TIN) is as follows:'
    )
    const noRadio = getByLabelText(
      'I confirm that I am not a US citizen or resident in the US for tax purposes.'
    )

    expect(yesRadio).toBeChecked()
    expect(noRadio).not.toBeChecked()
  })
})
