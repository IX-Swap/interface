import { InvestorDeclarationForm } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorDeclarationForm'
import { Form } from 'components/form/Form'
import * as useServices from 'hooks/useServices'
import React from 'react'
import { render } from 'test-utils'

describe('InvestorDeclarationForm', () => {
  const showSnackbarFn = jest.fn()
  const useServicesResponse = {
    showSnackbar: showSnackbarFn
  }

  beforeEach(() => {
    jest
      .spyOn(useServices, 'useServices')
      .mockImplementation(() => useServicesResponse as any)
  })
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <InvestorDeclarationForm />
      </Form>
    )
  })
})
