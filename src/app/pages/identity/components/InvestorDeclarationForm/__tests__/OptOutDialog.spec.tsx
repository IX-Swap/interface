import { OptOutInfoDialog } from 'app/pages/identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('OptOutDialog', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <OptOutInfoDialog />
      </Form>
    )
  })
})
