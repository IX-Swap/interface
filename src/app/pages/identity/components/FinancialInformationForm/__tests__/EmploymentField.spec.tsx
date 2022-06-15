import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import * as useIsSingPass from 'app/pages/identity/hooks/useIsSingPass'

describe('EmploymentField', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    render(
      <Form>
        <EmploymentField />
      </Form>
    )
  })

  it('disables correct fields when singpass data is present', () => {
    const objResponse = {
      isSingPass: true,
      singPassData: {
        employmentsector: 'SECTOR',
        employment: 'BOSS ME',
        employmentstatus: 'SELF-EMPLOYED'
      }
    }

    jest
      .spyOn(useIsSingPass, 'useIsSingPass')
      .mockImplementation(() => objResponse as any)

    const { getByLabelText, getByRole } = render(
      <Form>
        <EmploymentField />
      </Form>
    )

    const occupation = getByLabelText('Occupation')
    const status = getByLabelText('Employment Status')
    const employer = getByLabelText('Employer')

    expect(occupation).toHaveAttribute('aria-disabled', 'true')
    expect(status).toHaveAttribute('aria-disabled', 'true')
    expect(employer).toBeDisabled()
  })
})
