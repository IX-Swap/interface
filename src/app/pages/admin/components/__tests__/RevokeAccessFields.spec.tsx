import React from 'react'
import { render, cleanup } from 'test-utils'
import { RevokeAccessFields } from 'app/pages/admin/components/RevokeAccessFields'
import { Form } from 'components/form/Form'

describe('RevokeAccessFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <RevokeAccessFields />
      </Form>
    )
  })

  it('renders components correctly', () => {
    const { getByText } = render(
      <Form>
        <RevokeAccessFields />
      </Form>
    )

    expect(getByText(/enter the session id to revoke/i)).toBeTruthy()
    expect(
      getByText(
        /if you do not specify session id, all sessions of this user will be revoked/i
      )
    ).toBeTruthy()
  })
})
