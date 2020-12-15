import React from 'react'
import { render, cleanup } from 'test-utils'
import { IdentityDataroom } from 'app/pages/identity/components/IdentityDataroom'
import { Form } from 'components/form/Form'

describe('IdentityDataroom', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <IdentityDataroom />
      </Form>
    )
  })
})
