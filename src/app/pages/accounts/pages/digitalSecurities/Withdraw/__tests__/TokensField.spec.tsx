import { TokensField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/TokensField'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

jest.mock('app/pages/accounts/components/TokenSelect', () => ({
  TokenSelect: jest.fn(() => null)
}))

describe('TokensField', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <TokensField />
      </Form>
    )
  })
})
