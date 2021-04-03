import { FundSourceItem } from 'app/pages/identity/components/FinancialInformationForm/FundSourceItem'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FundSourceItem', () => {
  const props = {
    field: {
      name: 'employment',
      checked: true,
      value: 42
    },
    index: 0
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <FundSourceItem {...props} />
      </Form>
    )
  })
})
