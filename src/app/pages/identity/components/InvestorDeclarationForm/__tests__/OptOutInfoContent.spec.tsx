import { OptOutInfoContent } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutInfoContent/OptOutInfoContent'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('OptOutInfoContent', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <OptOutInfoContent />
      </Form>
    )
  })
})
