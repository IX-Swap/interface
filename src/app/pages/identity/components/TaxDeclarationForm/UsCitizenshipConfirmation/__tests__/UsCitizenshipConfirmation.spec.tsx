import { UsCitizenshipConfirmation } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('UsCitizenshipConfirmation', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
              fatca: 'yes'
            }
          }
        }}
      >
        <UsCitizenshipConfirmation />
      </Form>
    )

    const yesRadio = getByLabelText(
      'I confirm that I am a US citizen and/or resident in the US for tax purposes and my U.S. federal Taxpayer Identifying Number (US TIN) is as follows:'
    )
    const noRadio = getByLabelText(
      'I confirm that I am not a US citizen or resident in the US for tax purposes.'
    )

    expect(yesRadio).toBeTruthy()
    expect(noRadio).toBeTruthy()
  })
})
