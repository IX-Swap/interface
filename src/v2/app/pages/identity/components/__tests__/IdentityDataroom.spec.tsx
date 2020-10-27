/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IdentityDataroom } from 'v2/app/pages/identity/components/IdentityDataroom'
import { Form } from 'v2/components/form/Form'

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
