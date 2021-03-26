import { OptOutInfoDialog } from 'app/pages/_identity/components/InvestorDeclarationForm/OptOutInfoDialog/OptOutDialog'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OptOutDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <OptOutInfoDialog />
      </Form>
    )
  })
})
